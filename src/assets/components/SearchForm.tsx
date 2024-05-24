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

            <Container className="d-flex justify-content-end mt-2 p-0">
                <Button
                    className='custom-button mt-1'
                    type="submit"
                    variant="secondary"
                    disabled={searchInput.length === 0}
                >
                    Search
                </Button>
            </Container>
        </Form>
    )
}

export default SearchForm;