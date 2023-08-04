
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustomAlert from './CustomAlert';
import Modal from './Modal';
import DummyRiders from './Riders';

const Rider = ({ orders, setOrders, cartItems }) => {
  console.log(cartItems)
  const location = useLocation();
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [riders, setRiders] = useState([
    { id: 1, name: 'Dummy Rider 1', contact: '1234567890', logoUrl: 'https://i.pinimg.com/236x/4f/77/00/4f7700a14a30bc31380abdd699c3698a.jpg' },
    { id: 2, name: 'Dummy Rider 2', contact: '9876543210', logoUrl: 'https://i.pinimg.com/236x/4f/77/00/4f7700a14a30bc31380abdd699c3698a.jpg' },
    { id: 3, name: 'Dummy Rider 3', contact: '5555555555', logoUrl: 'https://i.pinimg.com/236x/4f/77/00/4f7700a14a30bc31380abdd699c3698a.jpg' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      setSelectedOrderIds(idsParam.split(','));
    }
  }, [location.search]);

  const handleOrderSelect = (orderId) => {
    if (selectedOrderIds.includes(orderId)) {
      setSelectedOrderIds(selectedOrderIds.filter((id) => id !== orderId));
    } else {
      setSelectedOrderIds([...selectedOrderIds, orderId]);
    }
  };

  const handleRiderSelect = (rider) => {
    setSelectedRider(rider);
    setRiders(riders.filter((r) => r.id !== rider.id));
  };

  const handleDelivery = () => {
    if (selectedOrderIds.length > 0 && selectedRider) {
      const message = 'Are you sure you want to deliver the selected orders?';
      setModalMessage(message);
      setShowModal(true);
    } else {
      const message = 'Please select orders and a rider before delivering.';
      setModalMessage(message);
      setShowModal(true);
    }
  };

  const handleYesDelivery = () => {
    // Implement the logic to handle order delivery based on the selectedOrderIds
    // For example, you can update the order status to "delivered"
    // and remove the orders from the "orders" array.
    // Make sure to update the "orders" state accordingly.
    const updatedOrders = orders.filter((order) => selectedOrderIds.includes(order.id));
    setOrders(updatedOrders);
    setRiders(riders.filter((rider) => rider.id !== selectedRider.id));
    setSelectedOrderIds([]);
    setSelectedRider(null);
  };

  const getTotalAmount = () => {
    const totalAmount = selectedOrderIds.reduce((acc, orderId) => {
      const order = orders.find((order) => order.id === orderId);
      return order ? acc + order.totalAmount : acc;
    }, 0);
    return totalAmount;
  };

  const getSelectedProducts = () => {
    const selectedProducts = selectedOrderIds.map((orderId) => {
      const order = orders.find((order) => order.id === orderId);
      return order ? order.orderName : '';
    });
    return selectedProducts;
  };

  return (
    <div id="rider-wrapper">
      <div className="container py-5">
        <div className="row py-5">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center mb-4 name">Rider Dashboard</h1>
            {selectedRider ? (
              <div>
                <h2>Selected Rider</h2>
                <p>{selectedRider.name} - {selectedRider.contact}</p>
              </div>
            ) : (
           // In the Rider component, render the DummyRiders component as follows:

<DummyRiders riders={riders} selectedOrders={orders.filter((order) => selectedOrderIds.includes(order.id))} onRiderSelect={handleRiderSelect} />

            )}
            <div className="order-list">
              <h2>Orders to Deliver</h2>
              <ul>
                {orders.map((order) => (
                  <li
                    key={order.id}
                    onClick={() => handleOrderSelect(order.id)}
                    className={selectedOrderIds.includes(order.id) ? 'selected' : ''}
                  >
                    {order.orderName} - ${order.totalAmount}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <button className="btn btn-outline-dark" onClick={handleDelivery}>
                Deliver Selected Orders
              </button>
            </div>
            {selectedOrderIds.length > 0 && (
              <div className="text-center mt-4">
                <p>Total Amount of Selected Orders: ${getTotalAmount()}</p>
                <p>Products Being Delivered: {getSelectedProducts().join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && <CustomAlert message={modalMessage} onClose={() => setShowModal(false)} />}
      <Modal isOpen={showModal} message={modalMessage} onYes={handleYesDelivery} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Rider;
