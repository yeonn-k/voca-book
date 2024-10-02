interface inputTextProps {
    id?: string;
    name?: string;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
}

const InputText = ({
    id,
    name,
    placeholder,
    value,
    onChange,
}: inputTextProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            type="text"
            name={name}
            className="w-full border-solid border-sky-100 border-2 px-2 py-1 outline-none mb-4 rounded-lg"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    );
};

export default InputText;
