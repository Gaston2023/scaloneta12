import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function Tarjeta (props)  {

    const { articulo } = props;

    return (
        <div className='container mt-4'>
            <Card className='tarjetaCustom'>
                <Card.Img variant="top" src={articulo.urlToImage} className='imgTarjeta'/>
                <Card.Body className='bodyCustom'>
                    <Card.Title>{articulo.title.slice(0,150)}
                        <div className='subrayado'></div>
                    </Card.Title>
                    <Card.Text>
                        
                        {articulo.description.slice(0,170)}
                    </Card.Text>
                    <Button className='verMasNoticias' as='a'
                        href={articulo.url}
                        target='_blank'>Ver Más
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}