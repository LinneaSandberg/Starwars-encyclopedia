import { useEffect, useState } from "react";
import { VehiclesResponse } from "../types/StarWarsAPI";
import { getVehicles } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import VehicleCard from "../components/VehicleCard";



const VehiclesPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [vehicles, setVehicles] = useState<VehiclesResponse | null>(null);

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

    useEffect(() => {
        getAllVerhicles();
    }, []);



    return (
        <Container fluid className="d-flex flex-column align-items-center">



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