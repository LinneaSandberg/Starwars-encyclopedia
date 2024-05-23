import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";


interface SearchFormProps {
    onHandleUserSearch: (searchInput: string) => void;

}

const SearchForm: React.FC<SearchFormProps> = ({ onHandleUserSearch }) => {
    // state for user input
    const [searchInput, setSearchInput] = useState('');



    const handleUserInput = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedSearch = searchInput.trim();
        onHandleUserSearch(trimmedSearch);
        setSearchInput('');
    }



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