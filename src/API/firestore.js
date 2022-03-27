import { db } from './firestore-connection';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';

export const addDocument = async (data) => {
    try {
        await addDoc(collection(db, 'recipes'), data);
    } catch (err) {
        console.log(err)
    }
}

export const getAllDocuments = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'recipes'))
        return snapshot
    } catch (err) {
        console.log(err)
    }
}

export const getDocumentById = async (id) => {
    try {
        const docRef = doc(db, "recipes", id);
        const snapshot = await getDoc(docRef);
        return snapshot.data()
    } catch (err) {
        console.log(err)
    }
}