import { Dispatch, SetStateAction } from 'react';
import { useFetchWords } from '../../hooks/useFetchWords';
import firestoreVocaService, { Word } from '../../service/firestoreVocaService';
import BasicButton from '../buttons/basicButtons/BasicButton';

interface ModalProps {
    type: string;
    docId: string;
    isOpen: boolean;
    closeModal: () => void;
    setWords: React.Dispatch<React.SetStateAction<Word[]>>;
    word?: string;
}

const RemoveWord = ({
    type,
    docId,
    isOpen,
    closeModal,
    setWords,
    word,
}: ModalProps) => {
    const confirmClick = async (
        setWords: Dispatch<SetStateAction<Word[]>>,
        docId: string
    ) => {
        // removeWord(key);
        await firestoreVocaService.removeTheWord(docId);
        closeModal();
        useFetchWords(setWords);
    };
    return (
        <div className="bg-white w-96 h-52 rounded-lg py-12 px-5 relative flex justify-center flex-wrap">
            <h2 className="text-lg w-full text-center">{word}</h2>
            <p className="text-lg w-full text-center">정말 삭제하시겠습니까?</p>
            <div className="w-full flex justify-center items-center gap-2">
                <BasicButton
                    text="확인"
                    onClick={() => {
                        confirmClick(setWords, docId);
                    }}
                />
                <BasicButton
                    text="취소"
                    onClick={closeModal}
                    color={'bg-sky-700/50'}
                />
            </div>
        </div>
    );
};

export default RemoveWord;
