// ComponentA.js
import React, { useState, useEffect } from 'react';

const ComponentB = () => {
  const [count, setCount] = useState({ add: 0, update: 0 });
  const [data, setData] = useState({ data: '' });
  const [isUpdate, setIsUpdate] = useState(false);
  const [addedData, setAddedData] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch the initial count, added data, and entries from the API
    fetchCount();
    fetchAddedData();
    fetchEntries();
  }, []);

  const clearData = () => {
    console.log('Add button clicked for ComponentA');
    // Clear existing data
    setData({ data: '' });
    // Set to Add mode
    setIsUpdate(false);
    // Increment the "Add" count
    incrementCount('add');
    // Add new data
    postData({ action: 'add', newData: data });
  };

  const updateData = () => {
    console.log('Update button clicked for ComponentA');
    // Set to Update mode
    setIsUpdate(true);
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

  const fetchAddedData = () => {
    fetch('http://localhost:8000/api/data')
      .then((response) => response.json())
      .then((data) => setAddedData(data))
      .catch((error) => console.error('Error fetching added data for ComponentA:', error));
  };

  const fetchEntries = () => {
    fetch('http://localhost:8000/api/entries')
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error('Error fetching entries for ComponentA:', error));
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
      .then(() => {
        console.log('Data posted successfully');
        fetchCount();
        fetchAddedData();
        fetchEntries();
      })
      .catch((error) => console.error('Error posting data for ComponentA:', error));
  };

  return (
    <div className="component">
      <h2>Window-3</h2>
      <div>
        <label>
          Data:
          <input type="text" value={data.data} onChange={(e) => setData({ data: e.target.value })} />
        </label>
        <button className="add-button" onClick={clearData}>
          {isUpdate ? 'Update' : 'Add'}
        </button>
        {!isUpdate && addedData.length > 0 && (
          <button className="update-button" onClick={updateData}>
            Update Added Data
          </button>
        )}
        <p>Add Count: {count.add}</p>
        <p>Update Count: {count.update}</p>
        <p>Added Data: {addedData.map((entry) => entry.data).join(', ')}</p>
        <table>
          <thead>
            <tr>
              <th>Entry</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComponentB;
