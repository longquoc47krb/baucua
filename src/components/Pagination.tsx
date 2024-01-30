import { FaCaretLeft, FaCaretRight } from "react-icons/fa";


interface PaginationControlsProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationControlsProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center mt-4">
            <button
                onClick={handlePrevClick}
                disabled={currentPage === 1}
                className="bg-[#eabd68] hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
                <FaCaretLeft />
            </button>
            <span className="mx-4">{`${currentPage} / ${totalPages}`}</span>
            <button
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
                className="bg-[#eabd68] hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
                <FaCaretRight />
            </button>
        </div>
    );
};

export default Pagination;