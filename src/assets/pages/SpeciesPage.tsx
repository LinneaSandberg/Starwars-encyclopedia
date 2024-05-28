import { useEffect, useState } from "react";
import { SpeciesResponse } from "../types/StarWarsAPI";
import { getSpecies } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import SpecieCard from "../components/SpecieCard";
import { Link, useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PagePagination from "../components/PagePagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";


const SpeciesPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [species, setSpecies] = useState<SpeciesResponse | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsQuery = searchParams.get("search");
    const currentPageQuery = searchParams.get("page") || '1';
    const currentPage = Number(currentPageQuery);

    const getAllSpecies = async (page: number, query: string) => {
        setError(false);
        setLoading(true);
        setSpecies(null);

        try {
            const data = await getSpecies(page, query);

            setSpecies(data);
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
        getAllSpecies(currentPage, searchParamsQuery ?? '');
    }, [searchParamsQuery, currentPage]);


    return (
        <Container fluid className="d-flex flex-column align-items-center custom">
            <h2>Species</h2>

            <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} handleUserInput={handleUserInput} />

            {species && species.total <= 0 ? (
                <Container fluid>
                    <p>No species found</p>
                    <Link to="/species" role="button" className="back-button" >
                        &laquo; Back to species
                    </Link>
                </Container>

            ) : (
                <>
                    {species && searchParamsQuery ? (
                        <Container fluid>
                            <p className="custom-searchresult-text">Showing {species.total > 1 ? (`results for your search of "${searchParamsQuery}"`) : (`result for your search of "${searchParamsQuery}"`)}</p>
                            <Row className="justify-content-center">
                                {species.data.map(specie => (
                                    <Col key={specie.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                        <SpecieCard key={specie.id} specie={specie} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>

                    ) : (

                        <Container fluid>
                            <Row className="justify-content-center">
                                {species && !searchParamsQuery && (
                                    species.data.map(specie => (
                                        <Col key={specie.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                            <SpecieCard key={specie.id} specie={specie} />
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

                    {species && species.total > 0 && (
                        <PagePagination
                            hasNextPage={species.next_page_url !== null}
                            hasPreviousPage={species.prev_page_url !== null}
                            page={currentPage}
                            totalPages={species.last_page}
                            onPreviousPage={() => handlePageChange(currentPage - 1)}
                            onNextPage={() => handlePageChange(currentPage + 1)}
                        />
                    )}
                </>
            )}
        </Container >
    )
}

export default SpeciesPage;