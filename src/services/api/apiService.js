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
          photo_url
        )
      `)
      .neq('status', 'cancelled')
      .order('start_date', { ascending: false });

    if (error) throw error;

    // Transform data to match expected format
    const items = data.map(activity => {
      let imageUrl = null;
      
      // If thumbnail_url exists, check if it's already a full URL or just a path
      if (activity.thumbnail_url) {
        // If it starts with http, it's already a full URL
        if (activity.thumbnail_url.startsWith('http')) {
          imageUrl = activity.thumbnail_url;
        } else {
          // It's a path, get public URL from storage
          const { data: urlData } = supabase.storage
            .from('activity-images')
            .getPublicUrl(activity.thumbnail_url);
          imageUrl = urlData?.publicUrl;
        }
      }

      return {
        ...activity,
        organization_name: activity.organizations?.organization_name || 'Organisasi',
        image_url: imageUrl
      };
    });

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
          photo_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    let imageUrl = null;
    
    // If thumbnail_url exists, check if it's already a full URL or just a path
    if (data.thumbnail_url) {
      // If it starts with http, it's already a full URL
      if (data.thumbnail_url.startsWith('http')) {
        imageUrl = data.thumbnail_url;
      } else {
        // It's a path, get public URL from storage
        const { data: urlData } = supabase.storage
          .from('activity-images')
          .getPublicUrl(data.thumbnail_url);
        imageUrl = urlData?.publicUrl;
      }
    }

    return {
      data: {
        ...data,
        organization_name: data.organizations?.organization_name || 'Organisasi',
        image_url: imageUrl
      }
    };
  },

  // These endpoints require authentication and are for organization use
  create: (data) => api.post("/activities", data),
  update: (id, data) => api.put(`/activities/${id}`, data),
  delete: (id) => api.delete(`/activities/${id}`),
};

// Organization Service - using Supabase direct access
export const OrganizationService = {
  // Get all public organizations
  getAll: async (params) => {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform data to match expected format
    const items = data.map(org => {
      let logoUrl = null;
      
      // If photo_url exists, check if it's already a full URL or just a path
      if (org.photo_url) {
        // If it starts with http, it's already a full URL
        if (org.photo_url.startsWith('http')) {
          logoUrl = org.photo_url;
        } else {
          // It's a path, get public URL from storage
          const { data: urlData } = supabase.storage
            .from('organization-photos')
            .getPublicUrl(org.photo_url);
          logoUrl = urlData?.publicUrl;
        }
      }

      return {
        id: org.id,
        name: org.organization_name,
        description: org.description || '',
        category: org.field_of_work || 'Umum',
        email: org.official_email || 'Tidak diketahui',
        phone: org.official_phone || 'Tidak diketahui',
        address: org.office_address || 'Tidak diketahui',
        image_url: logoUrl
      };
    });

    return { data: { data: { items } } };
  },

  // Get single organization by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    let logoUrl = null;
    
    // If photo_url exists, check if it's already a full URL or just a path
    if (data.photo_url) {
      if (data.photo_url.startsWith('http')) {
        logoUrl = data.photo_url;
      } else {
        const { data: urlData } = supabase.storage
          .from('organization-photos')
          .getPublicUrl(data.photo_url);
        logoUrl = urlData?.publicUrl;
      }
    }

    return {
      data: {
        id: data.id,
        name: data.organization_name,
        description: data.description || '',
        category: data.field_of_work || 'Umum',
        email: data.official_email || 'Tidak diketahui',
        phone: data.official_phone || 'Tidak diketahui',
        address: data.office_address || 'Tidak diketahui',
        image_url: logoUrl
      }
    };
  },

  // These endpoints require authentication
  create: (data) => api.post("/organizations", data),
  update: (id, data) => api.put(`/organizations/${id}`, data),
  delete: (id) => api.delete(`/organizations/${id}`),
};

export const SkillService = createCrudService("/skills");
export const CategoryService = createCrudService("/categories");
export const VolunteerService = createCrudService("/relawan");
export const VolunteerSkillService = createCrudService("/relawan_skills");
