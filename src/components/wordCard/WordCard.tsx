import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

interface WordCardProp {
    word: string;
}

const WordCard = ({ word }: WordCardProp) => {
    return (
        <li className="w-full h-12 flex items-center justify-center  bg-sky-200 text-lg rounded-md px-3 py-1 cursor-pointer group">
            <p className="w-full flex items-center justify-between p-1">
                {word}
                <span className="flex items-center justify-between w-9">
                    <MdEdit className="text-sm invisible group-hover:visible" />
                    <FaTrash className="text-sm invisible group-hover:visible" />
                </span>
            </p>
        </li>
    );
};

export default WordCard;

// 마지막 카드가 아니라면 margin-bottom 2 주기: [&:not(:last-child)]:mb-2
// hover시 보이기? 부모요소: group / hover시에만 보일 요소: invisible group-hover:visible
