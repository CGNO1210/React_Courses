import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardCustom(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.img} height={180}/>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <Button variant="primary" href={'course/'+props.idCourse}>Đăng ký</Button>
            </Card.Body>
        </Card>
    );
}

export default CardCustom;