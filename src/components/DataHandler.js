import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const MyContext = createContext();

const DataHandler = ({ children }) => {
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [materialData, setMaterialData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);


  useEffect(() => {
    const combined = [];

    if (sizeData.length > 0 && colorData.length > 0 && materialData.length > 0) {
      sizeData.forEach((s) => {
        const trimmedSize = s.trim();
        if (trimmedSize !== '') {
          colorData.forEach((c) => {
            const trimmedColor = c.trim();
            if (trimmedColor !== '') {
              materialData.forEach((m) => {
                const trimmedMaterial = m.trim();
                if (trimmedMaterial !== '') {
                  const result = { size: trimmedSize, color: trimmedColor, material: trimmedMaterial , price:"" , available:""};
                  combined.push(result);
                }
              });
            }
          });
        }
      });
    } else if (sizeData.length > 0 && colorData.length === 0 && materialData.length > 0) {
      sizeData.forEach((s) => {
        const trimmedSize = s.trim();
        if (trimmedSize !== '') {
          materialData.forEach((m) => {
            const trimmedMaterial = m.trim();
            if (trimmedMaterial !== '') {
              const result = { size: trimmedSize, material: trimmedMaterial ,price:"" , available:"" };
              combined.push(result);
            }
          });
        }
      });
    } else if (sizeData.length === 0 && colorData.length > 0 && materialData.length > 0) {
      colorData.forEach((c) => {
        const trimmedColor = c.trim();
        if (trimmedColor !== '') {
          materialData.forEach((m) => {
            const trimmedMaterial = m.trim();
            if (trimmedMaterial !== '') {
              const result = { color: trimmedColor, material: trimmedMaterial ,price:"" , available:"" };
              combined.push(result);
            }
          });
        }
      });
    } else if (sizeData.length > 0 && colorData.length > 0 && materialData.length === 0) {
      sizeData.forEach((s) => {
        const trimmedSize = s.trim();
        if (trimmedSize !== '') {
          colorData.forEach((c) => {
            const trimmedColor = c.trim();
            if (trimmedColor !== '') {
              const result = { size: trimmedSize, color: trimmedColor , price:"" , available:"" };
              combined.push(result);
            }
          });
        }
      });
    } else if (sizeData.length > 0 && colorData.length === 0 && materialData.length === 0) {
      sizeData.forEach((s) => {
        const trimmedSize = s.trim();
        if (trimmedSize !== '') {
          const result = { size: trimmedSize ,price:"" , available:"" };
          combined.push(result);
        }
      });
    } else if (sizeData.length === 0 && colorData.length > 0 && materialData.length === 0) {
      colorData.forEach((c) => {
        const trimmedColor = c.trim();
        if (trimmedColor !== '') {
          const result = { color: trimmedColor ,price:"" , available:"" };
          combined.push(result);
        }
      });
    } else if (sizeData.length === 0 && colorData.length === 0 && materialData.length > 0) {
      materialData.forEach((m) => {
        const trimmedMaterial = m.trim();
        if (trimmedMaterial !== '') {
          const result = { material: trimmedMaterial ,price:"" , available:"" };
          combined.push(result);
        }
      });
    }
    setCombinedData(combined);
  }, [sizeData, colorData, materialData]); 

  useEffect(() => {
    console.log("combined", combinedData);
  }, [combinedData]);

  const contextValue = {
    sizeData,
    setSizeData,
    colorData,
    setColorData,
    materialData,
    setMaterialData,
    combinedData,
    setCombinedData
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
}

const useMyContext = () => {
    return useContext(MyContext);
  };

export {DataHandler , useMyContext};
