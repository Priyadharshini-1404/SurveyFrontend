// src/services/appointmentService.js
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const BASE_URL = `${API_URL}/appointments`;

export const bookAppointment = async (appointmentData) => {
  try {
    const res = await fetch(`${BASE_URL}/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to book appointment');
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};
