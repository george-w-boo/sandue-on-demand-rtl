import { Link } from "react-router-dom";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";

const OrderEntry = () => {
  const [{ totals: { grandTotal }}] = useOrderDetails();

  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {grandTotal}</h2>
      <Link to='/confirmation'>Confirmation</Link>
    </>
  )
}

export default OrderEntry
