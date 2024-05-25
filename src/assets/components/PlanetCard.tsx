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
        <Card className='card-border card-collection mb-4' style={{ width: "20rem" }}>
            <Card.Header as="h5">{planet.name}</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-end">
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