import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Starship } from '../types/StarWarsAPI';
import { Link } from 'react-router-dom';

interface StarshipCardProps {
    starship: Starship;
}

const StarshipCard: React.FC<StarshipCardProps> = ({ starship }) => {
    return (
        <Card border="light" style={{ width: "20rem" }}>
            <Card.Body className="d-flex flex-column justify-content-end">
                <Card.Title>{starship.name}</Card.Title>
                <Container>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Model: {starship.model}</ListGroup.Item>
                        <ListGroup.Item>{starship.crew} Crew members</ListGroup.Item>
                        <ListGroup.Item>{starship.passengers} passengers</ListGroup.Item>
                    </ListGroup>
                </Container>
                <Link to={`/starships/${starship.id}`} className='btn custom-button'>Read more</Link>
            </Card.Body>
        </Card>
    )
}

export default StarshipCard;