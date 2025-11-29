// ============================================
// PUBLIC BOOKS API SERVICE
// ============================================
import axiosClient from "./axiosClient";
import type { Book, BookSearchQuery } from "../types/api.types";
import type { BookSearchResponse } from "../types/api.types";
const publicBooksApi = {
  /**
   * GET /public/books
   * Tìm kiếm sách (có query params)
   */
  searchBooks: async (query?: BookSearchQuery, page?: number, size?: number): Promise<BookSearchResponse> => {
    const response = await axiosClient.get<BookSearchResponse>("/public/books", {
      params: { ...query, page: page ?? 1, size: size ?? 10, },
    });
    return response.data;
  },

  /**
   * GET /public/allbooks
   * Lấy toàn bộ sách (không phân trang)
   */
  getAllBooks: async (): Promise<Book[]> => {
    const response = await axiosClient.get<Book[]>("/public/allbooks");
    return response.data;
  },

  /**
   * GET /public/books/{id}
   * Lấy thông tin chi tiết sách theo ID
   */
  getBookById: async (id: number): Promise<Book> => {
    const response = await axiosClient.get<Book>(`/public/books/${id}`);
    return response.data;
  },
};

export default publicBooksApi;
