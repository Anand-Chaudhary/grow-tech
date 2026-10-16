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

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
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
