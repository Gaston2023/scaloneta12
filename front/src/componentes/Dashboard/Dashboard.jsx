import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';

import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import axios from 'axios';

import { Button, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Cuerpo } from '../Cuerpo/Cuerpo';



const Dashboard = () => {
    const baseURL = 'http://localhost:3010';

    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);

    const [estadistica, setEstadistica] = useState(null);
    const [estadistica3, setEstadistica3] = useState(null);

    useEffect(() => {
        // Busca la información estadística solo cuando sea presidente
        if (userData.user.tipoUsuario === 0) {
            buscarEstadistica();
        }
    }, []);

    const buscarEstadistica = async () => {
        try {
            const response = await axios.get(baseURL + '/api/v1/estadistica/estadistica', {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            });
            setEstadistica(response.data.dato);
        } catch (error) {
            console.log(error);
        }
    };


    const buscarEstadistica3 = async () => {
        try {
            const response = await axios.get(baseURL + '/api/v1/estadistica/estadistica3', {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            });
            setEstadistica3(response.data.dato);
        } catch (error) {
            console.log(error);
        }
    };

    const irAConvocatoria = () => {
        navigate(`/privado/convocatoria`);
    };

    const irAFutbolistas = () => {
        navigate('/privado/futbolista');
    };

    return (
        userData.user ? (
            <Cuerpo>
                <Container>
                    <Row>
                        <div className='espaciado3'></div>
                        <h1>Bienvenido {userData.user.nombre}!</h1>
                        <div className='container mt-3 mb-1 mb-5'>
                            <h2>Bienvenido {userData.user.nombre}!</h2>

                            <ProtectedElement mustBeEntrenador={true}>
                                <Container>
                                    <Row>
                                        <div className='col-xl-6'>
                                            <Button variant="primary" className='botonesGM' onClick={irAConvocatoria}>Ver Convocatorias</Button>
                                        </div>
                                        <div className='col-xl-6'>
                                            <Button variant="primary" className='botonesGM' onClick={irAFutbolistas}>Ver Futbolistas</Button>
                                        </div>
                                    </Row>
                                </Container>
                                <img src="https://pxb.cdn.elchubut.com.ar/chubut/072021/1626043320134.jpg" alt="messi y el diego" />
                            </ProtectedElement>

                            <ProtectedElement mustBePresidente={true}>
                                <div className='row'>
                                    <h3>Scaloneta</h3>
                                    <div className='class="d-flex justify-content-center"'>
                                        <Button className='botonesGM col-lg-2' onClick={() => {
                                            buscarEstadistica();
                                            buscarEstadistica3();
                                        }}>Mostrar Estadísticas</Button>
                                    </div>

                                    <div className='container mt-3 mb-1 mb-5'>
                                        <div className="col-md-12">
                                            <div className='row'>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Card bg='light'>
                                                        <Card.Body>
                                                            <Card.Title>Futbolistas Creados</Card.Title>
                                                            <Card.Subtitle className="mb-2 text-muted">Activos</Card.Subtitle>
                                                            <Card.Text>{estadistica && estadistica.futbolistasActivos}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>

                                                <Col sm={6} md={6} lg={6}>
                                                    <Card bg='light'>
                                                        <Card.Body>
                                                            <Card.Title>Convocatorias</Card.Title>
                                                            <Card.Subtitle className="mb-2 text-muted">Cantidad de Convocatorias</Card.Subtitle>
                                                            <Card.Text>{estadistica3 && estadistica3.convocatoriasActivas}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </ProtectedElement>
                        </div>
                    </Row>
                </Container>
            </Cuerpo>
        ) : (
            <></>
        )
    );
};

export { Dashboard };
