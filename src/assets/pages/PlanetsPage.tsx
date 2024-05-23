import { useEffect, useState } from "react";
import { PlanetsResponse } from "../types/StarWarsAPI";
import { getPlanets, searchForPlanets } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";
import PlanetCard from "../components/PlanetCard";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";




const PlanetsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [planets, setPlanets] = useState<PlanetsResponse | null>(null);

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<PlanetsResponse | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);

    const searchParamsQuery = searchParams.get("search");


    const getAllPlanets = async () => {
        setError(false);
        setLoading(true);
        setPlanets(null);

        try {
            const data = await getPlanets();

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

    const searchPlanets = async (searchQuery: string, page = 1) => {
        setError(false);
        setLoading(true);
        setSearchResults(null);

        try {
            const data = await searchForPlanets(searchQuery, page);

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

        setCurrentPage(1);

        setSearchParams({ search: trimmedSearch, page: '1' });

        setSearchInput('');
    }

    useEffect(() => {
        getAllPlanets();
    }, []);

    useEffect(() => {
        if (!searchParamsQuery) {
            return;
        }

        searchPlanets(searchParamsQuery, currentPage);
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
                            <p>Showing results for your search of "{searchParamsQuery}"</p>
                            <ListGroup>
                                {searchResults.data.map(planet => (
                                    <PlanetCard key={planet.id} planet={planet} />
                                ))}
                            </ListGroup>
                        </>
                    ) : (
                        <>
                            <p>No results found for your search of "{searchParamsQuery}"</p>
                        </>
                    )}
                </>
            )}


            <h2 className="m-3">Planets</h2>
            <Container fluid>
                <Row className="justify-content-center">
                    {planets && (
                        <>
                            {planets.data.map(planet => (
                                <Col key={planet.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                    <PlanetCard key={planet.id} planet={planet} />
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </Container>

            {loading && <p>Loading...</p>}

            {error && <p className='error'>{error}</p>}
        </Container>
    )
}

export default PlanetsPage;