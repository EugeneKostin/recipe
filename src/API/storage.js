import { storage } from './firestore-connection';
import { ref, deleteObject } from "firebase/storage";


export const storageRef = (slug, image) => ref(storage, `recipes_images/${slug}/${image.name}`);

export const deleteImage = async (image) => {
    try {
        await deleteObject(storageRef(image))
    } catch (e) {
        throw e;
    }
}
