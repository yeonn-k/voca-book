import React from 'react';

const ModalContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-black/40">
            {children}
        </div>
    );
};

export default ModalContainer;
