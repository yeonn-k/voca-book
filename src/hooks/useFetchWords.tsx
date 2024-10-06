import firestoreVocaService from '../service/firestoreVocaService';
import { Word } from '../service/firestoreVocaService';

export const useFetchWords = async (
    setWords: React.Dispatch<React.SetStateAction<Word[]>>
) => {
    try {
        const data = await firestoreVocaService.getWords();

        if (data) {
            setWords(data);
        }
    } catch (error) {
        console.error('❌ fetching words:', error);
    }
};
