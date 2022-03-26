import { storage } from './firestore-connection';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export const uploadImage = (image, setState) => {
    const storageRef = ref(storage, `recipes_images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    console.log(uploadTask);
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setState((prev) => ({ ...prev, progress }))
            switch (snapshot.state) {
                case 'paused':
                    setState((prev) => ({ ...prev, status: 'paused' }))
                    break;
                case 'running':
                    setState((prev) => ({ ...prev, status: 'running' }))
                    break;
            }
        },
        (error) => {
            setState((prev) => ({ ...prev, error, status: 'error' }))
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setState((prev) => ({ ...prev, status: 'successful' }))
                console.log('File available at', downloadURL, uploadTask.snapshot.ref);
                return downloadURL
            });
        }
    );

}

export const getUploadTaskState = (uploadTask, setState) => {
    uploadTask.on('state_changed', (snapshot) => {
        setState(prev => ({ ...prev, state: snapshot.state }))
    })
}

export const imageUploadTask = (image) => image && uploadBytesResumable(storageRef(image), `recipes_images/${image.name}`);


export const storageRef = (image) => ref(storage, `recipes_images/${image.name}`);


export const deleteImage = async (image) => {
    try {
        await deleteObject(storageRef(image))
    } catch (e) {
        throw e;
    }
}
