import { useEffect, useState } from "react";
import { SpeciesResponse } from "../types/StarWarsAPI";
import { getSpecies } from "../services/StarWarsAPI";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import SpecieCard from "../components/SpecieCard";




const SpeciesPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [species, setSpecies] = useState<SpeciesResponse | null>(null);

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

    useEffect(() => {
        getAllSpecies();
    }, []);



    return (
        <Container fluid className="d-flex flex-column align-items-center">





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