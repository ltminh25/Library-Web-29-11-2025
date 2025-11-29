import React, { useEffect } from "react";
import { FaBell, FaCheckCircle, FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";
import { useNotifications } from "../context/NotificationContext";
import "./Notifications.css";

function formatDateNotification(arr?: number[] | null): string {
  console.log("formatDateNotification called with:", arr); 
  if (!arr || arr.length < 6) return "Chưa có thời gian";

  const [year, month, day, hour = 0, minute = 0, second = 0] = arr;

  // ĐÚNG: Trừ 1 cho tháng
  const date = new Date(year, month - 1, day, hour, minute, second);

  // Nếu ngày không hợp lệ (rất hiếm)
  if (isNaN(date.getTime())) return "Ngày không hợp lệ";

  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const Notifications: React.FC = () => {
  const {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
    fetchNotifications,
  } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  

  return (
    <div className="notifications-wrapper">
      <div className="notifications-header">
        <div className="notifications-title">
          <FaBell className="notifications-icon" />
          <h2>Thông báo</h2>
        </div>
        <button onClick={markAllAsRead} className="notifications-markall">
          <FaCheckCircle /> Đánh dấu tất cả đã đọc
        </button>
      </div>

      {loading && <div className="loading">Đang tải thông báo...</div>}
      {error && <div className="error">{error}</div>}

      <div className="notifications-list">
        {notifications.length === 0 && !loading && (
          <div className="no-result">Không có thông báo nào.</div>
        )}
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`notifications-item ${n.status === "READ" ? "read" : "unread"}`}
            onClick={() => n.status === "UNREAD" && markAsRead(n.id)}
            title={n.status === "UNREAD" ? "Đánh dấu đã đọc" : ""}
          >
            <div className="notifications-item-icon">
              {n.status === "UNREAD" ? <FaEnvelope /> : <FaEnvelopeOpen />}
            </div>
            <div className="notifications-item-content">
              <p className="notifications-title">{n.title}</p>
              <p className="notifications-body">{n.body}</p>
              <div className="notifications-meta">
                <span>👤 {n.senderName}</span>
                <span>⏰ {formatDateNotification(n.sentAt)}</span>
              </div>
            </div>
            {n.status === "UNREAD" && <span className="notifications-badge">Mới</span>}
          </div>
        ))}
      </div>
      <button className="notifications-refresh" onClick={refreshNotifications}>
        Làm mới
      </button>
    </div>
  );
};

export default Notifications;