// ComponentA.js
import React, { useState, useEffect } from 'react';

const ComponentA = () => {
  const [count, setCount] = useState({ add: 0, update: 0 });
  const [data, setData] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Fetch the initial count from the API
    fetchCount();
  }, []);

  const clearData = () => {
    console.log('Add button clicked for ComponentA');
    // Clear existing data
    setData({ width: 0, height: 0 }, () => {
      // Add new data (you can modify this part based on your data source)
      postData({ action: 'add', newData: data });
      // Increment the "Add" count
      incrementCount('add');
    });
  };
  
  const updateData = () => {
    console.log('Update button clicked for ComponentA');
    // Increment the "Update" count
    incrementCount('update');
    // Update existing data (you can modify this part based on your data source)
    postData({ action: 'update', newData: data });
  };
  

  const incrementCount = (action) => {
    setCount((prevCount) => ({
      ...prevCount,
      [action]: prevCount[action] + 1,
    }));
  };

  const fetchCount = () => {
    fetch('http://localhost:8000/api/count')
      .then((response) => response.json())
      .then((data) => setCount(data))
      .catch((error) => console.error('Error fetching count for ComponentA:', error));
  };

  const postData = (data) => {
    console.log('Posting data:', data);
    fetch('http://localhost:8000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(() => {
        console.log('Data posted successfully');
        fetchCount();
      })
      .catch((error) => console.error('Error posting data for ComponentA:', error));
  };
  

  return (
    <div className="component">
      <h2>Window-1</h2>
      <div>
        <button className="add-button" onClick={clearData}>Add</button>
        <button className="update-button" onClick={updateData}>Update</button>
        <p>Add Count: {count.add}</p>
        <p>Update Count: {count.update}</p>
      </div>
    </div>
  );
};

export default ComponentA;
