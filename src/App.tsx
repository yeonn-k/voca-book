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
import useLocalStorage from './hooks/useLocalStorage';

function App() {
    const [words, setWords] = useState<string[]>([]);

    const [filterWord, setFilterWord] = useInputValue();
    const { isOpen, toggleModal, closeModal, openModal } = useModalState();
    const { setLocalStorage, getLocalStorage } = useLocalStorage('words');
    const [selected, setSelected] = useState(0);
    const [actionName, setActionName] = useState('');

    const filteredWords = words.filter((word) => word.includes(filterWord));

    useEffect(() => {
        const result = getLocalStorage();
        if (result === null) setWords([]);
        else setWords(result);
    }, []);

    const handleAddWordModal = () => {
        setActionName('add');
        openModal();
    };

    const handleUpdateWordModal = (idx?: number) => {
        setActionName('update');
        if (idx !== undefined) {
            setSelected(idx);
        }
        openModal();
    };

    const removeWord = (idx: number) => {
        const newWords = words.filter(
            (word: string, index: number) => index !== idx
        );
        setWords(newWords);
        setLocalStorage(newWords);
    };
    const handleRemoveWordModal = (idx: number) => {
        setActionName('remove');
        if (idx !== undefined) {
            setSelected(idx);
        }
        openModal();
    };

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
                            action="add"
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
                    {actionName === 'add' && isOpen ? (
                        <ModalContainer>
                            <AddOrEditWord
                                isOpen={isOpen}
                                closeModal={closeModal}
                                setWords={setWords}
                                text="저장"
                                type="add"
                                onClick={handleAddWordModal}
                                words={words}
                            />
                        </ModalContainer>
                    ) : (
                        ''
                    )}
                    {actionName === 'update' && isOpen ? (
                        <ModalContainer>
                            <AddOrEditWord
                                isOpen={isOpen}
                                closeModal={closeModal}
                                setWords={setWords}
                                text="수정"
                                type="update"
                                onClick={handleUpdateWordModal}
                                words={words}
                                idx={selected}
                            />
                        </ModalContainer>
                    ) : (
                        ''
                    )}
                    {actionName === 'remove' && isOpen ? (
                        <ModalContainer>
                            <RemoveWord
                                word={words[selected]}
                                isOpen={isOpen}
                                idx={selected}
                                removeWord={removeWord}
                                closeModal={closeModal}
                                type="update"
                            />
                        </ModalContainer>
                    ) : (
                        ''
                    )}
                    <ul className="grid grid-cols-3 gap-2.5">
                        {filteredWords.map((word, idx) => {
                            return (
                                <WordCard
                                    key={idx}
                                    word={word}
                                    idx={idx}
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
