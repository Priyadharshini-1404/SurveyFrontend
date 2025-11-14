// src/hooks/useStaff.js
import React, { createContext, useContext, useState } from "react";

const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [staffList, setStaffList] = useState([
    // initial dummy data
    {
      id: "S001",
      name: "John Doe",
      experience: "5 years",
      rating: 4,
      contact: "+91 9876543210",
      image: "", // can be empty or url
    },
    {
      id: "S002",
      name: "Jane Smith",
      experience: "3 years",
      rating: 5,
      contact: "+91 9123456780",
      image: "",
    },
  ]);

  // Add staff
  const addStaff = (staff) => {
    const newStaff = { ...staff, id: `S00${staffList.length + 1}` };
    setStaffList((prev) => [...prev, newStaff]);
  };

  // Update staff
  const updateStaff = (id, updatedStaff) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedStaff } : s))
    );
  };

  // Delete staff
  const deleteStaff = (id) => {
    setStaffList((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StaffContext.Provider
      value={{ staffList, addStaff, updateStaff, deleteStaff }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => useContext(StaffContext);
