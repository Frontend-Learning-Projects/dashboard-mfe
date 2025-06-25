import App from "./App";
import { BrowserRouter } from "react-router-dom";

const Root = () => {
  return (
    <BrowserRouter basename="dashboard">
      <App />;
    </BrowserRouter>
  );
};
export default Root;
