import { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = useState(false);
  let navigate = useNavigate();

  const popover = (
  <Popover id="popover-basic">
    <Popover.Body>
      No ice cream will actually be delivered
    </Popover.Body>
  </Popover>
);

  const checkboxLabel = (
    <span>
      I agree to 
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{color: 'blue'}}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );


  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={tcChecked}
          onChange={e => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        disabled={!tcChecked}
        onClick={() => navigate('/confirmation')}
      >
        Confirm order
      </Button>
    </Form>
  )
}

export default SummaryForm