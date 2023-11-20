
import React, { useEffect, useState } from "react";
import { Carousel, Alert, Spinner, Button, Container, Row} from "react-bootstrap";
import { Tarjeta } from './Tarjetas';

export function Inicio() {
    
    const [datos, setDatos] = useState(null);
    const [mostrarTodas, setMostrarTodas] = useState(false);

    useEffect(() => {
        const buscarTema = 'futbol';
        const apiKey = 'ad05f78e18b94343a15dd5231ca7eceb';
        const consulta = `https://newsapi.org/v2/everything?q=${buscarTema}&sortBy=publishedAt&pageSize=15&language=es&apiKey=${apiKey}`;

        fetch(consulta)
        .then(resp => {
            resp.json().then(data => {
                setDatos(data.articles);
            })
        })
        .catch(error => {
            console.log('error', error);
        });

    }, []);

    const noticiasParaMostrar = mostrarTodas ? datos : (datos ? datos.slice(0, 3) : []);

    const handleVerMasClick = () => {
        setMostrarTodas(true);
    };

    return (
        <>
            
                {/* carrusel de imágenes... */}
            <Carousel className='tete'>
                <Carousel.Item>
                    <Carousel.Caption className="tituloPort">
                        <h3>Football Soccer</h3>
                        <span>Messi levantando la copa mundial</span>  
                    </Carousel.Caption>
                    <img src="https://media.tycsports.com/files/2022/12/18/517330/lionel-messi_1440x810_wmk.webp?v=1" alt="" width={'100%'} height={'auto'} />
                </Carousel.Item>

                <Carousel.Item>
                    <img src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt7833f4ee6312dc9e/638c40674668d7214ce80de6/Lionel_Messi_Australia_Argentina.jpg?auto=webp&format=pjpg&width=3840&quality=60" alt="" width={'100%'} height={'auto'}/>
                </Carousel.Item>

                <Carousel.Item>
                    <img src="https://media.ambito.com/p/7b8a07781a316046fe4647fff3dc0262/adjuntos/351/imagenes/040/366/0040366985/1200x675/smart/messi-seleccion-argentina-mundial.jpg" alt="" width={'100%'} height={'auto'}/>
                </Carousel.Item>
            </Carousel>
            <div className="paralelogramo">
                <h3 className="titulo-noticias">Noticias</h3>
            </div>
            <Container>

                <Row>
                    <div className="contenedorNoticias">
                        <div className="d-flex flex-wrap">
                            {noticiasParaMostrar.length > 0 ? (
                                noticiasParaMostrar.map((item, index) => (
                                    // mb-3 col-lg-6 col-xl-4
                                    <div key={index} className="mb-3 col-lg-6 col-xl-4">
                                        <Tarjeta articulo={item} />
                                    </div>
                                ))
                            ) : (
                                <div className="container mt-5">
                                    <Alert>
                                        <Spinner animation="border" variant="primary" size='lg' />
                                        <h5>Buscando Información</h5>
                                    </Alert>
                                </div>
                            )}
                        </div>

                        {!mostrarTodas && (
                            <Button onClick={handleVerMasClick} className="verMasNoticias">
                                Ver más noticias
                            </Button>
                        )}
                    </div>
                </Row>

            </Container>
            
        </>
    )
}