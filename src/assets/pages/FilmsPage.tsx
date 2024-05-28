import { useEffect, useState } from "react";
import { FilmsResponse } from "../types/StarWarsAPI";
import { getFilms } from "../services/StarWarsAPI";
import { Link, useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
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
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsQuery = searchParams.get("search");
    const currentPageQuery = searchParams.get("page") || '1';
    const currentPage = Number(currentPageQuery);


    const getAllFilms = async (page: number, query: string) => {
        setError(false);
        setLoading(true);
        setFilms(null);

        try {
            const data = await getFilms(page, query);

            setFilms(data);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error has occurred. Please try again later.');
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
        setSearchParams({ search: searchParamsQuery || '', page: String(page) });
    };

    useEffect(() => {
        getAllFilms(currentPage, searchParamsQuery ?? '');
    }, [searchParamsQuery, currentPage]);


    return (
        <Container fluid className="d-flex flex-column align-items-center custom">
            <h2>Films</h2>

            <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} handleUserInput={handleUserInput} />

            {films && films.total <= 0 ? (
                <Container fluid>
                    <p>No films found</p>
                    <Link to="/films" role="button" className="back-button" >
                        &laquo; Back to films
                    </Link>
                </Container>
            ) : (
                <>
                    {films && searchParamsQuery ? (
                        <Container fluid>
                            <p className="custom-searchresult-text">Showing {films.total > 1 ? (`results for your search of "${searchParamsQuery}"`) : (`result for your search of "${searchParamsQuery}"`)}</p>
                            <Row className="justify-content-center">
                                {films.data.map(film => (
                                    <Col key={film.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                        <FilmCard key={film.id} film={film} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>

                    ) : (

                        <Container fluid>
                            <Row className="justify-content-center">
                                {films && !searchParamsQuery && (
                                    films.data.map(film => (
                                        <Col key={film.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                            <FilmCard key={film.id} film={film} />
                                        </Col>
                                    ))
                                )}
                            </Row>
                        </Container>

                    )}

                    {loading && <LoadingSpinner />}

                    {error && (
                        <ErrorMessage message={error} />
                    )}

                    {films && films.total > 0 && (
                        <PagePagination
                            hasNextPage={films.next_page_url !== null}
                            hasPreviousPage={films.prev_page_url !== null}
                            page={currentPage}
                            totalPages={films.last_page}
                            onPreviousPage={() => handlePageChange(currentPage - 1)}
                            onNextPage={() => handlePageChange(currentPage + 1)}
                        />
                    )}

                </>
            )}
        </Container>
    );
}

export default FilmsPage;