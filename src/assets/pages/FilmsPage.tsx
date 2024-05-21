import { useEffect, useRef, useState } from "react";
import { FilmsResponse } from "../types/StarWarsAPI";
import { getFilms, searchForFilms } from "../services/StarWarsAPI";
import { useSearchParams } from "react-router-dom";
import FilmCards from "../components/FilmCards";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from "react-bootstrap/ListGroup";
// import Page from "../components/Page";


const FilmsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [films, setFilms] = useState<FilmsResponse | null>(null);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<FilmsResponse | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const inputFromQuery = useRef<HTMLInputElement>(null);

    const searchParamsQuery = searchParams.get("search");


    const searchFilms = async (searchQuery: string) => {
        setError(false);
        setLoading(true);
        setSearchResults(null);

        try {
            const data = await searchForFilms(searchQuery);

            setSearchResults(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred');
            }
        }

        setLoading(false);
    }

    const handleUserInput = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedSearch = search.trim();

        setSearchParams({ search: trimmedSearch });
    }

    useEffect(() => {
        if (!searchParamsQuery) {
            return;
        }

        searchFilms(searchParamsQuery);
    }, [searchParamsQuery]);


    const getAllFilms = async () => {
        setError(false);
        setLoading(true);
        setFilms(null);

        try {
            const data = await getFilms();

            setFilms(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred');
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        getAllFilms();
    }, []);


    return (
        <Container fluid className="d-flex flex-column align-items-center">

            {/* <SearchForm onHandleUserSearch={searchFilms} ></SearchForm> */}

            <Container fluid className="d-flex flex-column">
                <Form onSubmit={handleUserInput}>
                    <Form.Group controlId='searchQuery'>
                        <Form.Label className="mt-5">Make a search</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            required
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            ref={inputFromQuery}
                        />
                    </Form.Group>

                    <Container className="d-flex justify-content-end mt-2">
                        <Button type="submit" variant="success">
                            Search
                        </Button>
                    </Container>
                </Form>
            </Container>

            {searchResults && (
                <ListGroup>
                    {searchResults.data.map(film => (
                        <ListGroup.Item key={film.id}>{film.title}</ListGroup.Item>
                    )
                    )}
                </ListGroup>
            )}




            <h2 className="m-3">Films</h2>
            <Container fluid>
                <Row className="justify-content-center">
                    {films && (
                        <>
                            {films.data.map(film => (
                                <Col key={film.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">

                                    <FilmCards key={film.id} film={film} />
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </Container>

            {loading && <p>Loading...</p>}

            {error && <p className='error'>{error}</p>}
            {/* 
            <Page
                hasPreviousPage={searchResults?.prev_page_url !== null}
                hasNextPage={searchResults?.next_page_url !== null}
                page={page + 1}
                totalPages={searchResults?.total || 0}
                onPreviousPage={() => setPage(page - 1)}
                onNextPage={() => setPage(page + 1)}
            ></Page> */}
        </Container>
    );
}

export default FilmsPage;