import React, { useEffect, useState } from 'react';
import './App.css';

import BasicButton from './components/buttons/basicButtons/BasicButton';
import InputText from './components/form/inputText';
import WordCard from './components/wordCard/WordCard';

import useInputValue from './hooks/useInputValue';
import useModalState from './hooks/useModalState';
import AddOrEditWord from './components/AddOrEditWord/AddOrEditWord';
import ModalContainer from './components/modal/ModalContainer';
import RemoveWord from './components/removeWord/RemoveWord';

import type { Word } from './service/firestoreVocaService';
import { useFetchWords } from './hooks/useFetchWords';

function App() {
    const [words, setWords] = useState<Word[]>([]);

    const [filterWord, setFilterWord] = useInputValue();
    const { isOpen, toggleModal, closeModal, openModal } = useModalState();
    // const { setLocalStorage, getLocalStorage } = useLocalStorage('words');
    const [selected, setSelected] = useState<string>('');
    const [actionName, setActionName] = useState('');

    const filteredWords = words.filter((word) => {
        return word.word.includes(filterWord);
    });

    const theWord = words.find((word) => word.docId === selected);

    useEffect(() => {
        useFetchWords(setWords);
    }, []);

    const handleAddWordModal = () => {
        setActionName('add');
        openModal();
    };

    const handleUpdateWordModal = (docId: string) => {
        setActionName('update');
        setSelected(docId);
        openModal();
    };

    const handleRemoveWordModal = (docId: string) => {
        setActionName('remove');
        setSelected(docId);
        openModal();
    };

    // const removeWord = async (key: string) => {
    // const newWords = words.filter((word) => word.docId !== key);
    // setWords(newWords);
    // 📍 firebase remove
    // };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-3xl min-w-640 h-full border-solid border-sky-200 border-2 rounded-lg px-8 py-12">
                <header className="flex items-center justify-center w-full h-16 relative">
                    <h1 className="text-3xl text-sky-500 font-gowun-bold">
                        단어 목록
                    </h1>
                    <div className="absolute right-4">
                        <BasicButton
                            text="추가"
                            onClick={handleAddWordModal}
                            // action="add"
                        />
                    </div>
                </header>
                <section>
                    <InputText
                        placeholder={'단어를 검색하세요'}
                        value={filterWord}
                        onChange={setFilterWord}
                    />
                </section>

                <main className="font-gowun-bold mt-4 ">
                    {actionName === 'add' && isOpen && (
                        <ModalContainer>
                            <AddOrEditWord
                                type="add"
                                key={selected}
                                docId={selected}
                                isOpen={isOpen}
                                closeModal={closeModal}
                                setWords={setWords}
                                text="저장"
                                onClick={handleAddWordModal}
                                words={words}
                            />
                        </ModalContainer>
                    )}
                    {actionName === 'update' && isOpen && (
                        <ModalContainer>
                            <AddOrEditWord
                                type="update"
                                key={selected}
                                docId={selected}
                                isOpen={isOpen}
                                closeModal={closeModal}
                                setWords={setWords}
                                text="수정"
                                onClick={handleUpdateWordModal}
                                words={words}
                            />
                        </ModalContainer>
                    )}
                    {actionName === 'remove' && isOpen && (
                        <ModalContainer>
                            <RemoveWord
                                type="remove"
                                key={selected}
                                docId={selected}
                                isOpen={isOpen}
                                closeModal={closeModal}
                                setWords={setWords}
                                word={theWord?.word}
                            />
                        </ModalContainer>
                    )}
                    <ul className="grid grid-cols-3 gap-2.5">
                        {filteredWords.map((word: Word) => {
                            return (
                                <WordCard
                                    key={word.docId}
                                    docId={word.docId}
                                    word={word.word}
                                    handleUpdateWordModal={
                                        handleUpdateWordModal
                                    }
                                    handleRemoveWordModal={
                                        handleRemoveWordModal
                                    }
                                />
                            );
                        })}
                    </ul>
                </main>
            </div>
        </div>
    );
}

export default App;

// 한글 초성 검색, 문자 set 도 알아보자??
