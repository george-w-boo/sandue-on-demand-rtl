import { useNavigate } from "react-router-dom";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";
import { Button } from "react-bootstrap";

const OrderEntry = () => {
  const [{ totals: { grandTotal }}] = useOrderDetails();
  let navigate = useNavigate();

  console.log('grandTotal', grandTotal);

  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {grandTotal}</h2>
      <Button
        variant='primary'
        type='submit'
        disabled={grandTotal === '$0.00' ? true : false}
        onClick={() => navigate('/summary')}
      >
        Go to summary
      </Button>
    </>
  )
}

export default OrderEntry
