import { Col, Form } from 'react-bootstrap';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
      <p>{name}</p>
      <img style={{width: '50%'}} src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type='checkbox'
          onChange={e => {
            updateItemCount(name, e.target.checked ? 1 : 0)
          }}
          label={name}
        />
      </Form.Group>
    </Col>
  )
}

export default ToppingOption
