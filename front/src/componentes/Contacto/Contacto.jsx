
import { useState } from "react";
import axios from 'axios';
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import { Cuerpo } from "../Cuerpo/Cuerpo";
import Swal from 'sweetalert2';

export function Contacto() {
    
    const baseURL = 'http://localhost:3010';
    const [formulario, setFormulario] = useState({ nombre: '', correo: '', mensaje: '' });
    

    const enviarInformacion = async (e) => {
        e.preventDefault();
        // argumentos: direccion del servidor, datos enviados al servidor
        axios.post(baseURL + '/api/v1/publico/contacto', formulario)
            .then(res => {
                Swal.fire({
                    text: 'Correo Enviado con Éxito',
                    icon: 'success',
                });
                setFormulario({ nombre: '', correo: '', mensaje: '' });
            })
            .catch(error => {
                console.log('error ', error);
                alert('Correo No Enviado')
            });

    }

    return (
        <>
            <Cuerpo>
                <div>
                    <Container>
                        <Row>
                            <div className='espaciado2'></div>
                            {/* lg='12' */}
                            {/* xxl={8} */}
                            {/* lg="auto" */}
                            <Col lg='6'>
                                <h4>Formulario</h4>
                                <div className='subrayado'></div>
                                <div className='espaciado'></div>
                                <Form onSubmit={e => enviarInformacion(e)}>
                                    <Form.Group className="mb-3" controlId="formBasicNombre">
                                        <Form.Label>Nombre y Apellido</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre y Apellido" onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                                            value={formulario.nombre} required />
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Direccion de email</Form.Label>
                                        <Form.Control type="email" placeholder="hola@email.com" onChange={(e) => setFormulario({ ...formulario, correo: e.target.value })}
                                            value={formulario.correo} required />
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicMensaje">
                                        <Form.Label>Mensaje</Form.Label>
                                        <Form.Control as="textarea" rows={5} placeholder="Mensaje" onChange={(e) => setFormulario({ ...formulario, mensaje: e.target.value })}
                                            value={formulario.mensaje} required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="botonesGM">
                                        Enviar
                                    </Button>
                                </Form>

                            </Col>
                            <Col>
                                <h4>Contacto</h4>
                                <div className='subrayado'></div>
                                <div className='espaciado'></div>
                                <Card className="contacto">
                                    <Card.Img variant="top" src="https://soydelrojo.com/wp-content/uploads/2020/06/afa.jpg" className="oscurecer-img" />
                                    <Card.Body>
                                        <Card.Title> Localidad y contacto</Card.Title>
                                        <div className='subrayado'></div>
                                        <Card.Text>
                                            Sede Social: Viamonte 1366, (C1053ACB)
                                            Ciudad Autónoma de Buenos Aires
                                            Teléfono: + 54 11 4370-7900
                                        </Card.Text>
                                        <div className='subrayado'></div>
                                        <Card.Text>
                                            Predio de Ezeiza: Autopista Ricchieri y
                                            Enrique Fernández Garcia, (1802), Ezeiza, Provincia de Buenos Aires
                                            Teléfono: + 54 4480-9393
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <div className='espaciado'></div>
                        </Row>
                    </Container>
                </div>
            </Cuerpo>

        </>
    )
}