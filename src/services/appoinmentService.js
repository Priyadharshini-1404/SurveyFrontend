// src/services/appointmentService.js
const BASE_URL = 'http://192.168.1.7:5000/api/appointments';

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
