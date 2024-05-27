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
                <Form.Label className='mb-2'>Make a search</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search"
                    required
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className='mb-3'
                />
            </Form.Group>

            <div className="d-flex flex-column align-items-end">
                <Button
                    className='custom-button'
                    type="submit"
                    variant="secondary"
                    disabled={searchInput.length === 0}
                >
                    Search
                </Button>
            </div>
        </Form>
    )
}

export default SearchForm;