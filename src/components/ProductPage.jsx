import React, { useState } from "react";
import "./product.css";
import { useMyContext } from "./DataHandler";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const {
    sizeData,
    setSizeData,
    colorData,
    setColorData,
    materialData,
    setMaterialData,
    combinedData,
    setCombinedData,
  } = useMyContext();
  const [varintsOpen, setVariantsOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState("");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");
  const [thirdDropdownValue, setThirdDropdownValue] = useState("");
  const [items, setItems] = useState(0);
  const [title, setTitle] = useState("");
  const [dropdownValueError, setDropdownValueError] = useState();

  const handleVariantClick = () => {
    !varintsOpen && setVariantsOpen(true);
    if (items < 3) {
      setItems(items + 1);
    }
  };

  const handleDropdown = (e, index) => {
    if (index === 0) {
      if (
        e.target.value === secondDropdownValue ||
        e.target.value === thirdDropdownValue
      ) {
        setFirstDropdownValue("");
        return setDropdownValueError(index);
      }
      setFirstDropdownValue(e.target.value);
      setDropdownValueError();
    } else if (index === 1) {
      if (
        e.target.value === firstDropdownValue ||
        e.target.value === thirdDropdownValue
      ) {
        setSecondDropdownValue("");
        return setDropdownValueError(index);
      }
      setSecondDropdownValue(e.target.value);
      setDropdownValueError();
    } else if (index === 2) {
      if (
        e.target.value === secondDropdownValue ||
        e.target.value === firstDropdownValue
      ) {
        thirdDropdownValue("");
        return setDropdownValueError(index);
      }
      setThirdDropdownValue(e.target.value);
      setDropdownValueError();
    }

    if (e.target.value === "size") {
      console.log("hiiiiiiiii");
      sizeData.length === 0 && setSizeData([""]);
    } else if (e.target.value === "color") {
      colorData.length === 0 && setColorData([""]);
    } else if (e.target.value === "matrial") {
      materialData.length === 0 && setMaterialData([""]);
    }
  };

  const handleSizeInputFocus = (index) => {
    if (index === sizeData.length - 1) {
      setSizeData([...sizeData, ""]);
    }
  };

  const handleSizeInputChange = (event, index) => {
    const newInputs = [...sizeData];
    newInputs[index] = event.target.value;
    setSizeData(newInputs);
  };

  const handleColorInputFocus = (index) => {
    if (index === colorData.length - 1) {
      setColorData([...colorData, ""]);
    }
  };

  const handleColorInputChange = (event, index) => {
    const newInputs = [...colorData];
    newInputs[index] = event.target.value;
    setColorData(newInputs);
  };
  const handleMaterialInputFocus = (index) => {
    if (index === materialData.length - 1) {
      setMaterialData([...materialData, ""]);
    }
  };

  const handleMaterialInputChange = (event, index) => {
    const newInputs = [...materialData];
    newInputs[index] = event.target.value;
    setMaterialData(newInputs);
  };

  const conditionForInput = (index) => {
    return index === 0
      ? firstDropdownValue
      : index === 1
      ? secondDropdownValue
      : thirdDropdownValue;
  };

  const handlePriceChange = (index, price) => {
    setCombinedData((prevData) => {
      const newData = [...prevData];
      newData[index].price = price;
      return newData;
    });
  };

  // Function to handle available change
  const handleAvailableChange = (index, available) => {
    // Assuming combinedData is stored in state and you have a function to update state
    setCombinedData((prevData) => {
      const newData = [...prevData];
      newData[index].available = available;
      return newData;
    });
  };

  return (
    <div className="maindiv">
      <button
        style={{ marginLeft: "auto", width: "100px", height: "30px" }}
        disabled={!title ? true : false}
        onClick={() => navigate('/myStore')}
      >
        {" "}
        Save
      </button>{" "}
      <br />
      <label htmlFor="titleInput" style={{ fontSize: "20px" }}>
        Title:
      </label>{" "}
      <br />
      <input
        type="text"
        name="titleInput"
        style={{ width: "100%", height: "40px", borderRadius: "10px" }}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <br />
      <br />
      <label htmlFor="description" style={{ fontSize: "20px" }}>
        Description:
      </label>
      <br />
      <textarea name="description" id="" cols="105" rows="10"></textarea>
      <br />
      <br />
      <h3>variants:</h3>
      {varintsOpen && (
        <>
          {[...Array(items)].map((_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: " white",
                width: "97%",
                borderRadius: "10px",
                border: "1px solid black",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              <label htmlFor="item" style={{ fontSize: "20px" }}>
                item
              </label>
              <br />
              <select
                name="cars"
                id="cars"
                value={
                  index === 0
                    ? firstDropdownValue
                    : index === 1
                    ? secondDropdownValue
                    : thirdDropdownValue
                }
                onChange={(e) => handleDropdown(e, index)}
                style={{ width: "100%", height: "40px" }}
              >
                '<option value="default"></option>
                <option value="size">size</option>
                <option value="color">color</option>
                <option value="matrial">matrial</option>
              </select>
              {index === dropdownValueError && (
                <h6 style={{ color: "red" }}>select diffrent item</h6>
              )}
              <label htmlFor="detailOfProduct">Detail</label>
              <br />
              {conditionForInput(index) === "size" ? (
                sizeData.map((value, innerIndex) => (
                  <>
                    <input
                      type="text"
                      name="detail"
                      onChange={(event) =>
                        handleSizeInputChange(event, innerIndex)
                      }
                      onFocus={() => handleSizeInputFocus(innerIndex)}
                      disabled={ dropdownValueError === index ? true : false }
                      value={value}
                      style={{
                        width: "97%",
                        height: "25px",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "10px",
                      }}
                    />
                  </>
                ))
              ) : conditionForInput(index) === "color" ? (
                colorData.map((value, innerIndex) => (
                  <>
                    <input
                      type="text"
                      name="detail"
                      onChange={(event) =>
                        handleColorInputChange(event, innerIndex)
                      }
                      onFocus={() => handleColorInputFocus(innerIndex)}
                      disabled={ dropdownValueError === index ? true : false }
                      value={value}
                      style={{
                        width: "97%",
                        height: "25px",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "10px",
                      }}
                    />
                  </>
                ))
              ) : conditionForInput(index) === "matrial" ? (
                materialData.map((value, innerIndex) => (
                  <>
                    <input
                      type="text"
                      name="detail"
                      onChange={(event) =>
                        handleMaterialInputChange(event, innerIndex)
                      }
                      onFocus={() => handleMaterialInputFocus(innerIndex)}
                      disabled={ dropdownValueError === index ? true : false }
                      value={value}
                      style={{
                        width: "97%",
                        height: "25px",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "10px",
                      }}
                    />
                  </>
                ))
              ) : (
                <div>
                  <h1>set item on drop down menu</h1>
                  <br />
                </div>
              )}
            </div>
          ))}
        </>
      )}
      <button
        onClick={handleVariantClick}
        style={{ width: "200px", height: "30px" }}
      >
        {varintsOpen ? "add  more" : "add items for product"}
      </button>
      {varintsOpen && (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            borderRadius: "20px",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>Product</h4>
            <h4 style={{ width: "100px" }}>price</h4>
            <h4>Available</h4>
          </div>
          {combinedData &&
            combinedData.map((item, index) => (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 key={index}>
                    {item.size && `${item.size}`}
                    {item.color &&
                      (item.size ? `/${item.color}` : `${item.color}`)}
                    {item.material &&
                      (item.color || item.size
                        ? `/${item.material}`
                        : `${item.material}`)}
                  </h3>
                  <input
                    type="text"
                    style={{
                      width: "100px",
                      height: "35px",
                      borderRadius: "5px",
                    }}
                    placeholder="Price"
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                  />
                  <input
                    type="text"
                    style={{
                      width: "100px",
                      height: "35px",
                      borderRadius: "5px",
                    }}
                    placeholder="Available"
                    onChange={(e) =>
                      handleAvailableChange(index, e.target.value)
                    }
                  />
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
