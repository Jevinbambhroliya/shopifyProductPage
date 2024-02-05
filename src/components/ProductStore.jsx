import React, { useState } from "react";
import { useMyContext } from "./DataHandler";

const ProductStore = () => {
  const { combinedData, sizeData, colorData, materialData } = useMyContext();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [material, setMaterial] = useState();
  const [quntity, setQuntity] = useState(0);

  const findProduct = () => {
    if (
      sizeData.length > 1 &&
      colorData.length > 1 &&
      materialData.length > 1
    ) {
      return combinedData.find(
        (item) =>
          item.size === size &&
          item.color === color &&
          item.material === material
      );
    } else if (
      sizeData.length > 1 &&
      colorData.length > 1 &&
      materialData.length === 0
    ) {
      return combinedData.find(
        (item) => item.size === size && item.color === color
      );
    } else if (
      sizeData.length > 1 &&
      colorData.length === 0 &&
      materialData.length > 1
    ) {
      return combinedData.find(
        (item) => item.size === size && item.material === material
      );
    } else if (
      sizeData.length === 0 &&
      colorData.length > 1 &&
      materialData.length > 1
    ) {
      return combinedData.find(
        (item) => item.material === material && item.color === color
      );
    } else if (
      sizeData.length > 1 &&
      colorData.length === 0 &&
      materialData.length === 0
    ) {
      return combinedData.find((item) => item.size === size);
    } else if (
      sizeData.length === 0 &&
      colorData.length > 1 &&
      materialData.length === 0
    ) {
      return combinedData.find((item) => item.color === color);
    } else if (
      sizeData.length === 0 &&
      colorData.length === 0 &&
      materialData.length > 1
    ) {
      return combinedData.find((item) => item.material === material);
    }
  };

  const foundProduct = findProduct();

  if (foundProduct) {
    // Do something with the found product, like updating the state or performing an action
    console.log("Found product:", foundProduct);
  } else {
    console.log("Product not found");
  }

  const handleSizeclick = (size) => {
    setSize(size);
  };

  const handleColorClick = (color) => {
    setColor(color);
  };

  const handleMaterialClick = (material) => {
    setMaterial(material);
  };

  return (
    <>
      <div
        className="maindiv"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          {foundProduct && (
            <h1>Price:{foundProduct.price ? foundProduct.price : "00.00" }</h1>
          ) 
          }
        </div>
        {sizeData.length > 0 && <h4 style={{ padding: "0px" }}>sizes</h4>}
        <div style={{ display: "flex" }}>
          {sizeData &&
            sizeData.map((value, index) => {
              {
                if (value !== "") {
                  return (
                    <>
                      <button
                        style={{
                          width: "100px",
                          height: "30px",
                          borderRadius: "5px",
                          marginRight: "10px",
                          cursor: "pointer",
                          backgroundColor: size === value ? "black" : "white",
                          color: size === value ? "white" : "black",
                        }}
                        onClick={() => handleSizeclick(value)}
                        // disabled = {value === "10" ? true : false}
                      >
                        {value}
                      </button>
                    </>
                  );
                }
              }
            })}
        </div>
        {colorData.length > 0 && <h4 style={{ padding: "0px" }}>colors</h4>}
        <div style={{ display: "flex" }}>
          {colorData &&
            colorData.map((value, index) => {
              {
                if (value !== "") {
                  return (
                    <>
                      <button
                        style={{
                          width: "100px",
                          height: "30px",
                          borderRadius: "5px",
                          marginRight: "10px",
                          backgroundColor: color === value ? "black" : "white",
                          color: color === value ? "white" : "black",
                        }}
                        onClick={() => handleColorClick(value)}
                      >
                        {value}
                      </button>
                    </>
                  );
                }
              }
            })}
        </div>
        {materialData.length > 0 && <h4 style={{ padding: "0px" }}>matrial</h4>}
        <div style={{ display: "flex" }}>
          {materialData &&
            materialData.map((value, index) => {
              {
                if (value !== "") {
                  return (
                    <>
                      <button
                        style={{
                          width: "100px",
                          height: "30px",
                          borderRadius: "5px",
                          marginRight: "10px",
                          backgroundColor:
                            material === value ? "black" : "white",
                          color: material === value ? "white" : "black",
                        }}
                        onClick={() => handleMaterialClick(value)}
                      >
                        {value}
                      </button>
                    </>
                  );
                }
              }
            })}
        </div>
        {foundProduct ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid grey",
                borderRadius: "10px",
                width: "full",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: "25px",
                  textAlign: "center",
                  backgroundColor: "grey",
                  height: "30px",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
                onClick={() => quntity !== 0 && setQuntity(quntity - 1)}
              >
                -
              </div>
              <div
                style={{
                  width: "75px",
                  textAlign: "center",
                  backgroundColor: "white",
                  height: "30px",
                }}
              >
                {quntity}
              </div>
              <div
                style={{
                  width: "25px",
                  textAlign: "center",
                  backgroundColor: "grey",
                  height: "30px",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
                onClick={() => quntity != foundProduct.price && setQuntity(quntity + 1)}
              >
                +
              </div>
            </div>
            <br />
            <button
              disabled={foundProduct.available ? false : true}
              style={{ width: "200px", height: "35px" }}
            >
              {" "}
              add to cart
            </button>
            <br />
            <button
              disabled={foundProduct.available ? false : true}
              style={{ width: "200px", height: "35px" }}
            >
              {" "}
              buy it now{" "}
            </button>
            <br />
            <p>{!foundProduct.available ? "sold out" : "available"}</p>
          </div>
        ) : (
          <>
            <h1>please select all available variants</h1>
          </>
        )}
      </div>
    </>
  );
};

export default ProductStore;
