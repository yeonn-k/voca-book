import { useState } from 'react';

const useInputValue = (initial: string = '') => {
    const [value, setValue] = useState(initial);

    const handleInputChange = (newValue: string) => {
        setValue(newValue);
    };

    return [value, handleInputChange] as const;
};

export default useInputValue;

// custom hook.....
