import "./item-manager-app.css";
import { useState, useRef } from "react";
import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/ink_pen.svg";
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager() {
  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  // You must use this ref for the item name input
  const itemName = useRef(null);

  const itemCategory = useRef(null);
  const itemPrice = useRef(null);
  const [nextId, setNextId] = useState(1);

  const categoryIcons = {
    Stationary: stationaryLogo,
    Kitchenware: kitchenwareLogo,
    Appliance: applianceLogo,
  };

  const handleAddItem = () => {
    const name = itemName.current.value.trim();
    const category = itemCategory.current.value;
    const price = parseFloat(itemPrice.current.value);

    if (name === "") {
      setErrorMsg("Item name must not be empty");
      return;
    }

    const isDuplicate = items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      setErrorMsg("Item must not be duplicated");
      return;
    }

    if (category === "") {
      setErrorMsg("Please select a category");
      return;
    }

    if (isNaN(price) || price < 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }

    setErrorMsg("");
    const newItem = {
      id: nextId,
      name: name,
      category: category,
      price: price,
    };
    setItems([...items, newItem]);
    setNextId(nextId + 1);

    itemName.current.value = "";
    itemCategory.current.value = "";
    itemPrice.current.value = "";
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setErrorMsg("");
  };

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">Item Management</div>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {/*
             * TODO: Your code goes here
             * !!! IMPORTANT !!!
             * - All items must be listed here (above the form row).
             * - Your input form must be implemented as the LAST row in this table.
             */}

            {/* Display existing items */}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={categoryIcons[item.category]}
                    alt={item.category}
                    className="category-icon"
                  />
                </td>
                <td>฿{item.price.toFixed(2)}</td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="Delete"
                    onClick={() => handleDelete(item.id)}
                    className="delete-icon"
                  />
                </td>
              </tr>
            ))}

            {/* Input form as the last row */}
            <tr>
              <td></td>
              <td>
                <input type="text" ref={itemName} placeholder="Item name" />
              </td>
              <td>
                <select ref={itemCategory} defaultValue="">
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  ref={itemPrice}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </td>
              <td>
                <button onClick={handleAddItem}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message">
        {/* You MUST display the errorMsg state here. */}
        {errorMsg}
      </div>
    </>
  );
}

export default ItemManager;
