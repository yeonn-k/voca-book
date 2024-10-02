import useLocalStorage from '../../hooks/useLocalStorage';
import BasicButton from '../buttons/basicButtons/BasicButton';
import InputText from '../form/inputText';
import useInputValue from '../../hooks/useInputValue';

interface ModalProps {
    text: string;
    type: string;
    idx?: number;
    isOpen: boolean;
    words: string[];
    closeModal: () => void;
    onClick: (idx?: number) => void;
    setWords: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddOrEditWord = ({
    text,
    type,
    isOpen,
    closeModal,
    setWords,
    words,
    idx,
}: ModalProps) => {
    const [newWord, setNewWord] = useInputValue();
    const { setLocalStorage, getLocalStorage } = useLocalStorage('words');

    const handleTheWord = (idx?: number, newWord?: string) => {
        let updatedWords: string[] = [...words];

        if (type === 'add' && newWord) {
            updatedWords = [...words, newWord];
            setWords(updatedWords);
        } else if (type === 'update' && idx !== undefined && newWord) {
            updatedWords = words.map((word, index) =>
                index === idx ? newWord : word
            );
            setWords(updatedWords);
        }

        // 로컬 스토리지 업데이트
        if (updatedWords) {
            setLocalStorage(updatedWords);
            closeModal();
        }
    };

    return (
        <div className="bg-white w-96 h-52 rounded-lg py-7 px-5 relative flex justify-center flex-wrap">
            <div className="absolute right-4 ">
                <BasicButton text="닫기" onClick={closeModal} action="" />
            </div>
            <h2 className="text-2xl text-sky-500 font-gowun-bold ">
                {type === 'add'
                    ? '새로운 단어 추가'
                    : idx
                      ? `단어 '${words[idx]}' 수정`
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
                        handleTheWord(idx, newWord);
                    }}
                />
            </div>
        </div>
    );
};

export default AddOrEditWord;
