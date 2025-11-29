// ============================================
// STAFF COMMENT MANAGEMENT API SERVICE
// ============================================
import axiosClient from "./axiosClient";

// Response shape returned by backend for staff comments (paginated)
export interface StaffCommentItem {
  id: number;
  userName: string;
  comment: string;
  owner: boolean;
}

export interface StaffCommentPage {
  items: StaffCommentItem[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const staffCommentApi = {
  /**
   * GET /staff/comment?page={page}&size={size}
   * Lấy bình luận dạng phân trang (dành cho nhân viên)
   */
  getComments: async (page = 0, size = 10): Promise<StaffCommentPage> => {
    try {
      console.log("🔍 Calling GET /staff/comment with params:", { page, size });
      const response = await axiosClient.get<StaffCommentPage>("/staff/comment", {
        params: { page, size },
      });
      console.log("✅ Staff comments API raw response:", response);
      console.log("✅ Response data:", response.data);
      console.log("✅ Response data type:", typeof response.data);
      console.log("✅ Response data keys:", response.data ? Object.keys(response.data) : 'null');
      console.log("✅ Response structure:", {
        hasItems: response.data?.items !== undefined,
        itemsType: typeof response.data?.items,
        itemsIsArray: Array.isArray(response.data?.items),
        itemsLength: response.data?.items?.length,
        items: response.data?.items,
      });
      
      // Validate the response structure
      if (!response.data) {
        console.error("❌ Response data is null or undefined");
        throw new Error("Invalid response: data is null");
      }
      
      if (!response.data.items || !Array.isArray(response.data.items)) {
        console.error("❌ Response data.items is not an array:", response.data);
        throw new Error("Invalid response: items is not an array");
      }
      
      return response.data;
    } catch (error) {
      console.error("❌ Staff comments API error:", error);
      console.error("❌ Error details:", {
        message: (error as any).message,
        response: (error as any).response,
        status: (error as any).response?.status,
        data: (error as any).response?.data,
      });
      throw error;
    }
  },

  /**
   * DELETE /staff/comment/{id}
   * Xóa bình luận (admin)
   */
  deleteComment: async (id: number): Promise<void> => {
    await axiosClient.delete(`/staff/comment/${id}`);
  },
};

export default staffCommentApi;
