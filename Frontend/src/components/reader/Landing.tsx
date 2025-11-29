import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaHistory, FaBell, FaArrowRight, FaStar, FaCalendarCheck, FaFire } from 'react-icons/fa';
import { useBooks } from '../context/BookContext';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();
  const { books, refreshBooks, loading } = useBooks();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Always try to fetch books from backend for landing highlights
  useEffect(() => {
    refreshBooks();
  }, [refreshBooks]);

  const featured = useMemo(() => (books || []).slice(0, 6), [books]);

  const next = () => {
    setIndex((prev) => (featured.length ? (prev + 1) % featured.length : 0));
  };
  const prev = () => {
    setIndex((prev) => (featured.length ? (prev - 1 + featured.length) % featured.length : 0));
  };

  useEffect(() => {
    if (!featured.length) return;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % featured.length);
    }, 4000);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [featured.length]);

  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="hero-left">
          <p className="pill">Thư viện số PTIT</p>
          <h1>Khám phá sách hay, quản lý mượn trả dễ dàng.</h1>
          <p className="lead">
            Nhận nhắc hạn trả và gợi ý cá nhân hóa. Tất cả trong một nơi, dành cho bạn.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/reader/books')}>
              Bắt đầu đọc <FaArrowRight />
            </button>
            <button className="btn-ghost" onClick={() => navigate('/reader/dashboard')}>
              Xem bảng tin
            </button>
          </div>
          <div className="hero-metrics">
            <div>
              <span className="metric-value">10k+</span>
              <span className="metric-label">Tựa sách</span>
            </div>
            <div>
              <span className="metric-value">50k+</span>
              <span className="metric-label">Lượt mượn</span>
            </div>
            <div>
              <span className="metric-value">4.8/5</span>
              <span className="metric-label">Đánh giá hài lòng</span>
            </div>
          </div>
        </div>
        {/* <div className="hero-right" aria-hidden>
          <div className="hero-card">
            <div className="card-tag">Sách nổi bật</div>
            <div className="card-body">
              <div className="card-cover" />
              <div className="card-info">
                <p className="card-title">“Reading is a passport to countless adventures.”</p>
                <p className="card-sub">— Mary Pope Osborne</p>
              </div>
            </div>
            <div className="floating-badge">Streak +5 🔥</div>
          </div>
        </div> */}
      </section>

      <section className="landing-carousel">
        <div className="carousel-header">
          <div>
            <p className="pill soft">Sách nổi bật</p>
            <h2>Siêu phẩm nên đọc</h2>
          </div>
          <div className="carousel-actions">
            <button className="text-link" onClick={() => navigate('/reader/books')}>
              Xem tất cả <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="carousel-viewport">
          <button aria-label="Trước" className="control side left" onClick={prev}>‹</button>
          <button aria-label="Sau" className="control side right" onClick={next}>›</button>

          {(!featured.length) ? (
            <div className="carousel-empty">{loading ? 'Đang tải sách...' : 'Chưa có sách hiển thị'}</div>
          ) : (
            featured.map((b, i) => (
              <div
                key={b.id}
                className={`carousel-item ${i === index ? 'active' : ''}`}
                onClick={() => navigate(`/reader/books/${b.id}`)}
                role="button"
                tabIndex={0}
              >
                {b.coverPhotoUrl ? (
                  <img src={b.coverPhotoUrl} alt={b.title} />
                ) : (
                  <div className="cover-fallback">{b.title.charAt(0)}</div>
                )}
                <div className="meta">
                  <h3 title={b.title}>{b.title}</h3>
                  <p>{b.author} · {b.category}</p>
                  <div className="highlight-tags">
                    <span className="tag"><FaStar /> 4.{(i % 5) + 1}</span>
                    <span className="tag ghost"><FaCalendarCheck /> Có sẵn</span>
                  </div>
                  <button
                    className="btn-primary small"
                    onClick={(e) => { e.stopPropagation(); navigate(`/reader/books/${b.id}`); }}
                  >
                    Xem chi tiết <FaArrowRight />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="carousel-dots">
          {featured.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? 'active' : ''}`}
              aria-label={`Chuyển tới mục ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </section>

      <section className="quick-actions grid">
        <div className="qa-card" onClick={() => navigate('/reader/books')}>
          <div className="qa-icon primary"><FaBookOpen /></div>
          <div>
            <h3>Kho sách trực tuyến</h3>
            <p>Tìm kiếm nhanh, xem chi tiết & đọc preview.</p>
          </div>
        </div>
        <div className="qa-card" onClick={() => navigate('/reader/transactions')}>
          <div className="qa-icon accent"><FaHistory /></div>
          <div>
            <h3>Mượn trả tiện lợi</h3>
            <p>Theo dõi lịch sử, hạn trả và trạng thái từng lượt mượn.</p>
          </div>
        </div>
        <div className="qa-card" onClick={() => navigate('/reader/notifications')}>
          <div className="qa-icon warn"><FaBell /></div>
          <div>
            <h3>Thông báo thông minh</h3>
            <p>Nhắc hạn trả, thông tin sách mới và khuyến nghị riêng bạn.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
