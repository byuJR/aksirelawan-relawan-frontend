import api from "../../utils/axios";

export const getDonations = () => api.get("/donations");
export const createDonation = (payload) => api.post("/donations", payload);
export const getDonationById = (id) => api.get(`/donations/${id}`);
