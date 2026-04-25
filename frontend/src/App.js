import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import { useState } from "react";


function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshProducts = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <AddProduct refreshProducts={refreshProducts} />
      <Products key={refresh} />
    </div>
  );
}

export default App;