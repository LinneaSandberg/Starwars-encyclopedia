import { useEffect, useState } from "react";
import { getPeoples } from "../services/StarWarsAPI";
import { PeopleResponse } from "../types/StarWarsAPI";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import PersonCard from "../components/PersonCard";




const PeoplePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [people, setPeople] = useState<PeopleResponse | null>(null);

    const getAllPeople = async () => {
        setError(false);
        setLoading(true);
        setPeople(null);

        try {
            const data = await getPeoples();

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


    useEffect(() => {
        getAllPeople();
    }, []);

    return (

        <Container fluid className="d-flex flex-column align-items-center">







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

            {loading && <p>Loading...</p>}

            {error && <p className='error'>{error}</p>}
        </Container>

    );

}


export default PeoplePage;