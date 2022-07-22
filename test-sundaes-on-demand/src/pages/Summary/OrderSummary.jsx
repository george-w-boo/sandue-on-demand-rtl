import { Container } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import SummaryForm from "./SummaryForm";

const OrderSummary = () => {
  const [{ totals: { grandTotal }}] = useOrderDetails();
  return (
    <Container>
      <p>Total: {grandTotal}</p>
      <SummaryForm />
    </Container>
  )
}

export default OrderSummary
