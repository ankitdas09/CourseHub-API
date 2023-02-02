let found = null;

const search = (folders, id) => {
    for (let folder of folders) {
        if (folder._id === id) {
            found = folder;
            break;
        }
        if (folder.childType === "Folder") search(folder.children, id);
    }
};
const searchFolderById = (root, id) => {
    search(root, id);
    return found;
};

export default searchFolderById;
