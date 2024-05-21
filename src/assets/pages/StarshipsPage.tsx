import { useEffect, useState } from "react";
import { StarshipsResponse } from "../types/StarWarsAPI";
import { getStarships } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import StarshipCard from "../components/StarshipCard";



const StarshipsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [starships, setStarships] = useState<StarshipsResponse | null>(null);

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

    useEffect(() => {
        getAllStarships();
    }, []);


    return (
        <Container fluid className="d-flex flex-column align-items-center">
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