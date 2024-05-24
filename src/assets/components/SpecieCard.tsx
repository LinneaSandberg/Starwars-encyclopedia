import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Specie } from '../types/StarWarsAPI';
import { Link } from 'react-router-dom';

interface SpecieCardProps {
    specie: Specie;
}

const SpecieCard: React.FC<SpecieCardProps> = ({ specie }) => {
    return (
        <Card border="light" style={{ width: "20rem" }}>
            <Card.Body className="d-flex flex-column justify-content-end">
                <Card.Title>{specie.name}</Card.Title>
                <Container>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Classification: {specie.classification}</ListGroup.Item>
                        <ListGroup.Item>Language: {specie.language}</ListGroup.Item>
                        <ListGroup.Item>Designation: {specie.designation}</ListGroup.Item>
                    </ListGroup>
                </Container>
                <Link to={`/species/${specie.id}`} className='btn custom-button'>Read more</Link>
            </Card.Body>
        </Card>
    )
}

export default SpecieCard;