import { useEffect, useState } from "react";
import { VehiclesResponse } from "../types/StarWarsAPI";
import { getVehicles, searchForVehicles } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";
import VehicleCard from "../components/VehicleCard";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";



const VehiclesPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [vehicles, setVehicles] = useState<VehiclesResponse | null>(null);

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<VehiclesResponse | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);

    const searchParamsQuery = searchParams.get("search");


    const getAllVerhicles = async () => {
        setError(false);
        setLoading(true);
        setVehicles(null);

        try {
            const data = await getVehicles();

            setVehicles(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred');
            }
        }

        setLoading(false);
    }

    const searchVehicles = async (searchQuery: string, page = 1) => {
        setError(false);
        setLoading(true);
        setSearchResults(null);

        try {
            const data = await searchForVehicles(searchQuery, page);

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
        getAllVerhicles();
    }, []);

    useEffect(() => {
        if (!searchParamsQuery) {
            return;
        }

        searchVehicles(searchParamsQuery, currentPage);
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
                                {searchResults.data.map(vehicle => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
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


            <h2 className="m-3">Vehicles</h2>
            <Container fluid>
                <Row className="justify-content-center">
                    {vehicles && (
                        <>
                            {vehicles.data.map(vehicle => (
                                <Col key={vehicle.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">

                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
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

export default VehiclesPage;