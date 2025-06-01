import { storage } from "@/config/firebase";
import imageCompression from "browser-image-compression";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const uploadImageToFirebase = async (file, folderName = "imagePath", onProgress) => {
    try {
        if (file.size > 2 * 1024 * 1024) {
            throw new Error("File phải nhỏ hơn 2MB");
        }

        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 512,
            useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const metadata = {
            contentType: compressedFile.type,
        };

        const filePath = `${folderName}/${Date.now()}_${compressedFile.name}`;
        const storageRef = ref(storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, compressedFile, metadata);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (onProgress) onProgress(progress);
                },
                (error) => reject(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    } catch (error) {
        return Promise.reject(error);
    }
};
