import React from 'react'
import Form from 'react-bootstrap/Form'

interface SearchFormProps {
    onHandleUserSearch: (query: string) => void;

}

const SearchForm: React.FC<SearchFormProps> = () => {
    return (
        <Form>
            <Form.Group controlId='searchQuery'>
                <Form.Label>Search</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search"
                    required
                />
            </Form.Group>
        </Form>
    )
}

export default SearchForm