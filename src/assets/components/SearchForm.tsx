import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";


interface SearchFormProps {
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
    handleUserInput: (e: React.FormEvent) => void;




}

const SearchForm: React.FC<SearchFormProps> = ({ searchInput, setSearchInput, handleUserInput }) => {



    return (
        // <Container fluid className="d-flex flex-column">
        <Form onSubmit={handleUserInput}>
            <Form.Group controlId='searchQuery'>
                <Form.Label className="mt-5">Make a search</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search"
                    required
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </Form.Group>

            <Container className="d-flex justify-content-end mt-2">
                <Button
                    type="submit"
                    variant="success"
                >
                    Search
                </Button>
            </Container>
        </Form>
        // </Container>
    )
}

export default SearchForm;