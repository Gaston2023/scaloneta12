import { Cuerpo } from "../Cuerpo/Cuerpo";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Institucional() {
    return (
        <Cuerpo>
            <div>
                <Container>
                    <Row>
                        <div className='espaciado2'></div>
                        <Col>
                            <h3>Institución</h3>
                            <div className='subrayado'></div>
                            <div className='espaciado'></div>
                            <p className='institucionInfo'>
                                La Asociación del Fútbol Argentino (AFA) es el ente rector del fútbol en Argentina, encargada de organizar y regular las distintas selecciones nacionales, y los campeonatos oficiales, en todas las modalidades del deporte en ese país, incluidas las ramas de futsal, fútbol playa y fútbol femenino.
                            </p>
                            <img src="https://www.afa.com.ar/upload/torneo/Placas%20categor%C3%ADas/afa3estrellas.png" alt="logo afa" height={300} width={'auto'} />
                        </Col>
                        <Col>
                            <h3>Historia</h3>
                            <div className='subrayado'></div>
                            <div className='espaciado'></div>
                            <p className='institucionInfo'>
                                Fue fundada por Alejandro Watson Hutton en Buenos Aires, el 21 de febrero de 1893, con el nombre de Argentine Association Football League, siendo la más antigua del continente, luego de la extinta Argentine Association Football League de 1891, la que fue disuelta luego de un año de vida y no es reconocida como su predecesora. Tras un proceso de cambio de nombres, escisiones, fusiones y castellanización, adoptó en 1934 la denominación Asociación del Football Argentino y posteriormente, en 1946, su nombre definitivo. Está afiliada a la FIFA desde 1912 y a la Conmebol, de la que es miembro fundador, desde 1916.
                            </p>
                        </Col>
                        <div className='espaciado'></div>
                    </Row>
                </Container>
            </div>
        </Cuerpo>

    );
}
