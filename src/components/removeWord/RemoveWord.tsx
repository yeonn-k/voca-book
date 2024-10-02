import BasicButton from '../buttons/basicButtons/BasicButton';

interface ModalProps {
    word: string;
    type: string;
    isOpen: boolean;
    idx: number;
    removeWord: (idx: number) => void;
    closeModal: () => void;
}

const RemoveWord = ({
    word,
    type,
    isOpen,
    idx,
    removeWord,
    closeModal,
}: ModalProps) => {
    const confirmClick = () => {
        removeWord(idx);
        closeModal();
    };
    return (
        <div className="bg-white w-96 h-52 rounded-lg py-12 px-5 relative flex justify-center flex-wrap">
            <h2 className="text-lg w-full text-center">{word}</h2>
            <p className="text-lg w-full text-center">정말 삭제하시겠습니까?</p>
            <div className="w-full flex justify-center items-center gap-2">
                <BasicButton text="확인" onClick={confirmClick} action="" />
                <BasicButton
                    text="취소"
                    onClick={closeModal}
                    action=""
                    color={'bg-sky-700/50'}
                />
            </div>
        </div>
    );
};

export default RemoveWord;
