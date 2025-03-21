import { useState, useEffect } from "react";
import axios from "axios";

const API_URI = "https://jsonplaceholder.typicode.com/posts/1"; // Sample API (Replace with actual API)

const UpdateItem = () => {
  const [item, setItem] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [message, setMessage] = useState("");

  // Fetch existing item when component mounts
  useEffect(() => {
    axios
      .get(API_URI)
      .then((response) => {
        setItem(response.data);
        setUpdatedText(response.data.title); // Pre-fill input with existing value
      })
      .catch((error) => console.error("Error fetching item:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUpdatedText(e.target.value);
  };

  // Handle update request
  const handleUpdate = () => {
    axios
      .patch(API_URI, { title: updatedText }) // PATCH request to update item
      .then((response) => {
        setMessage("Item updated successfully!");
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setMessage("Failed to update item.");
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Update Item</h2>

      {item ? (
        <div>
          <p className="text-gray-700">Current Title: {item.title}</p>
          <input
            type="text"
            value={updatedText}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Update
          </button>
          {message && <p className="mt-2 text-green-600">{message}</p>}
        </div>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );
};

export default UpdateItem;
