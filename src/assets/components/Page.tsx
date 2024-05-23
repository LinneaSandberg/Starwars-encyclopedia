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

const Page: React.FC<PageProps> = ({ hasNextPage, hasPreviousPage, page, totalPages, onPreviousPage, onNextPage }) => {
    return (
        <Container className="d-flex align-items-center">
            <Button
                disabled={!hasPreviousPage}
                onClick={onPreviousPage}
                variant="info"
            >Previous</Button>

            <p className="m-0">Page {page} of {totalPages}</p>

            <Button
                disabled={!hasNextPage}
                onClick={onNextPage}
                variant="info"
            >Next
            </Button>

        </Container>
    )
}

export default Page;