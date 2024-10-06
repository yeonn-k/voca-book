import {
    collection,
    addDoc,
    query,
    orderBy,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export interface Word {
    word: string;
    createdAt: Date;
    docId: string;
}

const VOCA_COLLECTION = 'words';
export default {
    // 단어 생성

    async createWord(word: string) {
        try {
            const wordCollectionRef = collection(db, VOCA_COLLECTION);
            await addDoc(wordCollectionRef, {
                word: word,
                createdAt: new Date(),
            });
            console.log('✅ Word added successfully!');
        } catch (error: any) {
            console.error('❌ createWord error: ', error.message);
        }
    },

    // 단어 조회
    async getWords() {
        try {
            const wordCollectionRef = collection(db, VOCA_COLLECTION);
            const queryString = query(
                wordCollectionRef,
                orderBy('createdAt', 'desc')
            );
            const snapShots = await getDocs(queryString);

            if (snapShots.empty) return [];
            return snapShots.docs.map((doc) => {
                return {
                    docId: doc.id,
                    ...(doc.data() as { word: string; createdAt: Date }),
                };
            });
            console.log('✅ Word fetched successfully!');
        } catch (error: any) {
            console.error('❌ getWords error: ', error.message);
        }
    },

    // 단어 수정
    async updateTheWord(word: string, docId: string) {
        try {
            const wordDocRef = doc(db, VOCA_COLLECTION, docId);
            await updateDoc(wordDocRef, {
                word: word,
            });
            console.log('✅ Word updated successfully!');
        } catch (error: any) {
            console.error('❌ update words: ', error.message);
        }
    },

    // 단어 삭제
    async removeTheWord(docId: string) {
        try {
            const wordDocRef = doc(db, VOCA_COLLECTION, docId);
            await deleteDoc(wordDocRef);
            console.log('✅ Word removed successfully!');
        } catch (error: any) {
            console.error('❌ remove words: ', error.message);
        }
    },
};
