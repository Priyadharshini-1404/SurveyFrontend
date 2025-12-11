import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [staffList, setStaffList] = useState([]);

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${API_URL}/staff`);
      setStaffList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const addStaff = async (staff) => {
    const res = await axios.post(`${API_URL}/staff`, staff);
    setStaffList((prev) => [...prev, res.data]);
  };

  const updateStaff = async (id, staff) => {
    const res = await axios.put(`${API_URL}/${id}`, staff);
    setStaffList((prev) => prev.map((s) => (s.id === id ? res.data : s)));
  };

  const deleteStaff = async (id) => {
    await axios.delete(`${API_URL}/staff/${id}`);
    setStaffList((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StaffContext.Provider value={{ staffList, addStaff, updateStaff, deleteStaff, fetchStaff }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => useContext(StaffContext);
