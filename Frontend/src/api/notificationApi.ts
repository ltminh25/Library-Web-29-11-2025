// ============================================
// USER NOTIFICATION API SERVICE
// ============================================
import axiosClient from "./axiosClient";
import type { Notification } from "../types/api.types";

const notificationApi = {
  getMyNotifications: async (): Promise<Notification[]> => {
    const response = await axiosClient.get<Notification[]>("/notification");
    console.log("responseeeeee: ", response.data);
    return response.data;
  },

  markAsRead: async (id: number): Promise<void> => {
    await axiosClient.put(`/notification/${id}/read`);
  },
};

export default notificationApi;
