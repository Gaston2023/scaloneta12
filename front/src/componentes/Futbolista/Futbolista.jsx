import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { Button, Table, Form, Modal, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';


export function Futbolista() {
    const baseURL = 'http://localhost:3010';
    const { userData, setUserData } = useContext(UserContext);
    const [archivo, setArchivo] = useState(null);
    const changeArchivo = (e) => {
        setArchivo(e.target.files[0]);
    };
    const [formulario, setFormulario] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        posicion: '',
        apodo: '',
        foto: '',
        pieHabil: '0',
    });

    const [datos, setDatos] = useState(null);
   
    const [mostrarTabla, setMostrarTabla] = useState(false);
    
    const [mostrarAgregar, setMostrarAgregar] = useState(false);


    useEffect(() => {
        buscarFutbolistas();
    }, []);


    const mostrarTablaClick = () => {
        buscarFutbolistas();
        setMostrarTabla(true);
    };

    const ocultarTablaClick = () => {
        setMostrarTabla(false);
    };

    //  FUNCIONA
    const buscarFutbolistas = async () => {
        axios.get(baseURL + '/api/v1/futbolista/futbolistas', {
            headers: {
                Authorization: `Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        })
            .then(resp => {
                console.log(resp.data.dato);
                setDatos(resp.data.dato);
            })
            .catch(error => {
                //console.log(error);
            })
    }



    //   FUNCIONA
    const eliminarFutbolista = async (idFutbolista) => {
        Swal.fire({
            html: '<span style="color: black;">¿Estás seguro de eliminar el futbolista seleccionado?</span>',
            showDenyButton: 'Sí',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(baseURL + '/api/v1/futbolista/futbolistas/' + idFutbolista, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    }
                })
                    .then(async resp => {
                        const result = await Swal.fire({
                            text: resp.data.msj,
                            icon: 'success'
                        });

                        if (result.isConfirmed) {
                            buscarFutbolistas();
                        }
                    })
                    .catch(error => {
                        alert('ERROR')
                        console.log(error);
                    })
            }
        });
    }


    const enviarInformacion = async (e) => {
        e.preventDefault();

        // Validar campos vacíos
        if (!formulario.dni || !formulario.nombre || !formulario.apellido || !formulario.posicion || !formulario.apodo) {
            Swal.fire({
                title: '<span style="color: black">Debe Completar todos los campos</span>',
                icon: 'warning',
            });
            return;
        }

        
        // Crear un objeto formData y agregar los datos del formulario y el archivo de foto
        const formData = new FormData();
        formData.append('dni', formulario.dni);
        formData.append('nombre', formulario.nombre);
        formData.append('apellido', formulario.apellido);
        formData.append('posicion', formulario.posicion);
        formData.append('apodo', formulario.apodo);
        formData.append('pieHabil', formulario.pieHabil);

        // Agrega la foto solo si hay un archivo seleccionado
        if (archivo) {
            formData.append('foto', archivo);
        }

        // Realizar la solicitud POST al servidor
        axios.post(baseURL + '/api/v1/futbolista/futbolistas', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userData.token}`
            },
        })
            .then((res) => {
                setFormulario({
                    dni: '',
                    nombre: '',
                    apellido: '',
                    posicion: '',
                    apodo: '',
                    foto: '',
                    pieHabil: '0',
                });
                buscarFutbolistas();
                setMostrarAgregar(false);

                Swal.fire({
                    title: '<span style="color: black">Jugador Guardado exitosamente en la base de datos</span>',
                    icon: 'success',
                });
            })
            .catch((error) => {
                console.log('error ', error);
            });
    };


    const vaciarCamposAlert = (e) => {
        e.preventDefault();

        // Borra los campos de los inputs
        setFormulario({
            dni: '',
            nombre: '',
            apellido: '',
            posicion: '',
            apodo: '',
            foto: '',
            pieHabil: '0',
        });


    };


    const ocultarModalAgregar = () => {
        setMostrarAgregar(false);
    };

    // Estados para la edicion
    const [futbolistaActualizado, setfutbolistaActualizado] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        posicion: '',
        apodo: '',
        foto: '',
        pieHabil: '0',
    });


    // Función para actualizar un jugador
    const editarActualizar = async (idFutbolista, futbolistaActualizado) => {
        
        const { dni, nombre, apellido, posicion, apodo, pieHabil, foto } = futbolistaActualizado;
        // formulario para editar los datos del jugador
        const { value: valoresFormulario, dismiss: seCancelo } = await Swal.fire({
            title: `<span style="color: black">Jugador: ${idFutbolista}</span>`,
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="DNI" value="${dni}" maxlength="8">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Nombre" value="${nombre}">` +
                `<input id="swal-input3" class="swal2-input" placeholder="Apellido" value="${apellido}">` +
                `<select id="swal-input4" class="swal2-input" placeholder="Posición">
                    <option value="">Seleccione una opción</option>
                    <option value="0" ${posicion === '0' ? 'selected' : ''}>Arquero</option>
                    <option value="1" ${posicion === '1' ? 'selected' : ''}>Defensor</option>
                    <option value="2" ${posicion === '2' ? 'selected' : ''}>Mediocampista</option>
                    <option value="3" ${posicion === '3' ? 'selected' : ''}>Delantero</option>
                </select>` +
                `<input id="swal-input5" class="swal2-input" placeholder="Apodo" value="${apodo}">` +
                `<select id="swal-input6" class="swal2-input" placeholder="Pie Hábil">
                    <option value="0" ${pieHabil === '0' ? 'selected' : ''}>Izquierdo</option>
                    <option value="1" ${pieHabil === '1' ? 'selected' : ''}>Derecho</option>
                </select>` +
                `<input id="swal-input7" type="file" class="swal2-input" placeholder="Foto">`,
            focusConfirm: false,
            showCancelButton: true,
            width: 600,
            preConfirm: () => {
                const dni = document.getElementById('swal-input1').value;
                const nombre = document.getElementById('swal-input2').value;
                const apellido = document.getElementById('swal-input3').value;
                const posicion = document.getElementById('swal-input4').value;
                const apodo = document.getElementById('swal-input5').value;
                const pieHabil = document.getElementById('swal-input6').value;
                const foto = document.getElementById('swal-input7').files[0];

                // Verifica si algún campo está vacío o es nulo
                if (!dni || !nombre || !apellido || !posicion || !apodo || !pieHabil || !foto) {
                    Swal.showValidationMessage('Todos los campos son obligatorios para poder Editar, incluyendo la foto.');
                    return false;
                }

                return {
                    dni,
                    nombre,
                    apellido,
                    posicion,
                    apodo,
                    pieHabil,
                    foto,
                };
            }
        });

        // Si no se canceló la operación y se obtuvieron los valores del formulario
        if (!seCancelo && valoresFormulario) {
            // Crear un objeto FormData y agregar los datos del jugador actualizado
            const formData = new FormData();
            formData.append('dni', valoresFormulario.dni);
            formData.append('nombre', valoresFormulario.nombre);
            formData.append('apellido', valoresFormulario.apellido);
            formData.append('posicion', valoresFormulario.posicion);
            formData.append('apodo', valoresFormulario.apodo);
            formData.append('pieHabil', valoresFormulario.pieHabil);
            formData.append('foto', valoresFormulario.foto);

            try {

                // Enviar una solicitud PUT al servidor para actualizar el jugador
                const response = await axios.put(
                    `${baseURL}/api/v1/futbolista/futbolistas/${idFutbolista}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                if (response.status === 200) {

                    Swal.fire({
                        text: 'Cambios realizados exitosamente',
                        icon: 'success',
                    });

                    // Actualiza la lista de futbolistas
                    buscarFutbolistas();
                } else {
                    Swal.fire({
                        text: 'Ocurrió un error al realizar los cambios.',
                        icon: 'error',
                    });
                }
            } catch (error) {
                console.log('Error al actualizar el futbolista:', error);
                Swal.fire({
                    text: 'Ocurrió un error al procesar la solicitud. Por favor, inténtelo nuevamente.',
                    icon: 'error',
                });
            }
        }
    };


    return (
        <>
            <Container>
                <Row>
                    <div className='espaciado2'></div>
                    <div className="text-center">
                        <Button variant="primary" className='botonesGM' onClick={() => setMostrarAgregar(true)}>
                            Agregar Futbolista
                        </Button>
                        <Button variant="primary" className='botonesGM' onClick={mostrarTablaClick}>
                            Listado Completo
                        </Button>
                    </div>
                </Row>
            </Container>


            {/* MODAL DE AGREGAR JUGADOR */}
            <Modal show={mostrarAgregar} onHide={ocultarModalAgregar} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Jugador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => enviarInformacion(e)}>
                        <Form.Group className="mb-3" controlId="formBasicDniAgregar">
                            <Form.Control
                                type="text"
                                name="dni"
                                value={formulario.dni}
                                onChange={(e) => setFormulario({ ...formulario, dni: e.target.value })}
                                maxLength={8}
                                placeholder='Ingrese dni'
                                required

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNombreAgregar">
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formulario.nombre}
                                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                                placeholder='Ingrese Nombre'
                                required

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicApellidoAgregar">
                            <Form.Control
                                type="text"
                                name="apellido"
                                value={formulario.apellido}
                                onChange={(e) => setFormulario({ ...formulario, apellido: e.target.value })}
                                placeholder='Ingrese Apellido'
                                required

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPosicionAgregar">
                            <Form.Control
                                as="select"
                                name="posicion"
                                value={formulario.posicion}
                                onChange={(e) => setFormulario({ ...formulario, posicion: e.target.value })}

                            >
                                <option value="">Posiciones: Seleccione una opción</option>
                                <option value="0">Arquero</option>
                                <option value="1">Defensor</option>
                                <option value="2">Mediocampista</option>
                                <option value="3">Delantero</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicApodoAgregar">
                            <Form.Control
                                type="text"
                                name="apodo"
                                value={formulario.apodo}
                                onChange={(e) => setFormulario({ ...formulario, apodo: e.target.value })}
                                placeholder='Ingrese Apodo'
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCelular">
                            <Form.Label>Ingrese Foto - Opcional</Form.Label>
                            <Form.Control type="file"
                                accept=".jpg, .jpeg, .png" // tipos de archivo permitidos                                        
                                onChange={changeArchivo}
                                placeholder='Ingese Foto - Opcional'

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPieHabilAgregar">
                            <Form.Label>Pie Hábil</Form.Label>
                            <Form.Control
                                as="select"
                                name="pieHabil"
                                value={formulario.pieHabil}
                                onChange={(e) => setFormulario({ ...formulario, pieHabil: e.target.value })}

                            >
                                <option value="0">Izquierdo</option>
                                <option value="1">Derecho</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ocultarModalAgregar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={(e) => { enviarInformacion(e); vaciarCamposAlert(e) }} type='submit'>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Container>
                <Row>

                    <div className="container mt-1 mb-5">
                        <h2>FUTBOLISTAS</h2>
                        <div className="text-center">
                            <Button variant="primary" className='botonesGM' onClick={() => ocultarTablaClick(false)}>
                                Ocultar Tabla
                            </Button>
                        </div>
                        <div className='espaciado'></div>

                        {mostrarTabla && (
                            <Table striped bordered hover variant='dark' responsive='lg'>
                                <thead>
                                    <tr>
                                        <th className="miThead">ID</th>
                                        <th className="miThead">DNI</th>
                                        <th className="miThead">Apellido</th>
                                        <th className="miThead">Nombre</th>
                                        <th className="miThead">Posición</th>
                                        <th className="miThead">Apodo</th>
                                        <th className="miThead">Foto</th>
                                        <th className="miThead">Pie Habil</th>
                                        <th className="miThead">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datos ? (
                                        datos.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.idFutbolista}</td>
                                                <td>{item.dni}</td>
                                                <td>{item.apellido}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.posicion}</td>
                                                <td>{item.apodo}</td>
                                                <td>
                                                    <img
                                                        className='foto'

                                                        src={`http://localhost:3010/archivos/${item.foto}`} alt={'img'}
                                                        width={25} height={25}

                                                    />
                                                </td>
                                                <td>{item.pieHabil}</td>

                                                <td>
                                                    <Button variant="success" onClick={() => editarActualizar(item.idFutbolista, futbolistaActualizado)}>
                                                        Edit
                                                    </Button>
                                                    <Button style={{ marginLeft: '10px' }} variant="danger" onClick={() => eliminarFutbolista(item.idFutbolista)}>
                                                        X
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No hay futbolistas disponibles</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </Row>

            </Container>

        </>
    );
}

