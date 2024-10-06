interface BasicButtonProps {
    text: string;
    onClick: () => void;
    // action?: string;
    isFull?: boolean;
    color?: string;
    disabled?: boolean;
}

const BasicButton = ({
    text,
    // action,
    color,
    onClick,
    isFull,
    disabled,
}: BasicButtonProps) => {
    // const btnColor =
    const btnWFull = `${isFull ? 'w-full' : ''}`;

    return (
        <button
            className={`text-xl font-gowun-bold text-white bg-sky-500 w-16 h-9 rounded-lg disabled:bg-sky-700/50 disabled:cursor-not-allowed ${btnWFull} ${color}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default BasicButton;
