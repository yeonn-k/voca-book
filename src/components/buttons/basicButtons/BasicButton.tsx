interface BasicButtonProps {
    text: string;
    onClick?: () => void;
}

const BasicButton = ({ text, onClick }: BasicButtonProps) => {
    return (
        <button
            className="text-xl font-gowun-bold text-white bg-sky-500 w-16 h-9 rounded-lg absolute right-4"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default BasicButton;
