import { Container } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import SummaryForm from "./SummaryForm";

const OrderSummary = () => {
  const [{ scoops, toppings, totals}] = useOrderDetails();

  const scoopsArray = Array.from(scoops, ([name, value]) => ({ name, value }));
  const toppingsArray = Array.from(toppings, ([name, value]) => ({ name, value }));

  
  return (
    <Container>
      <h3>Scoops: {totals.scoops}</h3>
      <ul>
        {scoopsArray.map((scoop, i) => (
          <li key={i}>{scoop.name}: {scoop.value}</li>
        ))}
      </ul>
      {toppingsArray.length ? (
      <>
        <h3>Toppings: {totals.toppings}</h3>
        <ul>
          {toppingsArray.map((scoop, i) => (
            <li key={i}>{scoop.name}: {scoop.value}</li>
          ))}
        </ul>
      </>) : ''}
      <p>Total: {totals.grandTotal}</p>
      <SummaryForm />
    </Container>
  )
}

export default OrderSummary
