import BasicButton from '../buttons/basicButtons/BasicButton';
import InputText from '../form/inputText';
import useInputValue from '../../hooks/useInputValue';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    setWords: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddWord = ({ isOpen, closeModal, setWords }: ModalProps) => {
    const [newWord, setNewWord] = useInputValue();

    const saveTheWord = () => {
        // 저장하는 로직 작성
        closeModal();
        setWords((prev) => [...prev, newWord]);
    };

    return (
        <div className="bg-white w-96 h-52 rounded-lg py-7 px-5 relative flex justify-center flex-wrap">
            <div className="absolute right-4 ">
                <BasicButton text="닫기" onClick={closeModal} />
            </div>
            <h2 className="text-2xl text-sky-500 font-gowun-bold ">
                새로운 단어 추가
            </h2>

            <div className="mt-4 w-full">
                <InputText value={newWord} onChange={setNewWord} />
                <BasicButton
                    text="저장"
                    isFull
                    disabled={
                        newWord.trim().length < 1 && !newWord.includes(' ')
                    }
                    onClick={saveTheWord}
                />
            </div>
        </div>
    );
};

export default AddWord;
