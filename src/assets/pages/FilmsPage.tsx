import { useEffect, useRef, useState } from "react";
import { FilmsResponse } from "../types/StarWarsAPI";
import { getFilms, searchForFilms } from "../services/StarWarsAPI";
import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from "react-bootstrap/ListGroup";
import FilmCard from "../components/FilmCard";
import Page from "../components/Page";
// import Page from "../components/Page";


const FilmsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [films, setFilms] = useState<FilmsResponse | null>(null);

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<FilmsResponse | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const inputFromQuery = useRef<HTMLInputElement>(null);

    const searchParamsQuery = searchParams.get("search");
    const searchParamsPage = searchParams.get("page") || '1';
    const [currentPage, setCurrentPage] = useState(parseInt(searchParamsPage) || 1);
    const [searchAttempted, setSearchAttempted] = useState(false);




    const searchFilms = async (searchQuery: string, page = 1
    ) => {
        setError(false);
        setLoading(true);
        setSearchResults(null);

        try {
            const data = await searchForFilms(searchQuery, page);

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
        const trimmedSearch = searchInput.trim();
        setSearchParams({ search: trimmedSearch, page: '1' });
        setSearchAttempted(true);
    }

    useEffect(() => {
        if (searchParamsQuery) {
            searchFilms(searchParamsQuery, currentPage);
        } else {
            getAllFilms(currentPage);
        }

        // searchFilms(searchParamsQuery, currentPage);

        // set the search input field to the search query
        // setSearchInput(searchParamsQuery);
    }, [searchParamsQuery, currentPage]);


    const getAllFilms = async (page = 1) => {
        setError(false);
        setLoading(true);
        setFilms(null);

        try {
            const data = await getFilms(page);

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

    const handlePageChange = (page: number) => {
        if (page < 1 || films && page > films.last_page) {
            return;
        }

        setCurrentPage(page);
        if (searchParamsQuery) {
            setSearchParams({ search: searchParamsQuery, page: page.toString() });
        } else {
            setSearchParams({ page: page.toString() });
        }
    }

    // useEffect(() => {
    //     getAllFilms(currentPage);
    // }, [currentPage]);


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
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
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

            {searchAttempted && (
                <>

                    {searchResults && searchResults.data.length > 0 ? (
                        <>
                            <p>Showing result for our search of "{searchParamsQuery}"</p>

                            {searchResults.data.length > 0 && (
                                <ListGroup>
                                    {searchResults.data.map(film => (
                                        <ListGroup.Item key={film.id}>
                                            <FilmCard film={film} />
                                        </ListGroup.Item>
                                    )
                                    )}
                                </ListGroup>

                            )}

                        </>
                    ) : (<>
                        <p>There where 0 hits on your search of {searchParamsQuery}</p>
                    </>
                    )}
                </>
            )}




            <h2 className="m-3">Films</h2>
            <Container fluid>
                <Row className="justify-content-center">
                    {films && (
                        <>
                            {films.data.map(film => (
                                <Col key={film.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">

                                    <FilmCard key={film.id} film={film} />
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </Container>

            {loading && <p>Loading...</p>}

            {error && <p className='error'>{error}</p>}

            {films && (
                <Page
                    hasPreviousPage={films.prev_page_url !== null}
                    hasNextPage={films.next_page_url !== null}
                    page={currentPage}
                    totalPages={films.last_page
                    }
                    onPreviousPage={() => handlePageChange(currentPage - 1)}
                    onNextPage={() => handlePageChange(currentPage + 1)}
                ></Page>
            )}
        </Container>
    );
}

export default FilmsPage;