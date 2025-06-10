import {getEnv, types} from "npm:mobx-state-tree";

export const EditorModel = types.model({
    path: types.string,
    endpoint: types.string,
    value: types.maybe(types.string),
    copy: types.maybe(types.string)
}).actions((self) => ({
    setValue: (value) => {
        self.value = value;
    },
    updateValue: (value) => {
        self.copy = value;
    }

})).actions((self) => ({
    afterCreate: () => {
        getEnv(self).Source(`${self.endpoint}.FileSystem.ReadAllText('${self.path}')`).subscribe((t) => {
            self.setValue(t);
            self.updateValue(t);
        })
    }
}))