// ============================================
// PUBLIC AUTH API SERVICE
// ============================================
import axios from "axios";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types/api.types";
import { getRoleFromToken, isTokenExpired, decodeToken } from "../utils/jwtUtils";

const authApi = {
  /**
   * POST /public/login
   * Đăng nhập
   * Backend returns plain text token, not JSON
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // Use axios directly because backend returns text/plain, not JSON
    const response = await axios.post<string>("/api/public/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: 'text',
      transformResponse: [(data) => data], // Don't parse as JSON
    });
    
    // Backend returns plain text token
    const token = response.data;
    
    console.log("📦 Raw token from backend:", token);
    console.log("📏 Token length:", token.length);
    
    // Decode token to get role
    const payload = decodeToken(token);
    
    // Create AuthResponse object from token
    return {
      token: token,
      role: payload?.role || 'READER',
      user: undefined
    };
  },

  /**
   * POST /public/register
   * Đăng ký tài khoản mới
   * Backend also returns plain text token
   */
  register: async (data: RegisterRequest): Promise<any> => {
    // Ensure payload shape matches backend expectations
    const registerPayload = {
      username: (data as any).username,
      phone: (data as any).phone,
      email: (data as any).email,
      password: (data as any).password,
      address: (data as any).address,
      fullName: (data as any).fullName || (data as any).name,
      role: (data as any).role || 'READER',
    };

    const response = await axios.post("/api/public/register", registerPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Backend returns created user JSON object
    return response.data;
  },

  /**
   * Logout - clear local session
   */
  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userPhone");
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const token = sessionStorage.getItem("token");
    if (!token) return false;
    
    // Check if token is expired
    return !isTokenExpired(token);
  },

  /**
   * Get current user role from token
   */
  getRole: (): string | null => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    
    // Get role from token (more secure than sessionStorage)
    return getRoleFromToken(token);
  },
};

export default authApi;
