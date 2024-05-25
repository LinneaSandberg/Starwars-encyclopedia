import { useEffect, useState } from "react";
import { getPeople, searchForPeople } from "../services/StarWarsAPI";
import { PeopleResponse } from "../types/StarWarsAPI";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";
import PersonCard from "../components/PersonCard";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PagePagination from "../components/PagePagination";
import LoadingSpinner from "../components/LoadingSpinner";


const PeoplePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [people, setPeople] = useState<PeopleResponse | null>(null);

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<PeopleResponse | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsQuery = searchParams.get("search");
    const currentPageQuery = searchParams.get("page") || '1';

    const currentPage = Number(currentPageQuery);


    const getAllPeople = async (page: number) => {
        setError(false);
        setLoading(true);
        setPeople(null);

        try {
            const data = await getPeople(page);

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

    const searchPeople = async (searchQuery: string, page = 1) => {
        setError(false);
        setLoading(true);
        setSearchResults(null);

        try {
            const data = await searchForPeople(searchQuery, page);

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
            searchPeople(searchParamsQuery, currentPage);
        } else {
            getAllPeople(currentPage);
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
                                {searchResults.data.map(person => (
                                    <PersonCard key={person.id} people={person} />
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


            <h2 className="m-3">People</h2>
            <Container fluid>
                <Row className="justify-content-center">
                    {people && (
                        <>
                            {people.data.map(people => (
                                <Col key={people.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">

                                    <PersonCard key={people.id} people={people} />
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </Container>

            {loading && <LoadingSpinner />}

            {error && <p className='error'>{error}</p>}

            {people && (
                <PagePagination
                    hasNextPage={people.next_page_url !== null}
                    hasPreviousPage={people.prev_page_url !== null}
                    page={currentPage}
                    totalPages={people.last_page}
                    onPreviousPage={() => handlePageChange(currentPage - 1)}
                    onNextPage={() => handlePageChange(currentPage + 1)}
                />
            )}

        </Container>

    );

}


export default PeoplePage;