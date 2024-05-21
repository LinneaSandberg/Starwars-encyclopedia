import { useEffect, useState } from "react";
import { PlanetsResponse } from "../types/StarWarsAPI";
import { getPlanets } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import PlanetCard from "../components/PlanetCard";




const PlanetsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [planets, setPlanets] = useState<PlanetsResponse | null>(null);

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

    useEffect(() => {
        getAllPlanets();
    }, []);

    return (
        <Container fluid className="d-flex flex-column align-items-center">



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