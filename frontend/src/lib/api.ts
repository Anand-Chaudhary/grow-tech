import axios from 'axios';

export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  client: string;
  metrics: string;
  accentBg: string;
}

export interface ServiceGridItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface ShowcaseCard {
  id: string;
  tag: string;
  title: string;
  metric?: string;
  variant: 'analytics' | 'store' | 'system' | 'mobile' | 'editorial' | 'cloud';
}

export interface IndicatorItem {
  label: string;
  description: string;
}

export interface HeroData {
  headline?: string;
  highlightWord?: string;
  subhead?: string;
  indicators?: {
    social?: IndicatorItem;
    scale?: IndicatorItem;
    launch?: IndicatorItem;
  };
  marqueeCards?: ShowcaseCard[];
}

export interface ManifestoData {
  heading?: string;
  highlight?: string;
  paragraphs?: string[];
}

export interface ContactData {
  badge?: string;
  heading?: string;
  highlight?: string;
  subhead?: string;
}

export interface LandingPageData {
  hero?: HeroData;
  projects?: ProjectItem[];
  services?: ServiceGridItem[];
  manifesto?: ManifestoData;
  contact?: ContactData;
  caseStudies?: any[];
  packages?: any[];
  testimonials?: any[];
  faqs?: any[];
  generatedAt?: string;
}

export interface LeadSubmissionPayload {
  name: string;
  email: string;
  message: string;
  goal?: string;
  websiteUrl?: string;
  packageTier?: 'LAUNCH' | 'GROWTH' | 'SCALE' | 'NOT_SURE';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  data: T;
}

export interface AdminUser {
  id: string;
  name?: string;
  email: string;
  role: string;
  token?: string;
  isActive?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
};

// Storage helper functions
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('growtech_auth_token');
};

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('growtech_auth_token', token);
};

export const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('growtech_auth_token');
  localStorage.removeItem('growtech_admin_user');
};

export const getStoredAdmin = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('growtech_admin_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setStoredAdmin = (user: AdminUser): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('growtech_admin_user', JSON.stringify(user));
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Attach Authorization header if token exists
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Fetch landing page structured data from the backend using Axios
 */
export async function getLandingData(): Promise<LandingPageData | null> {
  const baseUrl = getBaseUrl();
  console.log(`[GrowTech API] Calling GET ${baseUrl}/api/landing via Axios...`);
  try {
    const response = await apiClient.get<ApiResponse<LandingPageData>>('/api/landing');
    console.log('[GrowTech API] Landing data received successfully:', response.data);
    return response.data?.data ?? null;
  } catch (error: any) {
    console.warn(
      `[GrowTech API] Could not reach backend at ${baseUrl}/api/landing, using default landing data:`,
      error?.message
    );
    return null;
  }
}

/**
 * Submit inquiry lead form to backend using Axios
 */
export async function submitLead(
  payload: LeadSubmissionPayload
): Promise<{ success: boolean; message: string }> {
  const baseUrl = getBaseUrl();
  console.log(`[GrowTech API] Calling POST ${baseUrl}/api/leads via Axios...`, payload);
  try {
    const response = await apiClient.post<ApiResponse<any>>('/api/leads', {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      goal: payload.goal || payload.message,
      websiteUrl: payload.websiteUrl || undefined,
      packageTier: payload.packageTier || 'NOT_SURE',
    });

    console.log('[GrowTech API] Lead submitted successfully:', response.data);
    return {
      success: true,
      message: response.data?.message || 'Inquiry received successfully.',
    };
  } catch (error: any) {
    const serverMessage = error?.response?.data?.message;
    console.warn('[GrowTech API] Error submitting lead via Axios:', serverMessage || error?.message);
    return {
      success: false,
      message: serverMessage || error?.message || 'Network error occurred. Please try again.',
    };
  }
}

/**
 * Admin Authentication: Login
 */
export async function loginAdmin(
  payload: LoginPayload
): Promise<{ success: boolean; message: string; user?: AdminUser }> {
  try {
    const response = await apiClient.post<ApiResponse<AdminUser>>('/api/admin/auth/login', {
      email: payload.email,
      password: payload.password,
    });

    if (response.data?.success && response.data?.data) {
      const user = response.data.data;
      if (user.token) {
        setAuthToken(user.token);
      }
      setStoredAdmin(user);
      return {
        success: true,
        message: response.data.message || 'Logged in successfully',
        user,
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Login failed',
    };
  } catch (error: any) {
    const serverMessage = error?.response?.data?.message;
    return {
      success: false,
      message: serverMessage || error?.message || 'Authentication failed. Please verify credentials.',
    };
  }
}

/**
 * Admin Authentication: Logout
 */
export async function logoutAdmin(): Promise<{ success: boolean; message: string }> {
  try {
    await apiClient.post('/api/admin/auth/logout');
  } catch (err) {
    console.warn('[GrowTech API] Error logging out:', err);
  } finally {
    removeAuthToken();
  }
  return { success: true, message: 'Logged out successfully' };
}

/**
 * Admin Authentication: Get current admin profile
 */
export async function getAdminProfile(): Promise<AdminUser | null> {
  try {
    const response = await apiClient.get<ApiResponse<AdminUser>>('/api/admin/auth/me');
    if (response.data?.success && response.data?.data) {
      setStoredAdmin(response.data.data);
      return response.data.data;
    }
    return null;
  } catch {
    return null;
  }
}
