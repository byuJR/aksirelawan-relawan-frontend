import api from "../../utils/axios";
import { supabase } from "../../config/supabase";

export const createCrudService = (baseUrl) => ({
  getAll: (params) => api.get(baseUrl, { params }),
  getById: (id) => api.get(`${baseUrl}/${id}`),
  create: (data) => api.post(baseUrl, data),
  update: (id, data) => api.put(`${baseUrl}/${id}`, data),
  delete: (id) => api.delete(`${baseUrl}/${id}`),
});

// Auth Service - menggunakan Supabase Auth
export const AuthService = {
  // Login dengan email/password
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Register dengan email verification
  register: async (email, password, full_name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name },
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
    });
    if (error) throw error;
    return data;
  },

  // Login dengan Google OAuth
  loginWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  },

  // Logout
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Resend verification email
  resendVerification: async (email) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    if (error) throw error;
  },

  // Reset password
  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  // Update password
  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },
};

// Activity Service - using Supabase direct access
export const ActivityService = {
  // Get all public activities
  getAll: async (params) => {
    const { data, error } = await supabase
      .from('activities')
      .select(`
        *,
        organizations (
          id,
          organization_name,
          contact_person,
          contact_email,
          photo_url
        )
      `)
      .neq('status', 'cancelled')
      .order('start_date', { ascending: false });

    if (error) throw error;

    // Transform data to match expected format
    const items = data.map(activity => ({
      ...activity,
      organization_name: activity.organizations?.organization_name || 'Organisasi',
      image_url: activity.thumbnail_url || null
    }));

    return { data: { data: { items } } };
  },

  // Get single activity by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('activities')
      .select(`
        *,
        organizations (
          id,
          organization_name,
          contact_person,
          contact_email,
          photo_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      data: {
        ...data,
        organization_name: data.organizations?.organization_name || 'Organisasi',
        image_url: data.thumbnail_url || null
      }
    };
  },

  // These endpoints require authentication and are for organization use
  create: (data) => api.post("/activities", data),
  update: (id, data) => api.put(`/activities/${id}`, data),
  delete: (id) => api.delete(`/activities/${id}`),
};
export const OrganizationService = createCrudService("/organizations");
export const SkillService = createCrudService("/skills");
export const CategoryService = createCrudService("/categories");
export const VolunteerService = createCrudService("/relawan");
export const VolunteerSkillService = createCrudService("/relawan_skills");
