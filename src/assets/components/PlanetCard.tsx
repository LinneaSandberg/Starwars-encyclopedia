import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Planet } from '../types/StarWarsAPI';
import { Link } from 'react-router-dom';

interface PlanetCardProps {
    planet: Planet;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
    return (
        <Card border="light" style={{ width: "20rem" }}>
            <Card.Body className="d-flex flex-column justify-content-end">
                <Card.Title>{planet.name}</Card.Title>
                <Container>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Population: {planet.population}</ListGroup.Item>
                        <ListGroup.Item>Terrain: {planet.terrain}</ListGroup.Item>
                        <ListGroup.Item>In {planet.films_count} movies</ListGroup.Item>
                    </ListGroup>
                </Container>
                <Link to={`/planets/${planet.id}`} className='btn custom-button'>Read more</Link>
            </Card.Body>
        </Card>
    )
}

export default PlanetCard;