import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Specie } from '../types/StarWarsAPI';

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
                <Button variant="primary" >Read more</Button>
            </Card.Body>
        </Card>
    )
}

export default SpecieCard;