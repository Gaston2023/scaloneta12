import { UserContext } from '../UserContext/UserContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Table, Container, Row, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';


export function Convocar(props) {
  const { userData } = useContext(UserContext);

  const { parametro } = useParams();
  const baseURL = 'http://localhost:3010/api/v1/';
  const [futbolistas, setFutbolistas] = useState([]);
  const [convocados, setConvocados] = useState([]);
  const navigate = useNavigate();
  const [dorsal, setDorsal] = useState({});


  useEffect(() => {
    buscarFutbolistas();
  }, []);

  const buscarFutbolistas = async () => {
    axios.get(baseURL + 'futbolista/futbolistas', {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then(res => {
        setFutbolistas(res.data.dato);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const convocar = (idFutbolista) => {
    if (convocados.includes(idFutbolista)) {
      setConvocados(convocados.filter((rowId) => rowId !== idFutbolista));
    } else {
      setConvocados([...convocados, idFutbolista]);
    }
  };


  const enviarInformacion = () => {

    if (convocados.length < 2 || convocados.length > 26) {
      Swal.fire({
        text: 'Debe convocar entre 2 y 26 futbolistas.',
        icon: 'error',
      });
    } else {
      const lista = { idConvocatoria: parametro, futbolistas: convocados, dorsales: dorsal };

      axios.post(baseURL + 'futbolistaConvocatoria/nueva', lista, {
        headers: {
            
            'Authorization': `Bearer ${userData.token}`
        },
    })
        .then(async res => {
          if (res.data.estado === 'OK') {
            const result = await Swal.fire({
              //text: res.data.msj,
              text: 'Futbolistas Convocados Exitosamente',
              icon: 'success',
            });
            if (result.isConfirmed) {
              convocatoria()
              //navigate('/privado/convocatoria');
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const convocatoria = () => {
    navigate('/privado/convocatoria');
  };

  return (
    <>
      <Container>
        <Row>
          <div className='espaciado2'></div>
          <div className="container mt-3 mb-1 mb-5">
            <div className="row">
              <div className="col-md-12">
                <h2>Convocatoria Futbolistas</h2>
                <h6>* Usted debe convocar o seleccionar minimo 2 jugadores y maximo 26, si no cumple estas condiciones no se habilitara el boton Convocar,
                  si no selecciona a ningun jugador a futuro no podrá formar un Equipo Titular. Tambien Puede volver en otro momento y realizar la seleccion deseada,
                  ha sido advertido *</h6>
              </div>
              <div className="col-md-12">
                <Button
                  variant="primary"
                  className='botonesGM'
                  onClick={enviarInformacion}
                  disabled={convocados.length < 2 || convocados.length > 26 ||
                    convocados.some(id => !dorsal[id] || dorsal[id].trim() === '')}
                >
                  Convocar
                </Button>
              </div>
              <div className="col-md-12">
                <Button variant="info" className='botonesGM' onClick={convocatoria}>
                  <img src="https://cdn-icons-png.flaticon.com/512/17/17699.png" alt="volver" width={30} />
                </Button>
              </div>
            </div>

            
              <Table striped bordered hover variant='dark' responsive='lg'>
                <thead>
                  <tr>
                    <th className="miThead">Nombre</th>
                    <th className="miThead">Apellido</th>
                    <th className="miThead">Pie Hábil</th>
                    <th className="miThead">Posición</th>
                    <th className="miThead">Dorsal</th>
                    <th className="miThead">Convocar</th>
                  </tr>
                </thead>
                <tbody>
                  {futbolistas.map((item, index) => (
                    <tr key={index}>

                      <td>{item.nombre}</td>
                      <td>{item.apellido}</td>
                      <td>{item.pieHabil}</td>
                      <td>{item.posicion}</td>
                      <td>
                        <input
                          size={3}
                          type="text"
                          placeholder='00'
                          value={dorsal[item.idFutbolista] || ''}
                          onChange={(e) => setDorsal({ ...dorsal, [item.idFutbolista]: e.target.value })}
                          maxLength={2}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={convocados.includes(item.idFutbolista)}
                          onChange={() => convocar(item.idFutbolista)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
           
          </div>
        </Row>
      </Container>
    </>
  );
}


