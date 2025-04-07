import React, { useState } from 'react';

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [items, setItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleLoad = async () => {
    const response = await fetch(`/api/collectibles?profile=${userInput}`);
    const data = await response.json();
    setItems(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Collectibles</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter username, ID, or profile URL"
          className="border p-2 rounded"
        />
        <button onClick={handleLoad} className="bg-blue-500 text-white rounded p-2">Load Inventory</button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span>{items.length} items</span>
        <div>
          <button
            className={viewMode === "grid" ? "bg-gray-300 px-4 py-2" : "px-4 py-2"}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </button>
          <button
            className={viewMode === "list" ? "bg-gray-300 px-4 py-2" : "px-4 py-2"}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>
      <div className={viewMode === "grid" ? "grid grid-cols-4 gap-4" : "flex flex-col gap-4"}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-2 transition-all ${selectedItem === idx ? "border-blue-500" : "border-gray-300"}`}
            onClick={() => setSelectedItem(idx)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-contain cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
