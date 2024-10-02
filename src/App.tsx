import React, { useState } from 'react';
import './App.css';

import BasicButton from './components/buttons/basicButtons/BasicButton';
import InputText from './components/form/inputText';
import WordCard from './components/wordCard/WordCard';

import useInputValue from './hooks/useInputValue';
import useModalState from './hooks/useModalState';
import AddWord from './components/addWord/AddWord';
import ModalContainer from './components/modal/ModalContainer';

function App() {
    const [words, setWords] = useState<string[]>([
        'apple',
        'banana',
        'orange',
        'strawberry',
        'melon',
        'grapes',
    ]);

    const [filterWord, setFilterWord] = useInputValue();
    const { isOpen, toggleModal, closeModal, openModal } = useModalState();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-3xl min-w-640 h-full border-solid border-sky-200 border-2 rounded-lg px-8 py-12">
                <header className="flex items-center justify-center w-full h-16 relative">
                    <h1 className="text-3xl text-sky-500 font-gowun-bold">
                        단어 목록
                    </h1>
                    <div className="absolute right-4">
                        <BasicButton text="추가" onClick={toggleModal} />
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
                    {isOpen ? (
                        <ModalContainer>
                            <AddWord isOpen={isOpen} closeModal={closeModal} />
                        </ModalContainer>
                    ) : (
                        ''
                    )}
                    <ul className="grid grid-cols-3 gap-2.5">
                        {words.map((word) => {
                            return <WordCard word={word}></WordCard>;
                        })}
                    </ul>
                </main>
            </div>
        </div>
    );
}

export default App;
