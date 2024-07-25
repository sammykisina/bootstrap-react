import BookAtoms from "@/Atoms/book";
import Toast from "@/Components/toast";
import { useForm } from "@inertiajs/react";
import { clear } from "console";
import React from "react";
import { Button, Form, FormLabel, Modal, Row, Col } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";

const CreateOrEditBook = () => {
    /**
     * === STATES ===
     */

    const setShowCreateOrEditBookModal = useSetRecoilState(
        BookAtoms.showCreateOrEditBookModalState
    );
    const [isEditingBook, setIsEditingBook] = useRecoilState(
        BookAtoms.isEditingBookState
    );
    const [globalBook, setGlobalBook] = useRecoilState(
        BookAtoms.globalBookState
    );

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: "",
        description: "",
        isbn: "",
    });

    console.log("errors", errors);

    /**
     * === FUNCTIONS ===
     */

    /**
     * ON VALUES SUBMIT
     */
    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        console.log("data", data);

        isEditingBook
            ? patch(route("books:update", globalBook?.id), {
                  onSuccess: () => {
                      setShowCreateOrEditBookModal(false);
                      setIsEditingBook(false);
                      reset();
                  },
                  onError: (error) => {
                      console.log("error", error);
                  },
              })
            : post(route("books:create"), {
                  onSuccess: () => {
                      setShowCreateOrEditBookModal(false);
                      setIsEditingBook(false);
                      reset();

                      <Toast
                          bg="primary"
                          title="Success"
                          description="Book created successfully"
                      />;
                  },

                  onError: (errors) => {
                      <Toast
                          bg="danger"
                          title="Error"
                          description="Something went wrong. Please try again."
                      />;
                  },
              });
    };

    /**
     * RESET FORM WHEN EDITING
     */
    React.useEffect(() => {
        if (isEditingBook && globalBook) {
            setData({
                description: globalBook?.description,
                isbn: globalBook?.isbn,
                title: globalBook?.title,
            });
        }
    }, [isEditingBook, globalBook]);

    /**
     * CLEAR FORM
     */
    const clearForm = () => {
        setData({
            description: "",
            isbn: "",
            title: "",
        });
    };

    return (
        <div>
            <Modal.Header>
                <Modal.Title>
                    {isEditingBook ? "Edit Book" : "Create Book"}
                </Modal.Title>
            </Modal.Header>

            <form onSubmit={submit}>
                <Modal.Body>
                    <Row xs={2}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>

                            <Form.Control
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                type="text"
                                placeholder="book title"
                            />

                            <p className="text-sm text-danger">
                                {errors.title}
                            </p>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>ISBN</Form.Label>

                            <Form.Control
                                value={data.isbn}
                                onChange={(e) =>
                                    setData("isbn", e.target.value)
                                }
                                type="text"
                                placeholder="book isbn"
                            />

                            <p className="text-sm text-danger">{errors.isbn}</p>
                        </Form.Group>
                    </Row>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>

                        <Form.Control
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            as="textarea"
                            placeholder="book description"
                        />

                        <p className="text-sm text-danger">
                            {errors.description}
                        </p>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <div className="d-flex justify-content-end gap-2">
                        <Button
                            variant="danger"
                            onClick={() => {
                                setShowCreateOrEditBookModal(false);
                                clearForm();
                            }}
                        >
                            cancel
                        </Button>

                        <Button type="submit" disabled={processing}>
                            {isEditingBook ? (
                                processing ? (
                                    <div>updating...</div>
                                ) : (
                                    "Save changes"
                                )
                            ) : processing ? (
                                <div>creating...</div>
                            ) : (
                                "Create book"
                            )}
                        </Button>
                    </div>
                </Modal.Footer>
            </form>
        </div>
    );
};

export default CreateOrEditBook;
