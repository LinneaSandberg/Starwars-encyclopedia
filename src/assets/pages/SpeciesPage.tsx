import { useEffect, useState } from "react";
import { SpeciesResponse } from "../types/StarWarsAPI";
import { getSpecies, searchForSpecies } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";
import SpecieCard from "../components/SpecieCard";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";




const SpeciesPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [species, setSpecies] = useState<SpeciesResponse | null>(null);

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<SpeciesResponse | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);

    const searchParamsQuery = searchParams.get("search");

    const getAllSpecies = async () => {
        setError(false);
        setLoading(true);
        setSpecies(null);

        try {
            const data = await getSpecies();

            setSpecies(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred');
            }
        }
        setLoading(false);
    }

    const searchSpecies = async (searchQuery: string, page = 1) => {
        setError(false);
        setLoading(true);
        setSearchResults(null);

        try {
            const data = await searchForSpecies(searchQuery, page);

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
        getAllSpecies();
    }, []);

    useEffect(() => {
        if (!searchParamsQuery) {
            return;
        }

        searchSpecies(searchParamsQuery, currentPage);
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
                                {searchResults.data.map(specie => (
                                    <SpecieCard key={specie.id} specie={specie} />
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


            <h2 className="m-3">Species</h2>
            <Container fluid>
                <Row className="justify-content-center">
                    {species && (
                        <>
                            {species.data.map(specie => (
                                <Col key={specie.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">

                                    <SpecieCard key={specie.id} specie={specie} />
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </Container>

            {loading && <p>Loading...</p>}

            {error && <p className='error'>{error}</p>}

        </Container >
    );

}

export default SpeciesPage;