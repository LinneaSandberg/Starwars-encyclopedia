import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";


interface SearchFormProps {
}

const SearchForm: React.FC<SearchFormProps> = () => {
    return (
        <Container fluid className="d-flex flex-column">
            <Form >
                <Form.Group controlId='searchQuery'>
                    <Form.Label className="mt-5">Make a search</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        required
                    // value={userInputSearch}
                    // onChange={(e) => setUserInputSearch(e.target.value)}
                    // ref={inputFromQuery}
                    />
                </Form.Group>

                <Container className="d-flex justify-content-end mt-2">
                    <Button type="submit" variant="success">
                        Search
                    </Button>
                </Container>
            </Form>
        </Container>
    )
}

export default SearchForm