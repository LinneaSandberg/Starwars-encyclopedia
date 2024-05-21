import { useEffect, useState } from "react";
import { Planet } from "../types/StarWarsAPI";
import { Link, useParams } from "react-router-dom";
import { getPlanet } from "../services/StarWarsAPI";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";



const PlanetPage = () => {
    const [planet, setPlanet] = useState<Planet | null>(null);
    const { id } = useParams();
    const planetId = Number(id);

    const getSinglePlanet = async (id: number) => {
        setPlanet(null);

        const data = await getPlanet(id);

        setPlanet(data);
    }

    useEffect(() => {
        getSinglePlanet(planetId);
    }, []);

    return (
        <Container fluid>
            {planet && (
                <Card className="mt-4 mb-4">
                    <Card.Header as="h5">{planet.name}</Card.Header>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>Climate: {planet.climate}</ListGroup.Item>
                            <ListGroup.Item>Diameter: {planet.diameter}</ListGroup.Item>
                            <ListGroup.Item>Gravity: {planet.gravity}</ListGroup.Item>
                            <ListGroup.Item>Orbital Period: {planet.orbital_period}</ListGroup.Item>
                            <ListGroup.Item>Population: {planet.population}</ListGroup.Item>
                            <ListGroup.Item>Rotation Period: {planet.rotation_period}</ListGroup.Item>
                            <ListGroup.Item>Surface Water: {planet.surface_water}</ListGroup.Item>
                            <ListGroup.Item>Terrain: {planet.terrain}</ListGroup.Item>
                        </ListGroup>
                        <Container className="wrapper-list">
                            <h4>Films:</h4>
                            <ul className="link-list">
                                {planet.films.map(film => (
                                    <li key={film.id}><Link to={`/films/${film.id}`}>🎥 {film.title}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        {planet.residents && planet.residents.length > 0 && (
                            <Container className="wrapper-list">
                                <h4>Residents:</h4>
                                <ul className="link-list">
                                    {planet.residents.map(resident => (
                                        <li key={resident.id}><Link to={`/people/${resident.id}`}>🦾 {resident.name}</Link></li>
                                    ))}
                                </ul>
                            </Container>
                        )}
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}

export default PlanetPage;
