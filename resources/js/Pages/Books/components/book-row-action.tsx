import BookAtoms from "@/Atoms/book";
import { Book } from "@/types/book";
import axios from "axios";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useSetRecoilState } from "recoil";

const BookRowAction: React.FC<{ book: Book }> = ({ book }) => {
    /**
     * === STATES ===
     */
    const setIsEditingBook = useSetRecoilState(BookAtoms.isEditingBookState);
    const setShowCreateOrEditBookModal = useSetRecoilState(
        BookAtoms.showCreateOrEditBookModalState
    );
    const setGlobalBook = useSetRecoilState(BookAtoms.globalBookState);

    /**
     * === FUNCTIONS ===
     */
    const deleteBook = () => {
        axios.delete(route("books:destroy", book.id)).then((response) => {
            console.log("response", response);
        });
    };

    return (
        <Dropdown>
            <Dropdown.Toggle
                size="sm"
                className="border rounded-2"
                variant=""
            ></Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => {
                        setIsEditingBook(true);
                        setShowCreateOrEditBookModal(true);
                        setGlobalBook(book);
                    }}
                >
                    Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={deleteBook}>Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default BookRowAction;
