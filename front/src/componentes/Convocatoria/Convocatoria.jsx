import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Modal, Form, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

export function Convocatoria() {
    const baseURL = 'http://localhost:3010';

    // para poder navergar entre rutas
    const navigate = useNavigate();
    // datos de convocatoria
    const [convocatorias, setConvocatorias] = useState(null);
    // datos de los rivales disponibles
    const [rivales, setRivales] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // objeto para almacenar la informacion de la convocatoria
    const [convocatoria, setConvocatoria] = useState({ fecha: '', rival: '', golesRecibidos: '', golesConvertidos: '' });

    // Estado para controlar la visibilidad de la tabla
    const [tablaVisible, setTablaVisible] = useState(false);

    // Función para mostrar la tabla
    const mostrarTabla = () => {
        setTablaVisible(true);
    };

    // Función para ocultar la tabla
    const ocultarTabla = () => {
        setTablaVisible(false);
    };


    useEffect(() => {
        buscarConvocatorias();
    }, []);

    const cerrarModal = () => setShowModal(false);

    // activa el modal y busca los rivales
    const verModal = () => {
        buscarRivales();
        setShowModal(true);
    };

    // me quedo solo con la fecha del datetime
    function formatoFecha(dateTime) {
        const fecha = new Date(dateTime);
        return fecha.toISOString().split('T')[0];
    }

    const buscarRivales = async () => {
        axios.get(baseURL + '/api/v1/rival/rivales')
            .then(resp => {
                setRivales(resp.data.dato);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const buscarConvocatorias = async () => {
        axios.get(baseURL + '/api/v1/convocatoria/convocatorias')
            .then(resp => {
                setConvocatorias(resp.data.dato);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const convocar = (id) => {
        const parametro = id;
        navigate(`/privado/convocar/${parametro}`);
    };

    const dashboard = () => {
        navigate('/privado/dashboard');
    };

    const convocados = (idConvocatoria, rival) => {
        navigate(`/privado/convocados/${idConvocatoria}/${rival}`);
    };

    const crearConvocatoria = async (e) => {
        e.preventDefault();

        axios.post(baseURL + '/api/v1/convocatoria/nueva', convocatoria)
            .then(res => {
                if (res.data.estado === 'OK') {
                    Swal.fire({
                        title: 'Convocatoria creada',
                        text: res.data.msj,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    cerrarModal();
                    buscarConvocatorias();
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    const eliminarConvocatoria = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${baseURL}/api/v1/convocatoria/convocatorias/${id}`)
                    .then((res) => {
                        if (res.data.estado === 'OK') {
                            Swal.fire('Eliminado', 'La convocatoria ha sido eliminada.', 'success');
                            buscarConvocatorias();
                        } else {
                            Swal.fire('Error', 'No se pudo eliminar la convocatoria', 'error');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire('Error', 'Ha ocurrido un error al eliminar la convocatoria', 'error');
                    });
            }
        });
    };


    const [convocatoriaEdit, setConvocatoriaEdit] = useState({ fecha: '', rival: '', golesRecibidos: '', golesConvertidos: '' });
    const cargarConvocatoriaParaEditar = async (id) => {
        axios.get(`${baseURL}/api/v1/convocatoria/convocatorias/${id}`)
            .then((res) => {
                if (res.data.estado === 'OK') {
                    const convocatoriaEdit = res.data.dato;

                    setConvocatoriaEdit({
                        fecha: convocatoriaEdit.fecha,
                        golesRecibidos: convocatoriaEdit.golesRecibidos,
                        golesConvertidos: convocatoriaEdit.golesConvertidos,
                    });

                    // para confirmar la edición
                    Swal.fire({
                        title: 'Resultados',
                        html: `
                            <form>
                                <h5> Modificar los Resultados de los goles</h5>
                                <label for="golesRecibidos">Goles Recibidos:</label>
                                <input type="number" id="golesRecibidos" value="">
                                <label for="golesConvertidos">Goles Convertidos:</label>
                                <input type="number" id="golesConvertidos" value="">
                            </form>
                        `,
                        showCancelButton: true,
                        confirmButtonText: 'Guardar',
                        cancelButtonText: 'Cancelar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const golesRecibidos = document.getElementById('golesRecibidos').value;
                            const golesConvertidos = document.getElementById('golesConvertidos').value;

                            // Realizar la solicitud PUT con los datos modificados
                            axios.put(`${baseURL}/api/v1/convocatoria/convocatorias/${id}`, {
                                golesRecibidos,
                                golesConvertidos,
                            })
                                .then((response) => {
                                    if (response.data.estado === 'OK') {
                                        Swal.fire('Datos actualizados con éxito', '', 'success');
                                    } else {
                                        Swal.fire('Error', 'Ocurrió un error al actualizar los datos', 'error');
                                    }
                                })
                                .catch((error) => {
                                    Swal.fire('Error', 'Ocurrió un error al enviar la solicitud', 'error');
                                });
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <>
            <Container>
                <Row>
                    <div className='espaciado2'></div>
                    <div className='row'>
                    <h2>Convocatorias</h2>
                        <div className="col-lg-6">
                            <Button variant="primary" className='botonesGM' onClick={verModal}>Crear Convocatoria</Button>
                        </div>
                        <div className="col-lg-6">
                            <Button variant="primary" className='botonesGM' onClick={mostrarTabla}>Listado Completo</Button>
                        </div>
                        <div className="col-lg-12">
                            <Button variant="primary" className='botonesGM' onClick={ocultarTabla}>Ocultar Listado</Button>
                        </div>
                        <div className="col-lg-12">
                            <Button variant="info" className='botonesGM' onClick={dashboard}>
                                <img src="https://cdn-icons-png.flaticon.com/512/17/17699.png" alt="volver" width={30} />
                            </Button>
                        </div>
                        <h6>* Despues de convocar Jugadores no se podra Eliminar la convocatoria, solo puede eliminar Antes de convocar. *</h6>
                    </div>
                </Row>
            </Container>

            <Container>
                <Row>
                    <div className='espaciado'></div>
                    {tablaVisible && ( <Table striped bordered hover variant='dark' responsive>
                        <thead>
                            <tr>
                                <th className="miThead">Fecha</th>
                                <th className="miThead">Rival</th>
                                <th className="miThead">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                convocatorias ? (convocatorias.map((item, index) => (
                                    <tr key={item.idConvocatoria}>
                                        <td>{formatoFecha(item.fecha)}</td>
                                        <td>{item.nombre}</td>
                                        <td className="col-lg-6">
                                            <Button variant="secondary" onClick={() => convocar(item.idConvocatoria)}>Convocar</Button>
                                            <Button style={{ margin: '10px' }} variant="success" onClick={() => convocados(item.idConvocatoria, item.nombre)}>Equipo Titular</Button>
                                            <Button variant='light' onClick={() => cargarConvocatoriaParaEditar(item.idConvocatoria)} >Resultados-Editar</Button>
                                            <Button style={{ margin: '10px' }} variant='danger' onClick={() => eliminarConvocatoria(item.idConvocatoria)} > Eliminar </Button>
                                        </td>
                                    </tr>
                                )))
                                    : <> <h3>No hay Resultados</h3> </>
                            }
                        </tbody>
                    </Table>
                    )}

                </Row>
            </Container>
            {/* MODAL DE CREAR NUEVA CONVOCATORIA */}
            <Modal show={showModal} onHide={cerrarModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Convocatoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => crearConvocatoria(e)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicFecha">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="date"
                                        onChange={(e) => setConvocatoria({ ...convocatoria, fecha: e.target.value })}
                                        value={convocatoria.fecha} required />
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicRival">
                                    <Form.Label>Rival</Form.Label>
                                    <Form.Select onChange={(e) => setConvocatoria({ ...convocatoria, rival: e.target.value })}>
                                        <option value="">Seleccione una opción</option>
                                        {(rivales?.length > 0) ? rivales.map(item => (
                                            <option key={item.idRival} value={item.idRival}>
                                                {item.nombre}
                                            </option>
                                        )) : <></>}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary" className='botonesGM' type="submit">Guardar</Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}