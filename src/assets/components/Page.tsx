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
            <Container>
                <Button
                    disabled={!hasPreviousPage}
                    onClick={onPreviousPage}
                    variant="info"
                >Prev page</Button>
            </Container>
            <Container>
                <p className="m-0">Page {page} of {totalPages}</p>
            </Container>
            <Container>
                <Button
                    disabled={!hasNextPage}
                    onClick={onNextPage}
                    variant="info"
                >Next page
                </Button>
            </Container>
        </Container>
    )
}

export default Page;