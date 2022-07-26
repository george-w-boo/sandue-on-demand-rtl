import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);
  const handleChange = (e) => {
    const currentValue = e.target.value;

    const currentValueFloat = parseFloat(currentValue);

    const isValid = 0 <= currentValueFloat &&
    currentValueFloat <= 10 &&
    Math.floor(currentValueFloat) === currentValueFloat

    // validation
    setIsValid(isValid);

    if (isValid) updateItemCount(name, currentValue);
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
      <p>{name}</p>
      <img
        style={{width: '50%'}}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        as={Row}
        controlId={`${name}-count`}
        style={{ marginTop: '10px'}}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type='number'
            defaultValue={0}
            isInvalid={!isValid}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}

export default ScoopOption