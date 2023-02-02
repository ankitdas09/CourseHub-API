import ImageKit from "imagekit";
import ImageUploadCreds from "../config/ImageUpload.js";

var imagekit = new ImageKit({
    ...ImageUploadCreds,
});

export const UploadImage = async (url, name) => {
    try {
        const resp = await imagekit.upload({
            file: url,
            fileName: name + ".jpg",
        });
        return resp;
    } catch (error) {
        return false;
    }
};
