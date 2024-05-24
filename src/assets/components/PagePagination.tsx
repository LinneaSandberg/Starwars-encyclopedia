import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import React from 'react'

interface PageProps {
    hasNextPage: boolean
    hasPreviousPage: boolean
    page: number
    totalPages?: number
    onPreviousPage: () => void
    onNextPage: () => void
}

const PagePagination: React.FC<PageProps> = ({ hasNextPage, hasPreviousPage, page, totalPages, onPreviousPage, onNextPage }) => {
    return (
        <Container className="d-flex align-items-center justify-content-between">
            <Button
                variant="secondary"
                disabled={!hasPreviousPage}
                onClick={onPreviousPage}
                className="custom-button"
            >Previous</Button>

            <p className="m-0">Page {page} of {totalPages}</p>

            <Button
                variant="secondary"
                disabled={!hasNextPage}
                onClick={onNextPage}
                className="custom-button"
            >Next
            </Button>

        </Container>
    )
}

export default PagePagination;