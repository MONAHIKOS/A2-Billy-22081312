import { useState } from "react";

function Item() {
  const [items, setItems] = useState([]);
  const [item_name, setItemName] = useState("");
  const [item_price, setItemPrice] = useState("");

  // Create a new item
  async function createItem(e) {
    e.preventDefault();

    const response = await fetch("http://localhost/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_name,
        item_price: parseInt(item_price),
      }),
    });

    const data = await response.json();

    if (data.item_id) {
      setItems([...items, data]);
    }

    setItemName("");
    setItemPrice("");
  }

  // Delete an item
  async function deleteItem(item_id) {
    await fetch(`http://localhost/api/items/${item_id}`, {
      method: "DELETE",
    });

    setItems(items.filter((item) => item.item_id !== item_id));
  }

  return (
    <div className="item-container">
      {/* New Item Form */}
      <h2>Item Management</h2>
      <form className="new-item" onSubmit={createItem}>
        <input
          type="text"
          placeholder="Item Name"
          onChange={(e) => setItemName(e.target.value)}
          value={item_name}
        />
        <input
          type="text"
          placeholder="Item Price"
          onChange={(e) => setItemPrice(e.target.value)}
          value={item_price}
        />
        <button className="button green" type="submit">
          Create New Item
        </button>
      </form>

      <hr />

      {/* Item List */}
      <div className="item-list">
        {items.map((item) => (
          <ItemCard
            key={item.item_id}
            item={item}
            onDelete={() => deleteItem(item.item_id)}
          />
        ))}
      </div>
    </div>
  );
}

// Component for displaying individual items
function ItemCard({ item, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const expandStyle = {
    display: expanded ? "block" : "none",
  };

  return (
    <div
      className="item-card"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="title">
        <h3>Item Data</h3>
        <div className="item-info">
          <p>
            <strong>Item:</strong> {item.item_name}
          </p>
          <p>
            <strong>Price:</strong> {item.item_price}
          </p>
        </div>

        <button className="button red" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          Delete Item
        </button>
      </div>

      <div style={expandStyle}>
        <hr />
        <p>Additional Details (if any) can go here.</p>
      </div>
    </div>
  );
}

export default Item;
