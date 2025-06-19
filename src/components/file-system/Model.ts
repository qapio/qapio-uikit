import {types} from "npm:mobx-state-tree";

const File = types.model({
    path: types.string
})

export const FileSystem = types.model({
    endpoint: types.string,
    items: types.array(File),
    selected: types.maybe(types.string),

}).actions((self) => ({
    afterCreate: () => {
        self.items = [{path: "Function.ts"}, {path: "Qap1.pkl"}];
    },
    setSelected: ({path}) => {
        console.log("DØDØD", path)
        self.selected = path;
    }
}))