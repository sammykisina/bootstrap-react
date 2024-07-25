import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useRecoilState } from "recoil";
import BookAtoms from "@/Atoms/book";
import { Button, Card, Modal, Table } from "react-bootstrap";
import React from "react";
import { Book } from "@/types/book";
import BookRowAction from "./components/book-row-action";

/**
 * LAZY IMPORTS
 */
const CreateOrEditBook = React.lazy(
    () => import("./components/create-or-edit-book")
);

export default function Dashboard({ books }: { books: Book[] }) {
    /**
     * === STATES ===
     */
    console.log("books", books);
    const auth = usePage<PageProps>().props.auth;

    const [showCreateOrEditBookModal, setShowCreateOrEditBookModal] =
        useRecoilState(BookAtoms.showCreateOrEditBookModalState);

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Books
                </h2>
            }
        >
            <Head title="Books" />

            <div className="container">
                <div className="d-flex justify-end items-center">
                    <Button onClick={() => setShowCreateOrEditBookModal(true)}>
                        Create Book
                    </Button>
                </div>

                <div className="h-screen">
                    <Table responsive className="mt-4 h-full table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>ISBN</th>
                                <th>Description</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books?.map((book, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{book?.title}</td>
                                    <td>{book?.isbn}</td>
                                    <td>{book?.description}</td>
                                    <td>{book?.author?.name}</td>
                                    <td>
                                        <BookRowAction book={book} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* create or edit book modal */}
            <Modal
                show={showCreateOrEditBookModal}
                onHide={() => setShowCreateOrEditBookModal(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <React.Suspense fallback={<div>loading...</div>}>
                    <CreateOrEditBook />
                </React.Suspense>
            </Modal>
        </AuthenticatedLayout>
    );
}
