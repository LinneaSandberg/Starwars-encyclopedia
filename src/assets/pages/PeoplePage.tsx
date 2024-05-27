import { useEffect, useState } from "react";
import { getPeople } from "../services/StarWarsAPI";
import { PeopleResponse } from "../types/StarWarsAPI";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import PersonCard from "../components/PersonCard";
import { Link, useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PagePagination from "../components/PagePagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";


const PeoplePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [people, setPeople] = useState<PeopleResponse | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsQuery = searchParams.get("search");
    const currentPageQuery = searchParams.get("page") || '1';
    const currentPage = Number(currentPageQuery);


    const getAllPeople = async (page: number, query: string) => {
        setError(false);
        setLoading(true);
        setPeople(null);

        try {
            const data = await getPeople(page, query);

            setPeople(data);
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
        getAllPeople(currentPage, searchParamsQuery ?? '');
    }, [searchParamsQuery, currentPage]);


    return (
        <Container fluid className="d-flex flex-column align-items-center">
            <h2>People</h2>

            <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} handleUserInput={handleUserInput} />

            {people && people.total <= 0 ? (
                <Container fluid>
                    <p>No people found</p>
                    <Link to="/people" role="button" className="back-button" >
                        &laquo; Back to people
                    </Link>
                </Container>

            ) : (
                <>
                    {people && searchParamsQuery ? (
                        <Container fluid >
                            <p>Showing results for your search of "{searchParamsQuery}"</p>
                            <Row className="justify-content-center">
                                {people.data.map(person => (
                                    <Col key={person.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                        <PersonCard key={person.id} person={person} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>

                    ) : (

                        <Container fluid>
                            <Row className="justify-content-center">
                                {people && !searchParamsQuery && (
                                    people.data.map(person => (
                                        <Col key={person.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                            <PersonCard key={person.id} person={person} />
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

                    {people && people.total > 0 && (
                        <PagePagination
                            hasNextPage={people.next_page_url !== null}
                            hasPreviousPage={people.prev_page_url !== null}
                            page={currentPage}
                            totalPages={people.last_page}
                            onPreviousPage={() => handlePageChange(currentPage - 1)}
                            onNextPage={() => handlePageChange(currentPage + 1)}
                        />
                    )}
                </>
            )}
        </Container>
    )
}


export default PeoplePage;