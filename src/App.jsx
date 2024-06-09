import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { addNewItem, removeItem, toggleNode } from "./features/fileSystemSlice";

const App = () => {
  const [rootFolderName, setRootFolderName] = useState("");
  const fileSystem = useSelector((state) => state.fileSystem);
  const dispatch = useDispatch();

  const addRootItem = (type) => {
    if (!rootFolderName.trim()) return;
    dispatch(
      addNewItem({
        nodeName: "root",
        newItem: {
          id: nanoid(), // Unique ID
          name: rootFolderName,
          type,
          children: type === "folder" ? [] : undefined,
        },
      })
    );
    setRootFolderName("");
  };

  const TreeNode = ({ node }) => {
    const [newItemName, setNewItemName] = useState("");
    const isOpen = node.isOpen || false;

    const addItem = (nodeName, type) => {
      if (!newItemName.trim()) return;
      dispatch(
        addNewItem({
          nodeName,
          newItem: {
            id: nanoid(), // Unique ID
            name: newItemName,
            type,
            children: type === "folder" ? [] : undefined,
          },
        })
      );
      setNewItemName("");
    };

    const removeItemHandler = (nodeId) => {
      dispatch(removeItem({ nodeId }));
    };

    const toggleNodeHandler = (nodeId) => {
      dispatch(toggleNode({ nodeId }));
    };

    return (
      <div>
        {node.type === "folder" ? (
          <div>
            <span onClick={() => toggleNodeHandler(node.id)}>
              {isOpen ? "📂" : "📁"} {node.name}
            </span>
            <span
              onClick={() => removeItemHandler(node.id)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              ❌
            </span>
            {isOpen && (
              <div style={{ marginLeft: 20 }}>
                {node.children.map((child) => (
                  <TreeNode key={child.id} node={child} />
                ))}
                <div>
                  <input
                    type="text"
                    placeholder="New item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                  <span
                    onClick={() => addItem(node.id, "folder")}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  >
                    📁➕
                  </span>
                  <span
                    onClick={() => addItem(node.id, "file")}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  >
                    📄➕
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {node.type === "folder" ? "📁" : "📄"} {node.name}{" "}
            <span
              onClick={() => removeItemHandler(node.id)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              ❌
            </span>
          </div>
        )}
      </div>
    );
  };

  const FileTree = () => {
    return (
      <div>
        {fileSystem.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    );
  };

  return (
    <main className="h-screen flex flex-col items-start text-xl p-4">
      <h1>File System</h1>
      <div>
        <input
          type="text"
          placeholder="Root folder name"
          value={rootFolderName}
          onChange={(e) => setRootFolderName(e.target.value)}
        />
        <button onClick={() => addRootItem("folder")}>📁➕</button>
        <button onClick={() => addRootItem("file")}>📄➕</button>
      </div>
      {fileSystem.length > 0 ? (
        <FileTree />
      ) : (
        <p>No items in the file system</p>
      )}
    </main>
  );
};

export default App;

// const App = () => {
//   const [rootFolderName, setRootFolderName] = useState("");
//   const [newItemNames, setNewItemNames] = useState({}); // Object to store newItemName for each node
//   const fileSystem = useSelector((state) => state.fileSystem);
//   const dispatch = useDispatch();

//   const addItem = (nodeName, type) => {
//     const newItemName = newItemNames[nodeName] || ""; // Get newItemName for the specific node
//     if (!newItemName.trim()) return;
//     const newItem = {
//       name: newItemName,
//       type,
//       children: type === "folder" ? [] : undefined,
//     };
//     dispatch(addNewItem({ nodeName, newItem }));
//     setNewItemNames({ ...newItemNames, [nodeName]: "" }); // Clear newItemName after adding
//   };

//   const removeItemHandler = (nodeName) => {
//     dispatch(removeItem({ nodeName }));
//   };

//   const toggleNodeHandler = (nodeName) => {
//     dispatch(toggleNode(nodeName));
//   };

//   const addRootItem = (type) => {
//     if (!rootFolderName.trim()) return;
//     const newItem = {
//       name: rootFolderName,
//       type,
//       children: type === "folder" ? [] : undefined,
//     };
//     dispatch(addNewItem({ nodeName: "root", newItem }));
//     setRootFolderName("");
//   };

//   const handleInputChange = (nodeName, value) => {
//     setNewItemNames({ ...newItemNames, [nodeName]: value }); // Update newItemName for the specific node
//   };

//   const TreeNode = ({ node }) => {
//     const isOpen = node.isOpen || false;

//     return (
//       <div>
//         {node.type === "folder" ? (
//           <div>
//             <span onClick={() => toggleNodeHandler(node.name)}>
//               {isOpen ? "📂" : "📁"} {node.name}
//             </span>
//             <span
//               onClick={() => removeItemHandler(node.name)}
//               style={{ cursor: "pointer", marginLeft: "10px" }}
//             >
//               ❌
//             </span>
//             {isOpen && (
//               <div style={{ marginLeft: 20 }}>
//                 {node.children.map((child, index) => (
//                   <TreeNode key={index} node={child} />
//                 ))}
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="New item name"
//                     value={newItemNames[node.name] || ""} // Set value based on newItemName for the specific node
//                     onChange={(e) =>
//                       handleInputChange(node.name, e.target.value)
//                     } // Pass nodeName to handleInputChange
//                   />
//                   <span
//                     onClick={() => addItem(node.name, "folder")}
//                     style={{ cursor: "pointer", marginLeft: "10px" }}
//                   >
//                     📁➕
//                   </span>
//                   <span
//                     onClick={() => addItem(node.name, "file")}
//                     style={{ cursor: "pointer", marginLeft: "10px" }}
//                   >
//                     📄➕
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             {node.type === "folder" ? "📁" : "📄"} {node.name}{" "}
//             <span
//               onClick={() => removeItemHandler(node.name)}
//               style={{ cursor: "pointer", marginLeft: "10px" }}
//             >
//               ❌
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const FileTree = () => {
//     return (
//       <div>
//         {fileSystem.map((node, index) => (
//           <TreeNode key={index} node={node} />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <main className="h-screen flex flex-col items-start text-xl p-4">
//       <h1>File System</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Root folder name"
//           value={rootFolderName}
//           onChange={(e) => setRootFolderName(e.target.value)}
//         />
//         <button onClick={() => addRootItem("folder")}>Add Root Folder</button>
//         <button onClick={() => addRootItem("file")}>Add Root File</button>
//       </div>
//       {fileSystem.length > 0 ? (
//         <FileTree />
//       ) : (
//         <p>No items in the file system</p>
//       )}
//     </main>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import { addFolder, removeFolder } from "./features/fileSystem";
// import { useSelector, useDispatch } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";

// const App = () => {
//   const dispatch = useDispatch();
//   const fileSystem = useSelector((state) => state.fileSystem);

//   const [name, setName] = useState("");
//   const [childName, setChildName] = useState("");

//   const handleAddFolder = () => {
//     if (name.trim() === "") {
//       // If the name is empty or has whitespace (trim removes all whitespace) it returns nothing
//       return;
//     }

//     const data = {
//       parentId: nanoid,
//       name: name,
//       type: "folder",
//       children: [],
//     };
//     dispatch(addFolder(data));
//     console.log("dispatched");

//     setName("");
//   };

//   const handleRemoveFolder = (folderId) => {
//     dispatch(removeFolder({ id: folderId }));
//   };

//   return (
//     <main className="h-screen flex justify-between font-teachers text-6xl p-16">
//       <ul className="flex flex-col">
//         {fileSystem.map((item) => (
//           <li key={item.id}>
//             {item.name}{" "}
//             <button
//               className="text-red-500"
//               onClick={() => handleRemoveFolder(item.id)}
//             >
//               X
//             </button>
//             <input
//               className="flex border-2 border-black"
//               type="text"
//               value={childName}
//               onChange={(e) => setChildName(e.target.value)}
//             />
//             <button
//               className="text-slate-500 mx-6"
//               onClick={() => handleAddFolder(item.id)}
//             >
//               +
//             </button>
//           </li>
//         ))}
//       </ul>
//       <div className="flex flex-row h-fit gap-2">
//         <input
//           className="flex border-2 border-black"
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button
//           className="flex items-center justify-center border-2 border-black"
//           onClick={() => handleAddFolder()}
//         >
//           Click
//         </button>
//       </div>
//     </main>
//   );
// };

// export default App;
