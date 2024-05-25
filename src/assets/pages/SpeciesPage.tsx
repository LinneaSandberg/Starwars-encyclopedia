import { useEffect, useState } from "react";
import { SpeciesResponse } from "../types/StarWarsAPI";
import { getSpecies, searchForSpecies } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";
import SpecieCard from "../components/SpecieCard";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PagePagination from "../components/PagePagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";




const SpeciesPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [species, setSpecies] = useState<SpeciesResponse | null>(null);

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<SpeciesResponse | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsQuery = searchParams.get("search");
    const currentPageQuery = searchParams.get("page") || '1';

    const currentPage = Number(currentPageQuery);

    const getAllSpecies = async (page: number) => {
        setError(false);
        setLoading(true);
        setSpecies(null);

        try {
            const data = await getSpecies(page);

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

        setSearchParams({ search: trimmedSearch, page: '1' });
        setSearchInput('');
    }

    const handlePageChange = (page: number) => {
        setSearchParams({ page: String(page) });
    }

    useEffect(() => {
        if (searchParamsQuery) {
            searchSpecies(searchParamsQuery, currentPage);
        } else {
            getAllSpecies(currentPage);
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


            <h2 className="m-3 mb-4">Species</h2>
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

            {loading && <LoadingSpinner />}

            {error && (
                <ErrorMessage message={error} />
            )}

            {species && (
                <PagePagination
                    hasNextPage={species.next_page_url !== null}
                    hasPreviousPage={species.prev_page_url !== null}
                    page={currentPage}
                    totalPages={species.last_page}
                    onPreviousPage={() => handlePageChange(currentPage - 1)}
                    onNextPage={() => handlePageChange(currentPage + 1)}
                />
            )}

        </Container >
    );

}

export default SpeciesPage;