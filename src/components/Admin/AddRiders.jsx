import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const RidersContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const RiderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const RiderTableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const RiderTableCell = styled.td`
  padding: 10px;
`;

const RiderForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const AddRiders = ({ riders,onAddRider,onDeleteRider,setRiders }) => {
  const [newRiderName, setNewRiderName] = useState('');
  const [newRiderContact, setNewRiderContact] = useState('');

  const handleAddRider = (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const riderData = {
    name: newRiderName,
    phone_number: newRiderContact
  };

  axios.post("https://eazy-bazaar-ecommerce-app.onrender.com/riders", riderData)
    .then((response) => {
      onAddRider(response.data); // Assuming this function adds the rider to your local state
      setNewRiderContact('')
      setNewRiderName('')
    })
    .catch(error => {
      console.error('Error adding rider:', error);
      // Handle the error gracefully (e.g., display an error message to the user)
    });
};


const handleDeleteRider = (rider) => {
  axios.delete(`https://eazy-bazaar-ecommerce-app.onrender.com/riders/${rider.id}`)
    .then(response => {
      onDeleteRider(rider.id);
      console.log(rider.id)
       setRiders(riders.filter(item => item.id !== rider.id));
    })
    .catch(error => {
      console.error(error);
    });
};

  return (
    <RidersContainer>
      <RiderTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <RiderTableRow key={rider.id}>
              <RiderTableCell>{rider.name}</RiderTableCell>
              <RiderTableCell>{`+${rider.phone_number}`}</RiderTableCell>
              <RiderTableCell>
                <button onClick={() => handleDeleteRider(rider)}>Delete</button>
              </RiderTableCell>
            </RiderTableRow>
          ))}
        </tbody>
      </RiderTable>
      <RiderForm onSubmit={handleAddRider}>
        <input
          type="text"
          value={newRiderName}
          onChange={(e) => setNewRiderName(e.target.value)}
          placeholder="Enter rider name"
        />
        <input
          type="text"
          value={newRiderContact}
          onChange={(e) => setNewRiderContact(e.target.value)}
          placeholder="Enter contact info"
        />
        <button onClick={handleAddRider}>Add Rider</button>
      </RiderForm>
    </RidersContainer>
  );
};

export default AddRiders;
