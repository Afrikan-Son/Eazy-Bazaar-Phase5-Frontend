import React from 'react';
import './Riders.css';

const DummyRiders = ({ riders, selectedOrders, onRiderSelect }) => {
  console.log(selectedOrders)
  return (
    <div className="dummy-riders-container">
      <h2>Select a Rider</h2>
      <ul className="dummy-riders-list">
        {riders.map((rider) => (
          <li key={rider.id} onClick={() => onRiderSelect(rider)}>
            <div className="rider-info">
              <div className="logo">
                <img src={rider.logoUrl} alt={rider.name} />
              </div>
              <div className="rider-details">
                <p>{rider.name}</p>
                <p>Contact: {rider.contact}</p>
              </div>
            </div>
            {selectedOrders && selectedOrders.length > 0 && (
              <div>
                <h3>Products to Deliver</h3>
                <ul>
                  {selectedOrders.map((order) => (
                    <li key={order.id}>
                      <p>{order.name}</p>
                      <p>Total Amount: ${order.totalAmount}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DummyRiders;
