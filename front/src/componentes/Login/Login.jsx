
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { Button, Form, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';
import { Cuerpo } from '../Cuerpo/Cuerpo';
import Swal from 'sweetalert2';

export function Login() {
    const baseURL = 'http://localhost:3010/api/v1/';
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState({ correoElectronico: '', clave: '' });

    const { setUserData } = useContext(UserContext);

    const enviarInformacion = async (e) => {
        e.preventDefault();
        // Envia solicitud de inicio de sesión
        axios.post(baseURL + 'auth/login', formulario)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    // Almacena datos de usuario y token en el contexto
                    setUserData({ user: res.data.usuario, token: res.data.token });
                    // Redirige a la página del dashboard
                    navigate('/privado/dashboard');
                    Swal.fire({
                        title: 'BIENVENIDO',
                        text: 'BIENVENIDO Les damos las gracias por usar nuestro servicio, que lo disfrute.',
                    });
                }

            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Error de inicio de sesión',
                    text: 'Verifica tus credenciales e intenta nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                });
            })
    }

    return (
        <>
            <Cuerpo>
                <Container>
                    <Row>
                        <div className='espaciado2'></div>
                        {/* FORMULARIO PAL INGRESO */}
                        <h2>Usuario</h2>
                        <div className="login-container">
                            <div className="login-form">
                                <Form onSubmit={e => enviarInformacion(e)}>
                                    <div className='row'>
                                        <div className="col-md-12">
                                            <Form.Group className="mb-3" controlId="formBasicUsuario">
                                                <Form.Label>Correo Electrónico</Form.Label>
                                                <Form.Control type="text"
                                                    onChange={(e) => setFormulario({ ...formulario, correoElectronico: e.target.value })}
                                                    value={formulario.correoElectronico} required />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-12">
                                            <Form.Group className="mb-3" controlId="formBasicClave">
                                                <Form.Label>Clave</Form.Label>
                                                <Form.Control type="password"
                                                    onChange={(e) => setFormulario({ ...formulario, clave: e.target.value })}
                                                    value={formulario.clave} required />
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <Button variant="primary" className='botonesGM' type="submit">
                                        Entrar
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Row>
                </Container>
            </Cuerpo>
        </>
    );
}