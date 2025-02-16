import { createContext, useContext, useEffect, useState } from "react";

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const defaultCountry = "zm"; // Default country
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  useEffect(() => {
    const storedCountry = localStorage.getItem("selectedCountry");
    if (storedCountry) {
      setSelectedCountry(storedCountry);
    } else {
      localStorage.setItem("selectedCountry", defaultCountry);
    }
  }, []);

  const changeCountry = (country) => {
    localStorage.setItem("selectedCountry", country);
    setSelectedCountry(country);
    window.location.reload(); // Reload to apply changes
  };

  return (
    <CountryContext.Provider value={{ selectedCountry, changeCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);

// import { createContext, useContext, useState, useEffect } from "react";
// import API_CONFIG from "../../config";

// const CountryContext = createContext();

// export const CountryProvider = ({ children }) => {
//   const [selectedCountry, setSelectedCountry] = useState("zm"); // Default country
//
//   const getBaseUrls = () => API_CONFIG[selectedCountry] || API_CONFIG.zm;
//
//   return (
//     <CountryContext.Provider
//       value={{ selectedCountry, setSelectedCountry, getBaseUrls }}
//     >
//       {children}
//     </CountryContext.Provider>
//   );
// };

// or

// export const CountryProvider = ({ children }) => {
//   const [selectedCountry, setSelectedCountry] = useState("zm");
//
//   useEffect(() => {
//     const savedCountry = localStorage.getItem("selectedCountry");
//     if (savedCountry) {
//       setSelectedCountry(savedCountry);
//     }
//   }, []);
//
//   useEffect(() => {
//     localStorage.setItem("selectedCountry", selectedCountry);
//   }, [selectedCountry]);
//
//   return (
//     <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
//       {children}
//     </CountryContext.Provider>
//   );
// };
//
// export const useCountry = () => useContext(CountryContext);
//
// export const getBaseUrls = () => {
//   // ✅ Ensure code runs only in the browser
//   if (
//     typeof window !== "undefined" &&
//     localStorage.getItem("selectedCountry")
//   ) {
//     const country = localStorage.getItem("selectedCountry") || "zm";
//     return API_CONFIG[country] || API_CONFIG.zm;
//   }
//
//   // Default to Zambia if localStorage is unavailable (during SSR)
//   return API_CONFIG.zm;
// };
