import axiosClient from "./axiosClient";
import type { CreateRatingRequest, RatingResponse} from "../types/api.types";

const ratingApi = {
  /**
   * POST /ratings
   * Tạo đánh giá cho sách
   */
  createRating: async (data: CreateRatingRequest): Promise<RatingResponse> => {
    const response = await axiosClient.post<RatingResponse>("/ratingCreateOrUpdate", data);
    return response.data;
  },

  /**
   * (Tùy chọn) GET /books/{bookId}/ratings
   * Lấy tất cả đánh giá của 1 sách
   */
  getAllRatings: async (): Promise<RatingResponse[]> => {
    const response = await axiosClient.get<RatingResponse[]>(`/ratingList`);
    return response.data;
  },
  getRatingsByBookId: async (bookId: number): Promise<RatingResponse[]> => {
    const response = await axiosClient.get<RatingResponse[]>(`/ratingList/${bookId}`);
    return response.data;
  },
};

export default ratingApi;