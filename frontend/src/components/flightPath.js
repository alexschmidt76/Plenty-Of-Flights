import React, { useContext } from 'react'
import { DataContext } from '../context/dataContext'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const FlightPath = () => {
    const data = useContext(DataContext)
    const loadData = data.result.read()

    const display = loadData.map((item,index) => {
        console.log(item)
        return (
            <Col key={index} style={{display:'flex', justifyContent: 'space-around'}}>
                <li>{item}</li>
            </Col>
        )
    })

    return (
        <div className="itemCard">
                <Container fluid style={{padding: '100px', textAlign: 'center'}}>
                    <Row xs={1} md={3} style={{display: 'flex', justifyContent: 'space-around'}}>
                        <ul>
                        {display}
                        </ul>
                    </Row>
                </Container>
        </div>
    )
}

export default FlightPath