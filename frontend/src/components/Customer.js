import { useState, useEffect } from "react";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [customer_name, setCustomerName] = useState("");
  const [customer_email, setCustomerEmail] = useState("");

  // Fetch Customers
  useEffect(() => {
    fetch("http://localhost/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Create a new customer
  async function createCustomer(e) {
    e.preventDefault();

    const response = await fetch("http://localhost/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name,
        customer_email,
      }),
    });

    const data = await response.json();

    if (data.customer_id) {
      setCustomers([...customers, data]);
    }

    setCustomerName("");
    setCustomerEmail("");
  }

  return (
    <div className="customer-container">
      {/* New Customer Form */}
      <h2>Customer Management</h2>
      <form className="new-customer" onSubmit={createCustomer}>
        <input
          type="text"
          placeholder="Customer Name"
          onChange={(e) => setCustomerName(e.target.value)}
          value={customer_name}
        />
        <input
          type="text"
          placeholder="Customer Email Address"
          onChange={(e) => setCustomerEmail(e.target.value)}
          value={customer_email}
        />
        <button className="button green" type="submit">
          Create New Customer
        </button>
      </form>

      <hr />

      {/* Customer List */}
      <div className="customer-list">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.customer_id}
            customer={customer}
            customers={customers}
            setCustomers={setCustomers}
          />
        ))}
      </div>
    </div>
  );
}

// Component for displaying individual customers
function CustomerCard({ customer, customers, setCustomers }) {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // Fetch customer orders
  useEffect(() => {
    fetch(`http://localhost/api/orders/customer/${customer.customer_id}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [customer.customer_id]);

  // Toggle expanded state
  const toggleExpand = (e) => {
    e.stopPropagation(); 
    setExpanded(!expanded);
  };

  async function doDelete(e) {
    e.stopPropagation();

    await fetch(`http://localhost/api/customers/${customer.customer_id}`, {
      method: "DELETE",
    });

    setCustomers(
      customers.filter((c) => c.customer_id !== customer.customer_id)
    );
  }

  return (
    <div className="customer-card" onClick={toggleExpand}>
      <div className="title">
        <h3>Customer Summary</h3>
        <div className="customer-info">
          <p>
            <strong>Customer:</strong> {customer.customer_name}
          </p>
          <p>
            <strong>Email:</strong> {customer.customer_email}
          </p>
        </div>

        <button
          className="button red"
          onClick={(e) => {
            e.stopPropagation();
            doDelete(e);
          }}
        >
          Delete Customer
        </button>
      </div>

      {expanded && (
        <div
          className="expanded-section"
          onClick={(e) => e.stopPropagation()}
        >
          <OrderList orders={orders} />
          <NewOrderForm customer_id={customer.customer_id} setOrders={setOrders} />
          <hr />
        </div>
      )}
    </div>
  );
}


// Component for displaying orders for a specific customer
function OrderList({ orders }) {
  return (
    <div className="order-list">
      <h4>Orders</h4>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.order_id} className="order">
            <p>
              <strong>Order ID:</strong> {order.order_id}
            </p>
            <p>
              <strong>Order Date:</strong> {order.order_date}
            </p>
            <p>
              <strong>Item:</strong> {order.item_name}
            </p>
          </div>
        ))
      ) : (
        <p>No orders available for this customer.</p>
      )}
    </div>
  );
}

// Component for creating a new order
function NewOrderForm({ customer_id, setOrders }) {
  const [order_date, setOrderDate] = useState("");
  const [item_id, setItemId] = useState("");

  async function createOrder(e) {
    e.preventDefault();

    const response = await fetch("http://localhost/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_date,
        customer_id,
        item_id,
      }),
    });

    const newOrder = await response.json();

    if (newOrder.order_id) {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    }

    setOrderDate("");
    setItemId("");
  }

  return (
    <form className="new-order" onSubmit={createOrder}>
      <h4>Create New Order</h4>
      <input
        type="date"
        placeholder="Order Date"
        value={order_date}
        onChange={(e) => setOrderDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Item ID"
        value={item_id}
        onChange={(e) => setItemId(e.target.value)}
      />
      <button className="button blue" type="submit">
        Create Order
      </button>
    </form>
  );
}

export default Customer;
