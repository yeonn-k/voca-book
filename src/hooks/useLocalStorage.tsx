const useLocalStorage = (key: string) => {
    const setLocalStorage = (value: object) => {
        localStorage.setItem(key, JSON.stringify(value));
    };
    const getLocalStorage = () => {
        const value = localStorage.getItem(key);
        if (value !== null) return JSON.parse(value);
        return null;
    };

    return { setLocalStorage, getLocalStorage };
};
export default useLocalStorage;
