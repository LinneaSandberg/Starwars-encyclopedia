import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import { Film } from '../types/StarWarsAPI';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

interface FilmCardProps {
    film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
    return (
        <Card border="light" style={{ width: "20rem" }}>
            <Card.Header as="h5">{film.title}</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-end">
                <Card.Img className='custom-img' variant="top" src={`${film.image_url}`} />
                <Container>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Director: {film.director}</ListGroup.Item>
                        <ListGroup.Item>Producer: {film.producer}</ListGroup.Item>
                        <ListGroup.Item>Release Date: {film.release_date}</ListGroup.Item>
                    </ListGroup>
                </Container>
                <Link to={`/films/${film.id}`} className='btn custom-button'>Read more</Link>
            </Card.Body>
        </Card>
    )
}

export default FilmCard;