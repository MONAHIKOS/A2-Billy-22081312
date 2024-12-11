import { useEffect, useState } from "react";

function Item() {
  const [items, setItems] = useState([]);
  const [item_name, setItemName] = useState("");
  const [item_price, setItemPrice] = useState("");

  // Fetch items
  useEffect(() => {
    fetch("http://localhost/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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

  // Update an item
  async function updateItem(item_id, updatedItem) {
    await fetch(`http://localhost/api/items/${item_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    // Optimistically update the item in the state
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.item_id === item_id ? { ...item, ...updatedItem } : item
      )
    );
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
            onUpdate={(updatedItem) => updateItem(item.item_id, updatedItem)}
          />
        ))}
      </div>
    </div>
  );
}

// Component for displaying individual items
function ItemCard({ item, onDelete, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItemName, setEditItemName] = useState(item.item_name);
  const [editItemPrice, setEditItemPrice] = useState(item.item_price);

  const toggleExpanded = () => setExpanded(!expanded);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      item_name: editItemName,
      item_price: parseInt(editItemPrice),
    });

    setIsEditing(false);
  };

  return (
    <div className="item-card" onClick={toggleExpanded}>
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

        <button
          className="button red"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete Item
        </button>
      </div>

      {expanded && (
        <div className="expanded-section" onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <form className="edit-item" onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editItemName}
                onChange={(e) => setEditItemName(e.target.value)}
                placeholder="Item Name"
              />
              <input
                type="text"
                value={editItemPrice}
                onChange={(e) => setEditItemPrice(e.target.value)}
                placeholder="Item Price"
              />
              <button className="button green" type="submit">
                Save
              </button>
              <button
                className="button gray"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <button
                className="button blue"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Item;
