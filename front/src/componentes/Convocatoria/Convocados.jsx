import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

export function Convocados(props) {
    const { idConvocatoria, rival } = useParams();

    const baseURL = "http://localhost:3010/api/v1/";
    const [convocados, setConvocados] = useState([]);
    const [titulares, setTitulares] = useState([]);
    // Crear un estado para el capitán
    const [capitan, setCapitan] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        buscarConvocados();
    }, []);
    const buscarConvocados = async () => {
        axios
            .get(baseURL + "futbolistaConvocatoria/futbolistaConvocatoria/" + idConvocatoria)
            .then((res) => {
                setConvocados(res.data.dato);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const titularizar = async (idFutbolista) => {
        if (titulares.includes(idFutbolista)) {
            // Si ya está seleccionado, quitarlo de la lista de titulares
            setTitulares(titulares.filter((rowId) => rowId !== idFutbolista));
        } else {
            if (titulares.length === 11) {

                Swal.fire({
                    title: 'Error',
                    text: 'Deben ser 11 Jugadores',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                setTitulares([...titulares, idFutbolista]);
            }
        }
    };


    // función para marcar el capitán
    const marcarCapitan = async (idFutbolista) => {
        // Si ya está marcado, quitarlo de la variable capitán
        if (capitan === idFutbolista) {
            setCapitan(null);
        } else {
            // Si no está marcado, asignarlo a la variable capitán
            setCapitan(idFutbolista);
        }
    };

    const volver = () => {
        navigate("/privado/convocatoria");
    };


    const confirmarCambios = async () => {
        // !== 11

        if (titulares > 11 || !capitan) {
            
            Swal.fire({
                title: 'Error',
                text: 'Debe seleccionar 11 titulares y el capitán.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const arquerosSeleccionados = titulares.filter((idFutbolista) => {
            const futbolista = convocados.find((item) => item.idFutbolista === idFutbolista);
            return futbolista && futbolista.posicion === 'Arquero';
        });

        if (arquerosSeleccionados.length !== 1) {
            
            Swal.fire({
                title: 'Error',
                text: 'Debe seleccionar exactamente un arquero.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }


        const cambios = {
            idConvocatoria,
            titulares,
            capitan,
        };

        try {
            const response = await axios.put(baseURL + "futbolistaConvocatoria/nueva2", cambios);

            if (response.data.estado === "OK") {
                await Swal.fire({
                    text: "Equipo titular guardado con éxito.",
                    icon: 'success',
                });
                navigate('/privado/convocatoria');
            } else {
                await Swal.fire({
                    text: "Error al guardar equipo titular.",
                    icon: 'error',
                });
            }
        } catch (error) {
            console.log("Error al procesar la solicitud:", error);
            await Swal.fire({
                text: "Ocurrió un error al procesar la solicitud. Por favor, inténtelo nuevamente.",
                icon: 'error',
            });
        }
    };


    return (
        <>
            <Container>
                <Row>
                    <div className="espaciado2"></div>
                    <div className="container mt-3 mb-1 mb-5">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Convocados vs {rival}</h2>
                            </div>
                            <h6>* Si no hay convocados no puede formar un Equipo titular, primero debe convocar *</h6>
                            <h6>* Debe seleccionar un arquero y maximo 11 Jugadores para que se habilite el boton Confirmar Cambios *</h6>
                            <div className="col-md-12">
                                <Button variant="primary" className="botonesGM" onClick={volver}>
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/17/17699.png"
                                        alt="volver"
                                        width={30}
                                    />
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Table striped bordered hover variant="dark" responsive="lg">
                                <thead>
                                    <tr>

                                        <th className="miThead">Nombre</th>
                                        <th className="miThead">Apellido</th>
                                        <th className="miThead">Pie Habil</th>
                                        <th className="miThead">Dorsal</th>

                                        <th className="miThead">Posición</th>
                                        <th className="miThead">Capitán</th>
                                        <th className="miThead">Titular ({titulares.length})</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {convocados ? (
                                        convocados.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.nombre}</td>
                                                <td>{item.apellido}</td>
                                                <td>{item.pieHabil}</td>
                                                <td>{item.dorsal}</td>

                                                <td>{item.posicion}</td>
                                                <td>

                                                    <input
                                                        type="radio"
                                                        checked={capitan === item.idFutbolista}
                                                        onChange={() => marcarCapitan(item.idFutbolista)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={titulares.includes(item.idFutbolista)}
                                                        onChange={() => titularizar(item.idFutbolista)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <> </>
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        <Button
                            className='botonesGM'
                            onClick={confirmarCambios}
                            disabled={!(titulares.length === 11 && capitan)}
                        >
                            Confirmar cambios
                        </Button>
                    </div>
                </Row>
            </Container>
        </>
    );
}



