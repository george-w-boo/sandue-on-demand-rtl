import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { Confirmation } from "./pages/Confirmation/Confirmation";
import OrderEntry from "./pages/Entry/OrderEntry";

function App() {
  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <OrderDetailsProvider>
              <OrderEntry />
            </OrderDetailsProvider>
          }
        />
        <Route
          path="confirmation"
          element={
            <OrderDetailsProvider>
              <Confirmation />
            </OrderDetailsProvider>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
