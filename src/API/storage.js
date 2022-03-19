import { storage } from './firestore-connection';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImage = (image, setState) => {
    const storageRef = ref(storage, `recipes_images/${image.name}`);
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, image);
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
        (error, snapshot) => {
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

export const imageRef = (image) => ref(storage, `recipes_images/${image.name}`);
