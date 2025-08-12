import {types, IAnyType, getSnapshot, getEnv} from "npm:mobx-state-tree";
import Mustache from "npm:mustache";
import {ModelPropertiesDeclaration} from "npm:mobx-state-tree";
import {interval, ReplaySubject, switchMap, map, combineLatest, of} from "npm:rxjs";

const TypeModel = (typeName: string, props: ModelPropertiesDeclaration, typeFactory: (node) => IAnyType) => {
    return types.model({
        type: types.literal(typeName),
        templates: types.map(types.string)
    }).props(props)
        .views((self) => {
            return {
                getType() {
                    return typeFactory(self);
                },
                expressions: (variables) => {

                    const result = {};

                    self.templates.forEach((value, key) => {
                        result[key] = Mustache.render(value, variables);
                    })

                    return result;
                }
            }
        });
}

const StringType = TypeModel("string", {
    default: types.maybe(types.string)
}, (model) => model.default || types.string);

const NumberType = TypeModel("number", {
    default: types.maybe(types.number)
}, (model) => model.default || types.number);

const BooleanType = TypeModel("boolean", {}, () => types.boolean);

const StringArray = TypeModel("string-array", {
    default: types.array(types.string)
}, (model) => types.optional(types.array(types.string), getSnapshot(model).default));


export const QapiInteractive = types.model({
    template: types.string,
    properties: types.map(types.union(StringType, NumberType, BooleanType, StringArray)),
    initialSnapshot: types.frozen({}),
    templates: types.map(types.string),
    triggers: types.array(types.string),
    auto: false
}).volatile((self) => {
    return {
        instance: null,
        nextExpression: new ReplaySubject(1)
    }
}).actions((self) => {

    return {
        afterCreate() {
            console.log("helkkklos")
            const props = {};

            self.properties.forEach((value, key) => {
                props[key] = value.getType();
            });

            const template = self.template;
            const initialSnapshot = self.initialSnapshot;
            const properties = self.properties;
            const triggers = self.triggers;

            const model = types.model(props)
                .actions((self) => {
                    const actions = {};

                    properties.forEach((value, key) => {
                        actions[`set${key}`] = (t) => {
                            try {
                                console.log(t)
                                self[key] = t
                            } catch (e) {
                                console.log(e);
                            }

                        };
                    });

                    return actions;

                })
                .views((self) => {
                    return {
                        render() {

                            const data = {...initialSnapshot, ...getSnapshot(self)};

                            /*   Object.entries(data).forEach(([key, value]) => {

                                   if (typeof value == "object" || Array.isArray(value)) {
                                       data[key] = JSON.stringify(value);
                                   }

                               });*/

                            console.log(data);

                            return Mustache.render(template, data);

                        }
                    }
                });

            /*            if (triggers.length > 0) {
                            combineLatest(triggers.map((t) => getEnv(self).Source(t))).subscribe((t) => {
                                self.nextExpression.next(self.instance.render());
                            });
                        }*/

            self.instance = model.create(self.initialSnapshot);
            console.log("FIkkkRSkT", self.instance.render());

            if (self.auto) {
                self.nextExpression.next(self.instance.render());
            }
        },
        execute() {
            self.nextExpression.next(self.instance.render());
        },
        setProperty({key, value}) {
            const func = self.instance[`set${key}`];

            if (!func) {
                return
            }

            func(value);
            console.log("SEkjjjC", self.instance.render())

            if (self.auto) {
                self.nextExpression.next(self.instance.render());
            }
        }
    }
}).views((self) => {
    return {
        value: () => {

            return self.nextExpression.pipe(switchMap((t) => {
                console.log(t);
                return getEnv(self).Source(t);
            }));
        },
        expression: () => {
            return self.nextExpression.pipe(map((t) => {
                console.log(t, 45);
                return t;
            }));
        },
        subExpressions: () => {
            return self.nextExpression.pipe(map((t) => {
                const templates = {};

                self.properties.forEach((value, key) => {
                    templates[key] = value.expressions({...self.initialSnapshot, ...getSnapshot(self.instance)})
                });

                return templates;
            }));
        },
        variables: () => {
            return self.nextExpression.pipe(map((t) => {
                return {...self.initialSnapshot, ...getSnapshot(self.instance)};
            }));
        }
    }
});