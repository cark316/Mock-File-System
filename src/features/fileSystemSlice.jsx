import { createSlice, nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState: [],
  reducers: {
    addNewItem(state, action) {
      const { nodeName, newItem } = action.payload;
      newItem.id = nanoid(); // Assign unique ID
      if (nodeName === "root") {
        state.push(newItem);
      } else {
        const addRecursively = (nodes) => {
          nodes.forEach((node) => {
            if (node.id === nodeName && node.type === "folder") {
              node.children.push(newItem);
            } else if (node.children) {
              addRecursively(node.children);
            }
          });
        };
        addRecursively(state);
      }
    },
    removeItem(state, action) {
      const { nodeId } = action.payload;
      const removeRecursively = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.id === nodeId) {
            nodes.splice(i, 1);
            return;
          } else if (node.children) {
            removeRecursively(node.children);
          }
        }
      };
      removeRecursively(state);
    },
    toggleNode(state, action) {
      const { nodeId } = action.payload;
      const toggleRecursively = (nodes) => {
        nodes.forEach((node) => {
          if (node.id === nodeId) {
            node.isOpen = !node.isOpen;
          } else if (node.children) {
            toggleRecursively(node.children);
          }
        });
      };
      toggleRecursively(state);
    },
  },
});

export const { addNewItem, removeItem, toggleNode } = fileSystemSlice.actions;
export default fileSystemSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const fileSystemSlice = createSlice({
//   name: "fileSystem",
//   initialState: [], // Updated initial state with an empty array
//   reducers: {
//     addNewItem(state, action) {
//       const { nodeName, newItem } = action.payload;

//       // If the file system is empty, set the initial state to contain the root folder
//       if (state.length === 0) {
//         return [newItem];
//       }

//       // If the nodeName is "root", add the new item directly to the root level
//       if (nodeName === "root") {
//         return [...state, newItem];
//       }

//       // Otherwise, recursively add the item to the matching folder
//       const addRecursively = (nodes) => {
//         return nodes.map((node) => {
//           if (node.name === nodeName && node.type === "folder") {
//             return {
//               ...node,
//               children: node.children ? [...node.children, newItem] : [newItem],
//             };
//           } else if (node.children) {
//             return {
//               ...node,
//               children: addRecursively(node.children),
//             };
//           }
//           return node;
//         });
//       };

//       return addRecursively(state);
//     },
//     removeItem(state, action) {
//       const { nodeName } = action.payload;

//       // Define a function to remove items recursively
//       const removeRecursively = (nodes) => {
//         for (let i = 0; i < nodes.length; i++) {
//           const node = nodes[i];
//           if (node.name === nodeName) {
//             // If the node name matches the nodeName to remove, remove it from the state
//             nodes.splice(i, 1);
//             i--; // Adjust index after removal
//           } else if (node.children) {
//             // Recursively remove children
//             removeRecursively(node.children);
//           }
//         }
//       };

//       removeRecursively(state);

//       return state; // Return modified draft state
//     },
//     toggleNode(state, action) {
//       const nodeName = action.payload;

//       // Define a function to toggle nodes recursively
//       const toggleRecursively = (nodes) => {
//         return nodes.map((node) => {
//           if (node.name === nodeName) {
//             // Toggle isOpen property
//             return { ...node, isOpen: !node.isOpen };
//           } else if (node.children) {
//             // Toggle recursively for children
//             return { ...node, children: toggleRecursively(node.children) };
//           }
//           return node;
//         });
//       };

//       return toggleRecursively(state);
//     },
//   },
// });

// export const { addNewItem, removeItem, toggleNode } = fileSystemSlice.actions;
// export default fileSystemSlice.reducer;
