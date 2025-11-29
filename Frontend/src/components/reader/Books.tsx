import React, { useState, useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaQrcode,
  FaUser,
  FaLayerGroup,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useBooks } from "../context/BookContext";
import "./Books.css";
import StarRating from "./Staring/Staring";

const Books: React.FC = () => {
  const {
    books,
    loading,
    error,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    refreshBooks,
    changePage,
  } = useBooks();

  const navigate = useNavigate();

  // Bộ lọc
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  
  // Bộ lọc hiển thị
  const categories = Array.from(new Set(books.map((b) => b.category))).sort();
  const authors = Array.from(new Set(books.map((b) => b.author))).sort();

  const handleBorrow = (title: string) => {
    alert(
      `📘 Hướng dẫn mượn sách\n\n• Vui lòng đến quầy thủ tục để làm hồ sơ mượn sách.\n• Cung cấp tên sách hoặc mã sách cho thủ thư.\n• Mang theo thẻ thư viện/CMND để hoàn tất.\n\nSách: "${title}"`
    );
  };

  const handleReadEbook = (id: number) => {
    navigate(`/reader/books/${id}?tab=read`);
  };

  if (loading) return <p className="loading">⏳ Đang tải dữ liệu sách...</p>;
  if (error) return <p className="error">❌ Lỗi: {error}</p>;
  if (!books.length) return <p className="no-result">Không có sách nào.</p>;

  return (
    <div className="books-wrapper">
      <h3 className="books-title">📚 Danh sách sách</h3>

      {/* Thanh bộ lọc */}
      <div className="books-filter">
        <FaFilter style={{ marginRight: 8, color: "#2d3a4b" }} />
        <input
          className="books-search"
          type="text"
          placeholder="Tìm kiếm tên sách..."
          value={search}
          onChange={(e) => {
            changePage(0);
            setSearch(e.target.value);
          }}
        />
        <select
          value={filterCategory}
          onChange={(e) => {
            changePage(0);
            setFilterCategory(e.target.value);
          }}
        >
          <option value="">Thể loại (Tất cả)</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={filterAuthor}
          onChange={(e) => {
            changePage(0);
            setFilterAuthor(e.target.value);
          }}
        >
          <option value="">Tác giả (Tất cả)</option>
          {authors.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => {
            changePage(0);
            setFilterStatus(e.target.value);
          }}
        >
          <option value="">Trạng thái (Tất cả)</option>
          <option value="AVAILABLE">Còn sách</option>
          <option value="UNAVAILABLE">Hết sách</option>
        </select>

        {(filterCategory || filterAuthor || filterStatus || search) && (
          <button
            className="btn-clear-filter"
            onClick={() => {
              setFilterCategory("");
              setFilterAuthor("");
              setFilterStatus("");
              setSearch("");
              changePage(0);
            }}
          >
            Xóa lọc
          </button>
        )}
      </div>

      {/* Lưới sách */}
      <div className="books-grid">
        {books.map((book) => (
          <div
            className="book-card"
            key={book.id}
            style={
              book.coverPhotoUrl
                ? {
                    backgroundImage: `linear-gradient(rgba(26,32,44,0.55), rgba(26,32,44,0.2)), url('${book.coverPhotoUrl}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "#fff",
                  }
                : {}
            }
            onClick={() => navigate(`/reader/books/${book.id}`)}
            title="Xem chi tiết sách"
          >
            <div className="book-header">
              <h4
                className="book-title"
                style={
                  book.coverPhotoUrl
                    ? { color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.4)" }
                    : undefined
                }
              >
                {book.title}
              </h4>
              <span
                className={`book-status ${
                  book.status === "AVAILABLE" ? "available" : "unavailable"
                }`}
              >
                {book.status === "AVAILABLE" ? (
                  <>
                    <FaCheckCircle /> Còn sách
                  </>
                ) : (
                  <>
                    <FaTimesCircle /> Hết sách
                  </>
                )}
              </span>
            </div>

            <div className="book-meta">
              <span>
                <FaUser /> {book.author}
              </span>
              <span>
                <FaLayerGroup /> {book.category}
              </span>
              <span>
                <FaCalendarAlt /> {book.publishYear || "?"}
              </span>
              <span>
                <strong>Số lượng:</strong> {book.quantity}
              </span>
              <span>
                <strong>Đánh giá:</strong>{" "}
                <StarRating rating={book.averageRating} size="md" />
              </span>
              <span>
                <strong>Số người đánh giá:</strong> {book.ratingCount ?? 0}
              </span>
            </div>

            <div className="book-actions">
              <button
                className="btn-borrow"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBorrow(book.title);
                }}
              >
                <FaQrcode /> Mượn sách
              </button>
              <button
                className="btn-ebook"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReadEbook(book.id);
                }}
              >
                <FaBookOpen /> Đọc eBook
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div 
        className="pagination"
      >
        <button
          disabled={currentPage === 0}
          onClick={() => {changePage(currentPage - 1); console.log(currentPage)}}
        >
          <FaChevronLeft /> Trước
        </button>

        <span>
          Trang {currentPage + 1} / {totalPages || 1}
        </span>

        <button
          disabled={currentPage + 1 >= totalPages}
          onClick={() => {changePage(currentPage + 1); console.log(currentPage)}}
        >
          Sau <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Books;
