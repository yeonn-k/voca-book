import BasicButton from '../buttons/basicButtons/BasicButton';
import InputText from '../form/inputText';
import useInputValue from '../../hooks/useInputValue';
import firestoreVocaService, { Word } from '../../service/firestoreVocaService';
import { useFetchWords } from '../../hooks/useFetchWords';

interface ModalProps {
    type: string;
    key: string;
    docId: string;
    isOpen: boolean;
    closeModal: () => void;
    setWords: React.Dispatch<React.SetStateAction<Word[]>>;
    text: string;
    onClick: (docId: string) => void;
    words: Word[];
}

const AddOrEditWord = ({
    type,
    docId,
    isOpen,
    closeModal,
    setWords,
    text,
    words,
}: ModalProps) => {
    const [newWord, setNewWord] = useInputValue('');

    const handleTheWord = async (
        type: string, // 'add' | 'update' 로 하려고 했는데 인수 전달이 잘 안됩니다..
        docId?: string,
        newWord?: string
    ) => {
        if (type === 'add' && newWord) {
            await firestoreVocaService.createWord(newWord);
        }

        if (type === 'update' && newWord && docId) {
            await firestoreVocaService.updateTheWord(newWord, docId);
        }
        closeModal();
        useFetchWords(setWords);
    };

    const word = words
        .filter((word) => word.docId === docId)
        .map((word) => word.word);

    return (
        <div className="bg-white w-96 h-52 rounded-lg py-7 px-5 relative flex justify-center flex-wrap">
            <div className="absolute right-4 ">
                <BasicButton text="닫기" onClick={closeModal} />
            </div>
            <h2 className="text-2xl text-sky-500 font-gowun-bold ">
                {type === 'add'
                    ? '새로운 단어 추가'
                    : docId
                      ? `단어 '${word}' 수정`
                      : '단어 수정'}
            </h2>

            <div className="mt-4 w-full">
                <InputText value={newWord} onChange={setNewWord} />
                <BasicButton
                    text={text}
                    isFull
                    disabled={
                        newWord.trim().length < 1 && !newWord.includes(' ')
                    }
                    onClick={() => {
                        handleTheWord(type, docId, newWord);
                    }}
                />
            </div>
        </div>
    );
};

export default AddOrEditWord;
