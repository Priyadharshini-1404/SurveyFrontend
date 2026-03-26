import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import baseApi from "../api/api";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [staffList, setStaffList] = useState([]);

  const fetchStaff = async () => {
    try {
      const res = await baseApi.get("/staff");
      setStaffList(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const addStaff = async (staff) => {
    const res = await baseApi.post("/staff", staff);
    setStaffList((prev) => [...prev, res.data]);
  };

  const updateStaff = async (id, staff) => {
    try {
      console.log(id, staff)
      const res = await baseApi.put(`/staff/${id}`, staff);
      setStaffList((prev) => prev.map((s) => (s.id === id ? res.data : s)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStaff = async (id) => {
    await baseApi.delete(`/staff/${id}`);
    setStaffList((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StaffContext.Provider value={{ staffList, addStaff, updateStaff, deleteStaff, fetchStaff }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => useContext(StaffContext);
