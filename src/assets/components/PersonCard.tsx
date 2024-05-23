import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Person } from '../types/StarWarsAPI';
import { Link } from 'react-router-dom';

interface PersonCardProps {
    people: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ people }) => {
    return (
        <Card border="light" style={{ width: "20rem" }}>
            <Card.Body className="d-flex flex-column justify-content-end">
                <Card.Title>{people.name}</Card.Title>
                <Container>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Born: {people.birth_year}</ListGroup.Item>
                        <ListGroup.Item>Homeworld: {people.homeworld.name}</ListGroup.Item>
                        <ListGroup.Item>In {people.films_count} movies</ListGroup.Item>
                    </ListGroup>
                </Container>
                <Link to={`/people/${people.id}`} className='btn btn-success'>Read more</Link>
            </Card.Body>
        </Card>
    )
}

export default PersonCard;