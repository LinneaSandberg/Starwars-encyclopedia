import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Person } from '../types/StarWarsAPI';

interface PersonCardProps {
    person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
    return (
        <Card className='card-border card-collection mb-4' style={{ width: "20rem" }}>
            <Card.Header as="h5">{person.name}</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-end">
                <Card.Img
                    className="custom-img"
                    variant="top"
                    src={`${person.image_url}`}
                />
                <Container>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Born: {person.birth_year}</ListGroup.Item>
                        <ListGroup.Item>Homeworld: {person.homeworld.name}</ListGroup.Item>
                        <ListGroup.Item>In {person.films_count} movies</ListGroup.Item>
                    </ListGroup>
                </Container>
                <Link to={`/people/${person.id}`} className='btn custom-button'>Read more</Link>
            </Card.Body>
        </Card>
    )
}

export default PersonCard;