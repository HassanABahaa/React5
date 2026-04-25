import "./AddProduct.css";
import { useState } from "react";
import axios from "axios";

function AddProduct({ refreshProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = async () => {
    if (!name || !price) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:3001/products", {
      name,
      price,
    });

   // alert("Added!");

    setName("");
    setPrice("");

    // update table automatically 
    if (refreshProducts) {
      refreshProducts();
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>

      <input
        value={name}
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        value={price}
        placeholder="Product Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;