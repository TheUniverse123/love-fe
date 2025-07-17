import React from "react";

export default function EventPendingPopup({ open, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#2c2b2b", borderRadius: 30, padding: 40, maxWidth: 800, width: "90%", textAlign: "center", color: "#fff"
      }}>
        <h2 style={{ fontWeight: 700, fontSize: 36, marginBottom: 20 }}>Sự Kiện Đang Chờ Duyệt</h2>
        <div style={{ fontSize: 16, marginBottom: 20 }}>
          Đối tác vui lòng liên hệ LOVE qua hotline: <a href="tel:18002228888" style={{ color: "#5271ff" }}>0837220804</a> hoặc email:
          <a href="mailto:lovebookingws@gmail.com" style={{ color: "#5271ff" }}> lovebookingws@gmail.com</a>
          để được hỗ trợ mở bán sự kiện. Trân trọng cảm ơn!
        </div>
        <button
          className="mt-20"
          onClick={onClose}
          style={{
            background: "#5271ff", color: "#fff", border: "none", borderRadius: 30, padding: "16px 60px", fontSize: 20, fontWeight: 500, cursor: "pointer"
          }}
        >
          Đã hiểu
        </button>
      </div>
    </div>
  );
} 