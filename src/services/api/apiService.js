import api, { authAPI } from "../../utils/axios";

export const createCrudService = (baseUrl) => ({
  getAll: (params) => api.get(baseUrl, { params }),
  getById: (id) => api.get(`${baseUrl}/${id}`),
  create: (data) => api.post(baseUrl, data),
  update: (id, data) => api.put(`${baseUrl}/${id}`, data),
  delete: (id) => api.delete(`${baseUrl}/${id}`),
});

// Auth Service - pakai authAPI (Node.js backend)
export const AuthService = {
  login: (email, password) => authAPI.post("/auth/login", { email, password }),

  register: (email, password, name) =>
    authAPI.post("/auth/register", {
      email,
      password,
      full_name: name,
    }),

  logout: () => authAPI.post("/auth/logout"),
};

// Services lainnya - pakai api (Rust backend)
export const ActivityService = {
  getAll: (params) => api.get("/activities/public", { params }), // Public endpoint untuk relawan
  getById: (id) => api.get(`/activities/${id}`),
  create: (data) => api.post("/activities", data),
  update: (id, data) => api.put(`/activities/${id}`, data),
  delete: (id) => api.delete(`/activities/${id}`),
};
export const OrganizationService = createCrudService("/organizations");
export const SkillService = createCrudService("/skills");
export const CategoryService = createCrudService("/categories");
export const VolunteerService = createCrudService("/relawan");
export const VolunteerSkillService = createCrudService("/relawan_skills");
