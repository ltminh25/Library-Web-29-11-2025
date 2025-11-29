import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaQrcode,
  FaUser,
  FaLayerGroup,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter
} from "react-icons/fa";
import { useBooks } from "../context/BookContext";
import "./Books.css";

const Books: React.FC = () => {
  const { books, loading, error, refreshBooks } = useBooks();
  const navigate = useNavigate();

  // Fetch books when component mounts
  useEffect(() => {
    refreshBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lọc
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  // Lấy danh sách thể loại và tác giả duy nhất
  const categories = Array.from(new Set(books.map(b => b.category))).sort();
  const authors = Array.from(new Set(books.map(b => b.author))).sort();

  // Lọc sách theo bộ lọc và tìm kiếm nhanh
  const filteredBooks = books.filter(book =>
    (filterCategory === "" || book.category === filterCategory) &&
    (filterAuthor === "" || book.author === filterAuthor) &&
    (filterStatus === "" || (filterStatus === "AVAILABLE" ? book.status === "AVAILABLE" : book.status !== "AVAILABLE")) &&
    (search === "" || book.title.toLowerCase().includes(search.toLowerCase()))
  );

  // Loại bỏ trùng sách theo title (chỉ lấy quyển đầu tiên theo title)
  const uniqueBooks = filteredBooks.filter(
    (book, idx, arr) =>
      arr.findIndex(b => b.title === book.title) === idx
  );

  const handleBorrow = (title: string) => {
    alert(`� Hướng dẫn mượn sách\n\n• Vui lòng đến quầy thủ tục để làm hồ sơ mượn sách.\n• Cung cấp tên sách hoặc mã sách cho thủ thư.\n• Mang theo thẻ thư viện/CMND để hoàn tất.\n\n📘 Sách: "${title}"`);
  };

  const handleReadEbook = (id: number) => {
    navigate(`/reader/books/${id}?tab=read`);
  };

  if (loading)
    return <p className="loading">⏳ Đang tải dữ liệu sách...</p>;
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
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">Thể loại (Tất cả)</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterAuthor} onChange={e => setFilterAuthor(e.target.value)}>
          <option value="">Tác giả (Tất cả)</option>
          {authors.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Trạng thái (Tất cả)</option>
          <option value="AVAILABLE">Còn sách</option>
          <option value="UNAVAILABLE">Hết sách</option>
        </select>
        {(filterCategory || filterAuthor || filterStatus || search) && (
          <button className="btn-clear-filter" onClick={() => {
            setFilterCategory("");
            setFilterAuthor("");
            setFilterStatus("");
            setSearch("");
          }}>
            Xóa lọc
          </button>
        )}
      </div>
      <div className="books-grid">
        {uniqueBooks.length === 0 && (
          <p className="no-result">Không tìm thấy sách phù hợp.</p>
        )}
        {uniqueBooks.map((book) => (
          <div
            className="book-card"
            key={book.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/reader/books/${book.id}`)}
            title="Xem chi tiết sách"
            // Cover image background with subtle overlay for readability
            // If no cover, keep default white background
            {...(book.coverPhotoUrl
              ? {
                  style: {
                    cursor: "pointer",
                    backgroundImage: `linear-gradient(rgba(26,32,44,0.55), rgba(26,32,44,0.2)), url('${book.coverPhotoUrl}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: '#fff',
                  } as React.CSSProperties,
                }
              : {})}
          >
            <div className="book-header">
              <h4 className="book-title" style={book.coverPhotoUrl ? { color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.4)' } : undefined}>{book.title}</h4>
              <span className={`book-status ${book.status === "AVAILABLE" ? "available" : "unavailable"}`}>
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
              <span style={book.coverPhotoUrl ? { color: '#E2E8F0' } : undefined}><FaUser /> {book.author}</span>
              <span style={book.coverPhotoUrl ? { color: '#E2E8F0' } : undefined}><FaLayerGroup /> {book.category}</span>
              <span style={book.coverPhotoUrl ? { color: '#E2E8F0' } : undefined}><FaCalendarAlt /> {book.publishYear || "?"}</span>
              <span style={book.coverPhotoUrl ? { color: '#E2E8F0' } : undefined}><strong>Số lượng:</strong> {book.quantity}</span>
            </div>
            <div className="book-actions">
              <button className="btn-borrow" onClick={e => { e.stopPropagation(); handleBorrow(book.title); }}>
                <FaQrcode /> Mượn sách
              </button>
              <button className="btn-ebook" onClick={e => { e.stopPropagation(); handleReadEbook(book.id); }}>
                <FaBookOpen /> Đọc eBook
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;