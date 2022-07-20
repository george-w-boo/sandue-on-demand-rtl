import { Col } from 'react-bootstrap';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
      <p>{name}</p>
      <img style={{width: '75%'}} src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
    </Col>
  )
}

export default ToppingOption
