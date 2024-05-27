import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


interface SearchFormProps {
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
    handleUserInput: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchInput, setSearchInput, handleUserInput }) => {



    return (
        <Form className='search-form' onSubmit={handleUserInput}>
            <Form.Group controlId='searchQuery'>
                <Form.Label>Make a search</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search"
                    required
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </Form.Group>

            <Button
                className='custom-button mt-1 mb-5'
                type="submit"
                variant="secondary"
                disabled={searchInput.length === 0}
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchForm;