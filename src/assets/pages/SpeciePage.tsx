import { useEffect, useState } from "react";
import { Specie } from "../types/StarWarsAPI";
import { Link, useParams } from "react-router-dom";
import { getSpecie } from "../services/StarWarsAPI";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";

const SpeciePage = () => {
    const [specie, setSpecie] = useState<Specie | null>(null);
    const { id } = useParams();
    const specieId = Number(id);

    const getSingleSpecie = async (id: number) => {
        setSpecie(null);

        const data = await getSpecie(id);

        setSpecie(data);
    }

    useEffect(() => {
        getSingleSpecie(specieId);
    }, []);

    return (
        <Container fluid className="custom">
            {specie && (
                <Card className="mt-4 mb-4">
                    <Card.Header as="h5">{specie.name}</Card.Header>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>Classification: {specie.classification}</ListGroup.Item>
                            <ListGroup.Item>Designation: {specie.designation}</ListGroup.Item>
                            <ListGroup.Item>Average Height: {specie.average_height}</ListGroup.Item>
                            <ListGroup.Item>Average Lifespan: {specie.average_lifespan}</ListGroup.Item>
                            <ListGroup.Item>EyeColors: {specie.eye_colors}</ListGroup.Item>
                            <ListGroup.Item>HairColors: {specie.hair_colors}</ListGroup.Item>
                            <ListGroup.Item>Language: {specie.language}</ListGroup.Item>
                            <ListGroup.Item>Average Lifespan: {specie.average_lifespan}</ListGroup.Item>
                        </ListGroup>
                        {specie.homeworld && (
                            <Container className="wrapper-list">
                                <h4>Homeworld:</h4>
                                <Link to={`/planets/${specie.homeworld.id}`}>{specie.name} lives on the 🪐 <span className="homeworld-name">{specie.homeworld.name}</span></Link>
                            </Container>
                        )}
                        <Container className="wrapper-list">
                            <h4>Films:</h4>
                            <ul className="link-list">
                                {specie.films.map(film => (
                                    <li key={film.id}><Link to={`/films/${film.id}`}>🎥 {film.title}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        <Container className="wrapper-list">
                            <h4>People:</h4>
                            <ul className="link-list">
                                {specie.people.map(person => (
                                    <li key={person.id}><Link to={`/people/${person.id}`}>🦾 {person.name}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        <Link to="/species" role="button" className="back-button" >
                            &laquo; Back
                        </Link>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}


export default SpeciePage;