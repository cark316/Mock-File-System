import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    addFolder: (state, action) => {
      const { parentId, name } = action.payload;
      const newFolder = {
        id: nanoid(),
        name: name,
        type: "folder",
        children: [],
      };
      const parentFolder = state.find(folder => folder.id === parentId)

      if(parentFolder) {
        parentFolder.children.push(newFolder)
      } else { state.push(newFolder)}
    },
    removeFolder: (state, action) => {
      const folderToRemove = action.payload.id;
      return state.filter((folder) => folder.id !== folderToRemove);
    },
    addFile: (state, action) => {},
    removeFile: (state, action) => {},
  },
});

export const { addFolder, removeFolder, addFile, removeFile } =
  fileSystemSlice.actions;
export default fileSystemSlice.reducer;
