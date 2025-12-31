import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { publicBooksApi, staffBooksApi } from "../../api";
import { toDriveImageUrl, toDrivePdfPreviewUrl, toDriveThumbnailUrl } from "../../utils/driveLinks";
import type { BookSearchQuery ,BookSearchResponse } from "../../types/api.types";
// UI-facing book shape used across components
export interface Book {
  id: number;
  title: string;
  author: string;
  // description?: string;
  category: string;
  publisher: string;
  // rating?: number;
  publishYear?: number;
  status?: string;
  quantity: number;
  pdfUrl?: string | null;
  coverPhotoUrl?: string | null;
  // ⭐ Thêm
  averageRating?: number | null;   
  ratingCount?: number | null;     
}

export interface BookCreate {
  id: number;
  title: string;
  author_id: number;
  category_id: number;
  publish_id: number;
  publishYear: number;
  quantity: number;
  status: string;
  pdfUrl?: string | null;
  coverPhotoUrl?: string | null;
  // ⭐ Thêm
  averageRating?: number | null;
  ratingCount?: number | null;    
}


interface BookContextType {
  books: Book[];
  loading: boolean;
  error: string | null;

  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;

  fetchBookById: (id: number) => Promise<Book | null>;
  refreshBooks: () => Promise<void>;
  addBook: (book: Omit<BookCreate, "id">) => Promise<void>;
  updateBook: (id: number, data: Partial<BookCreate>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  changePage: (page: number) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<BookSearchQuery>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  //Goi api de lay tat ca sach
  const fetchBooks = useCallback(async (page = currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const res = await publicBooksApi.searchBooks(
        searchQuery,     // ← query object
        page,            // ← page (không cần -1 nữa, backend thường dùng 0-based hoặc 1-based)
        pageSize
      );
      
      const { items, currentPage: pageFromApi, totalPages, totalItems, pageSize: sizeFromApi } = res as BookSearchResponse;

      const mapped = items.map((b: any) => ({
        id: b.id,
        title: b.title,
        author: typeof b.author === 'string' ? b.author : (b.author?.name ?? ''),
        category: typeof b.category === 'string' ? b.category : (b.category?.name ?? ''),
        publisher: typeof b.publisher === 'string' ? b.publisher : (b.publisher?.name ?? ''),
        publishYear: b.publishedYear ?? b.publishYear,
        status: b.status ?? undefined,
        quantity: b.quantity ?? b.availableQuantity ?? 0,
        pdfUrl: toDrivePdfPreviewUrl(b.pdfUrl ?? null),
        coverPhotoUrl: toDriveThumbnailUrl(b.coverPhotoUrl ?? b.coverImage ?? null, 256) || toDriveImageUrl(b.coverPhotoUrl ?? b.coverImage ?? null),
        // ⭐ Thêm 2 dòng này:
        averageRating: b.averageRating ?? null,
        ratingCount: b.ratingCount ?? null,
      })) as Book[];
      setBooks(mapped);
      
      setCurrentPage(pageFromApi ?? page);
      setPageSize(sizeFromApi);
      setTotalItems(totalItems);
      setTotalPages(totalPages);
      
    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách sách");
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  const changePage = useCallback(async (page: number) => {
    console.log("📖 Changing page to:", page);
    await fetchBooks(page);
  }, [fetchBooks]);

  const fetchBookById = useCallback(async (id: number): Promise<Book | null> => {
    try {
      const b: any = await publicBooksApi.getBookById(id);
      const mapped: Book = {
        id: b.id,
        title: b.title,
        author: typeof b.author === 'string' ? b.author : (b.author?.name ?? ''),
        category: typeof b.category === 'string' ? b.category : (b.category?.name ?? ''),
        publisher: typeof b.publisher === 'string' ? b.publisher : (b.publisher?.name ?? ''),
        publishYear: b.publishedYear ?? b.publishYear,
        status: b.status ?? undefined,
        quantity: b.quantity ?? b.availableQuantity ?? 0,
        pdfUrl: toDrivePdfPreviewUrl(b.pdfUrl ?? null),
        coverPhotoUrl: toDriveThumbnailUrl(b.coverPhotoUrl ?? b.coverImage ?? null, 512) || toDriveImageUrl(b.coverPhotoUrl ?? b.coverImage ?? null),
        // ⭐ Thêm 2 dòng này:
        averageRating: b.averageRating ?? null,
        ratingCount: b.ratingCount ?? null,
      };
      return mapped;
    } catch (err) {
      console.error("❌ Không thể lấy sách theo ID:", err);
      return null;
    }
  }, []);


  // fetch thong tin all sach
  // ❌ REMOVED: Auto-fetch on mount causes slow initial load
  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ Instead: Components should call refreshBooks() when needed

  const addBook = useCallback(async (book: Omit<BookCreate, "id">) => {
    try {
      const res = await staffBooksApi.createBook(book as any);
      setBooks((prev) => [...prev, res as any]);
    } catch (err) {
      console.error("Add error:", err);
      alert("Không thể thêm sách (có thể bạn chưa có quyền)");
    }
  }, []);

  const updateBook = useCallback(async (id: number, data: Partial<BookCreate>) => {
    try {
      const res = await staffBooksApi.updateBook(id, data as any);
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...res as any } : b))
      );
    } catch (err) {
      console.error("Update error:", err);
      alert("Không thể cập nhật sách (có thể bạn chưa có quyền");
    }
  }, []);

  const deleteBook = useCallback(async (id: number) => {
    try {
      await staffBooksApi.deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id != id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Không thể xóa sách (có thể bạn chưa có quyền");
    }
  }, []);

  // Memoize context value to avoid unnecessary re-renders of consumers
  const value = useMemo(() => ({
    books,
    loading,
    error,
    currentPage, 
    pageSize, 
    totalItems, totalPages,
    refreshBooks: fetchBooks,
    fetchBookById,
    addBook,
    updateBook,
    deleteBook,
    changePage,
  }), [books, loading, error, currentPage, pageSize, totalItems, totalPages, fetchBooks, fetchBookById, addBook, updateBook, deleteBook, changePage]);

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

//hook dung trong component khac
export const useBooks = () => {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBooks must be used inside BookProvider");
  return ctx;
};
