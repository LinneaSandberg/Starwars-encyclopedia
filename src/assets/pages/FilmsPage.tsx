import { useEffect, useState } from "react";
import { FilmsResponse } from "../types/StarWarsAPI";
import { getFilms, searchForFilms } from "../services/StarWarsAPI";
import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import FilmCard from "../components/FilmCard";
import SearchForm from "../components/SearchForm";
import PagePagination from "../components/PagePagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";



const FilmsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [films, setFilms] = useState<FilmsResponse | null>(null);

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<FilmsResponse | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsQuery = searchParams.get("search");
    const currentPageQuery = searchParams.get("page") || '1';

    const currentPage = Number(currentPageQuery);



    const getAllFilms = async (page: number) => {
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


    const searchFilms = async (searchQuery: string, page = 1) => {
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

        setSearchInput('');
    }

    const handlePageChange = (page: number) => {
        setSearchParams({ page: String(page) });
    }

    useEffect(() => {
        if (searchParamsQuery) {
            searchFilms(searchParamsQuery, currentPage);
        } else {
            getAllFilms(currentPage);
        }
    }, [searchParamsQuery, currentPage]);


    return (
        <Container fluid className="d-flex flex-column align-items-center">

            <Container>
                <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} handleUserInput={handleUserInput} />
            </Container>

            {searchResults && (
                <>
                    {searchResults.data.length > 0 ? (
                        <>
                            <p>Showing results for your search of {searchParamsQuery}</p>
                            <ListGroup>
                                {searchResults.data.map(film => (
                                    <FilmCard key={film.id} film={film}></FilmCard>
                                ))}
                            </ListGroup>
                        </>
                    ) : (
                        <>
                            <p>No results found for your search of {searchParamsQuery}</p>
                        </>
                    )}
                </>
            )}


            <h2 className="m-3 mb-4">Films</h2>
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

            {loading && <LoadingSpinner />}

            {error && (
                <ErrorMessage message={error} />
            )}

            {films && (
                <PagePagination
                    hasNextPage={films.next_page_url !== null}
                    hasPreviousPage={films.prev_page_url !== null}
                    page={currentPage}
                    totalPages={films.last_page}
                    onPreviousPage={() => handlePageChange(currentPage - 1)}
                    onNextPage={() => handlePageChange(currentPage + 1)}
                />
            )}
        </Container>
    );
}

export default FilmsPage;