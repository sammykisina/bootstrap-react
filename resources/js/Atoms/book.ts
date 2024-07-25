import { Book } from "@/types/book";
import { atom } from "recoil";

// indicate edit book
const isEditingBookState = atom({
    key: "isEditingBookState",
    default: false,
});

// show create / edit  unit tenant Modal
const showCreateOrEditBookModalState = atom({
    key: "showCreateOrEditBookModalState",
    default: false,
});

// hold current unit tenant object
const globalBookState = atom<null | Book>({
    key: "globalBookState",
    default: null,
});

const BookAtoms = {
    showCreateOrEditBookModalState,
    isEditingBookState,
    globalBookState,
};

export default BookAtoms;
