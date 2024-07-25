import React from "react";
import {
    Form,
    FormLabel,
    Toast as BSToast,
    ToastContainer,
} from "react-bootstrap";

const Toast: React.FC<{
    bg: string;
    title: string;
    description: string;
}> = ({ bg, title, description }) => {
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="position-relative"
        >
            <ToastContainer
                position="bottom-end"
                style={{ zIndex: 1 }}
                className="p-3"
            >
                <BSToast bg={bg}>
                    <BSToast.Header>{title}</BSToast.Header>
                    <BSToast.Body>{description}</BSToast.Body>
                </BSToast>
            </ToastContainer>
        </div>
    );
};

export default Toast;
