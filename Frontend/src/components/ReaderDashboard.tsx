import React from "react";
import "./ReaderDashboard.css";

const ReaderDashboard: React.FC = () => {
  const borrowedBooks = [
    { id: 1, title: "Book 1", dueDate: "2023-10-15" },
    { id: 2, title: "Book 2", dueDate: "2023-10-20" },
  ];

  const recentNotifications = [
    "Your book 'Book 1' is due soon.",
    "New books have been added to the library.",
    "Your membership has been renewed.",
  ];

  return (
    <div className="reader-dashboard">
      {/* Tiêu đề chính */}
      <h1 className="dashboard-title">📚 Dashboard</h1>

      {/* Borrowed Books Section */}
      <section className="borrowed-books">
        <h2>📖 Sách đang mượn</h2>
        <ul>
          {borrowedBooks.map((book) => (
            <li key={book.id} className="book-item">
              <strong>{book.title}</strong>
              <span className="due-date">Due: {book.dueDate}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent Notifications Section */}
      <section className="notifications">
        <h2>🔔 Thông báo gần đây</h2>
        <ul>
          {recentNotifications.map((notification, index) => (
            <li key={index} className="notification-item">
              {notification}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ReaderDashboard;