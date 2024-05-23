import { useEffect, useState } from "react";
import { StarshipsResponse } from "../types/StarWarsAPI";
import { getStarships, searchForStarships } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";
import StarshipCard from "../components/StarshipCard";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";



const StarshipsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [starships, setStarships] = useState<StarshipsResponse | null>(null);

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<StarshipsResponse | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);

    const searchParamsQuery = searchParams.get("search");


    const getAllStarships = async () => {
        setError(false);
        setLoading(true);
        setStarships(null);

        try {
            const data = await getStarships();

            setStarships(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred');
            }
        }
        setLoading(false);
    }

    const searchStarships = async (searchQuery: string, page = 1) => {
        setError(false);
        setLoading(true);
        setSearchResults(null);

        try {
            const data = await searchForStarships(searchQuery, page);

            setSearchResults(data);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred');
            }
        }
    }

    const handleUserInput = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedSearch = searchInput.trim();

        setCurrentPage(1);

        setSearchParams({ search: trimmedSearch, page: '1' });

        setSearchInput('');
    }

    useEffect(() => {
        getAllStarships();
    }, []);

    useEffect(() => {
        if (!searchParamsQuery) {
            return;
        }

        searchStarships(searchParamsQuery, currentPage);
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
                                {searchResults.data.map(starship => (
                                    <StarshipCard key={starship.id} starship={starship} />
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


            <h2 className="m-3">Starships</h2>
            <Container className="card-container">
                <Row className="justify-content-center">
                    {starships && (
                        <>
                            {starships.data.map(starship => (
                                <Col key={starship.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                    <StarshipCard key={starship.id} starship={starship} />
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

export default StarshipsPage;