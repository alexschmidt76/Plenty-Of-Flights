import React, { useContext } from 'react'
import { DataContext } from '../context/dataContext'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


const FlightPath = () => {
    const {dap,aap} = useContext(DataContext)

    const loadDap = dap.result.read()
    const loadAap = aap.result.read()

    const Departure =  Object.keys(loadDap).map((key,index) => {
        let toString = key+"="+loadDap[key]
        return (
            <Col key={index} style={{display:'flex', justifyContent: 'space-around'}}>
                <li>{toString}</li>
            </Col>
        )
    })

    const Arrival =  Object.keys(loadAap).map((key,index) => {
        let toString = key+"="+loadAap[key]
        return (
            <Col key={index} style={{display:'flex', justifyContent: 'space-around'}}>
                <li>{toString}</li>
            </Col>
        )
    })

    return (
        <div className="itemCard">
                <Container fluid style={{padding: '100px', textAlign: 'center'}}>
                    <h1>FlightPath</h1>
                    <hr></hr>
                    <h2>Departure Airport Information</h2>
                    <Row xs={1} md={3} style={{display: 'flex', justifyContent: 'space-around'}}>
                        <ul>
                        {Departure}
                        </ul>
                    </Row>
                    <h2>Arrival Airport Information</h2>
                    <Row xs={1} md={3} style={{display: 'flex', justifyContent: 'space-around'}}></Row>
                        <ul>
                        {Arrival}
                        </ul>
                    <Row/>
                </Container>
        </div>
    )
}

export default FlightPath