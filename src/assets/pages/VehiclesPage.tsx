import { useEffect, useState } from "react";
import { VehiclesResponse } from "../types/StarWarsAPI";
import { getVehicles } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import VehicleCard from "../components/VehicleCard";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PagePagination from "../components/PagePagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";


const VehiclesPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [vehicles, setVehicles] = useState<VehiclesResponse | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsQuery = searchParams.get("search");
    const currentPageQuery = searchParams.get("page") || '1';
    const currentPage = Number(currentPageQuery);


    const getAllVerhicles = async (page: number, query: string) => {
        setError(false);
        setLoading(true);
        setVehicles(null);

        try {
            const data = await getVehicles(page, query);

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
        getAllVerhicles(currentPage, searchParamsQuery ?? '');
    }, [searchParamsQuery, currentPage]);


    return (
        <Container fluid className="d-flex flex-column align-items-center">
            <h2>Vehicles</h2>


            <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} handleUserInput={handleUserInput} />

            {vehicles && (
                <>
                    {searchParamsQuery ? (
                        <Container fluid>
                            <p>Showing results for your search of "{searchParamsQuery}"</p>
                            <Row className="justify-content-center">
                                {vehicles.data.map(vehicle => (
                                    <Col key={vehicle.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>

                    ) : (

                        <Container fluid>
                            <Row className="justify-content-center">
                                {vehicles && !searchParamsQuery && (
                                    vehicles.data.map(vehicle => (
                                        <Col key={vehicle.id} xs={12} sm={6} md={4} lg={3} className="mb-3 d-flex justify-content-center">
                                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
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

                    <PagePagination
                        hasNextPage={vehicles.next_page_url !== null}
                        hasPreviousPage={vehicles.prev_page_url !== null}
                        page={currentPage}
                        totalPages={vehicles.last_page}
                        onPreviousPage={() => handlePageChange(currentPage - 1)}
                        onNextPage={() => handlePageChange(currentPage + 1)}
                    />
                </>
            )}
        </Container >
    )
}

export default VehiclesPage;