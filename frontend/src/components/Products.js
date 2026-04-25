import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // GET ALL PRODUCTS
  const getProducts = async () => {
    const res = await axios.get("http://localhost:3001/products");
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3001/products/${id}`);
    getProducts();
  };

  // UPDATE PRODUCT
  const updateProduct = async (product) => {
    const newName = prompt("Enter new name", product.name);
    const newPrice = prompt("Enter new price", product.price);

    if (!newName || !newPrice) return;

    await axios.put(`http://localhost:3001/products/${product.id}`, {
      name: newName,
      price: newPrice,
    });

    getProducts();
  };

  //  DETAILS PRODUCT
  const getDetails = async (id) => {
    const res = await axios.get(`http://localhost:3001/products/${id}`);

    alert(
      `ID: ${res.data.id}\nName: ${res.data.name}\nPrice: ${res.data.price}`
    );
  };

  // SEARCH (id + name + price)
  const filteredProducts = products.filter((p) => {
    return (
      p.id.toString().includes(search) ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.price.toString().includes(search)
    );
  });

  return (
    <div className="products-container">
      <h2>Products List</h2>

      {/* SEARCH INPUT */}
      <input
        placeholder="Search by id, name, price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>

              <td>
                {/* DELETE */}
                <button
                  className="btn delete-btn"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>

                {/* UPDATE */}
                <button
                  className="btn"
                  onClick={() => updateProduct(p)}
                  style={{ background: "#ffc107", color: "black" }}
                >
                  Update
                </button>

                {/*  DETAILS */}
                <button
                  className="btn"
                  onClick={() => getDetails(p.id)}
                  style={{ background: "#17a2b8", color: "white" }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;