// Global Api

const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: `https://strapi-doctor-date.koyeb.app/api/`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCategories = () => axiosClient.get(`categories?populate=*`);
const getDoctors = () => axiosClient.get(`doctors?populate=*`);

// Get All Doctors By Category Name
const getDoctorsByCategory = (category) => {
  if (!category) {
    throw new Error("Category is required to fetch doctors.");
  }

  return axiosClient.get(
    `doctors?filters[category][Name][$eq]=${encodeURIComponent(
      category
    )}&populate=*`
  );
};

// Fetch Doctor By DocumentId
const getDoctorsByDocumentId = (documentId) =>
  axiosClient.get(`doctors/${documentId}?populate=*`);

// Send Data To Apointment
const bookingAppointment = (data) => {
  return axiosClient.post(`appointments`, data);
};

// GetUserBookingList
const getUserBookingList = (userEmail) =>
  axiosClient.get(
    `appointments?filters[Email][$eq]=${encodeURIComponent(userEmail)}&populate=doctor.image`
  );

// DeleteBooking
const deleteBooking = (id) => axiosClient.delete(`/appointments/${id}`);

export default {
  getCategories,
  getDoctors,
  getDoctorsByCategory,
  getDoctorsByDocumentId,
  bookingAppointment,
  getUserBookingList,
  deleteBooking,
};
