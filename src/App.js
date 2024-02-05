import logo from "./logo.svg";
import "./App.css";
import ProductPage from "./components/ProductPage";
import { DataHandler } from "./components/DataHandler";
import ProductStore from "./components/ProductStore";
import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <DataHandler>
        <Routes>
          <Route path="/" Component={ProductPage} />
          <Route path="/myStore" Component={ProductStore} />
          {/* <ProductPage /> */}
          {/* <ProductStore/> */}
        </Routes>
      </DataHandler>
    </>
  );
}

export default App;
