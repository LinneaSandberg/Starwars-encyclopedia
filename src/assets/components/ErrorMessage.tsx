import React from "react";
import Container from "react-bootstrap/Container";


interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <Container fluid className="d-flex flex-column align-items-center">
            <h2 className='error-title'>ERROR</h2>
            <p className='error'>There was an error, the error was: <span className="error-message">{message}</span></p>
        </Container>
    )
}

export default ErrorMessage;