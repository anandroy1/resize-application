// ComponentB.js
import React, { useState, useEffect } from 'react';

const ComponentB = () => {
  const [count, setCount] = useState({ add: 0, update: 0 });

  useEffect(() => {
    // Fetch the initial count from the API
    fetchCount();
  }, []);

  const clearData = () => {
    console.log('Add button clicked for ComponentB');
    postData({ action: 'add', newData: {} });
  };

  const updateData = () => {
    console.log('Update button clicked for ComponentB');
    postData({ action: 'update', newData: {} });
  };

  const fetchCount = () => {
    fetch('http://localhost:8000/api/count')
      .then((response) => response.json())
      .then((data) => setCount(data))
      .catch((error) => console.error('Error fetching count for ComponentB:', error));
  };

  const postData = (data) => {
    fetch('http://localhost:8000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => fetchCount())
      .catch((error) => console.error('Error posting data for ComponentB:', error));
  };

  return (
    <div className="component">
      <h2>Window-2</h2>
      <div>
        <button className="add-button" onClick={clearData}>Add</button>
        <button className="update-button" onClick={updateData}>Update</button>
        <p>Add Count: {count.add}</p>
        <p>Update Count: {count.update}</p>
      </div>
    </div>
  );
};

export default ComponentB;
