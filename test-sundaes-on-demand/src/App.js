import Options from "./pages/Entry/Options";
import SummaryForm from "./pages/Summary/SummaryForm";

function App() {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <SummaryForm />
    </div>
  );
}

export default App;
