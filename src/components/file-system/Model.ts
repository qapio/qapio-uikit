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
        self.items = [{path: "MyGui.pkl"},{path: "Index.tsx"}];
    },
    setSelected: ({path}) => {
        console.log("path", path)
        self.selected = path;
    }
}))