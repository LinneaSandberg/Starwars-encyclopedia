import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import { Film } from '../types/StarWarsAPI';
import Container from 'react-bootstrap/Container';

interface FilmCardsProps {
    film: Film;
}

const FilmCards: React.FC<FilmCardsProps> = ({ film }) => {
    return (
        <Card border="light" style={{ width: "20rem" }}>
            <Card.Body className="d-flex flex-column justify-content-end">
                <Card.Title>{film.title}</Card.Title>
                <Container>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Director: {film.director}</ListGroup.Item>
                        <ListGroup.Item>Producer: {film.producer}</ListGroup.Item>
                        <ListGroup.Item>Release Date: {film.release_date}</ListGroup.Item>
                    </ListGroup>
                </Container>
                <Button variant="primary" >Read more</Button>
            </Card.Body>
        </Card>
    )
}

export default FilmCards;