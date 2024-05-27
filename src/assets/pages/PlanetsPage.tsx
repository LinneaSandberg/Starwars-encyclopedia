import { useEffect, useState } from "react";
import { PlanetsResponse } from "../types/StarWarsAPI";
import { getPlanets } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import PlanetCard from "../components/PlanetCard";
import { Link, useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PagePagination from "../components/PagePagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";


const PlanetsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [planets, setPlanets] = useState<PlanetsResponse | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsQuery = searchParams.get("search");
    const currentPageQuery = searchParams.get("page") || '1';
    const currentPage = Number(currentPageQuery);


    const getAllPlanets = async (page: number, query: string) => {
        setError(false);
        setLoading(true);
        setPlanets(null);

        try {
            const data = await getPlanets(page, query);

            setPlanets(data);
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
        setSearchParams({ search: searchParamsQuery || '', page: String(page) });
    };

    useEffect(() => {
        getAllPlanets(currentPage, searchParamsQuery ?? '');
    }, [searchParamsQuery, currentPage]);


    return (
        <Container fluid className="d-flex flex-column align-items-center">
            <h2>Planets</h2>

            <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} handleUserInput={handleUserInput} />

            {planets && planets.total <= 0 ? (
                <Container fluid>
                    <p>No planets found</p>
                    <Link to="/planets" role="button" className="back-button" >
                        &laquo; Back to planets
                    </Link>
                </Container>
            ) : (
                <>
                    {planets && searchParamsQuery ? (
                        <Container fluid>
                            <p>Showing results for your search of "{searchParamsQuery}"</p>
                            <Row className="justify-content-center">
                                {planets.data.map(planet => (
                                    <Col key={planet.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                        <PlanetCard key={planet.id} planet={planet} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>

                    ) : (

                        <Container fluid>
                            <Row className="justify-content-center">
                                {planets && !searchParamsQuery && (
                                    planets.data.map(planet => (
                                        <Col key={planet.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                            <PlanetCard key={planet.id} planet={planet} />
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

                    {planets && planets.total > 0 && (
                        <PagePagination
                            hasNextPage={planets.next_page_url !== null}
                            hasPreviousPage={planets.prev_page_url !== null}
                            page={currentPage}
                            totalPages={planets.last_page}
                            onPreviousPage={() => handlePageChange(currentPage - 1)}
                            onNextPage={() => handlePageChange(currentPage + 1)}
                        />
                    )}
                </>
            )}
        </Container>
    )
}

export default PlanetsPage;