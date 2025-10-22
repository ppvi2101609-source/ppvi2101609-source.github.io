// script.js
(function () {
  // ===== Footer year =====
  const yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Dark/Light mode =====
  const root = document.documentElement;
  const modeBtn = document.getElementById("modeBtn");
  function applyMode(m) {
    if (m === "light") root.classList.add("light");
    else root.classList.remove("light");
    try { localStorage.setItem("mode", m); } catch (e) {}
  }
  const saved = (typeof localStorage !== "undefined")
    ? localStorage.getItem("mode") : null;
  if (saved) applyMode(saved);
  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      const m = root.classList.contains("light") ? "dark" : "light";
      applyMode(m);
    });
  }

  // ===== THÔNG TIN CỦA BẠN (chỉnh ở đây) =====
  const YOUR_EMAIL = "phamphuvi9@gmail.com"; // ← đổi thành email của bạn
  const YOUR_FACEBOOK = "";                  // ← dán link FB nếu có
  // ===========================================

  // Cập nhật link Facebook nếu có
  const fbEls = [document.getElementById("fbLink"), document.getElementById("fbLink2")];
  if (YOUR_FACEBOOK) {
    fbEls.forEach(el => { if (el) { el.href = YOUR_FACEBOOK; el.textContent = YOUR_FACEBOOK; } });
  }

  // Hiển thị email ở phần Liên hệ (nếu có span)
  const yourEmailSpan = document.getElementById("yourEmail");
  if (yourEmailSpan && YOUR_EMAIL) yourEmailSpan.textContent = YOUR_EMAIL;

  // ===== Mở Gmail Compose (ưu tiên) =====
  function openGmail(to, subject, body) {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${
      encodeURIComponent(to)
    }&su=${encodeURIComponent(subject || "")}&body=${encodeURIComponent(body || "")}`;
    window.open(url, "_blank", "noopener");
  }

  // Nút “Gửi email” (bản liên hệ rút gọn)
const emailBtn = document.getElementById("openGmailBtn");
if (emailBtn) {
  emailBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!YOUR_EMAIL || !YOUR_EMAIL.includes("@")) {
      alert("Bạn chưa đặt email của mình trong script.js (biến YOUR_EMAIL).");
      return;
    }

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${
        encodeURIComponent(YOUR_EMAIL)
      }&su=${encodeURIComponent("Liên hệ từ website")}&body=${encodeURIComponent("")}`;

    // Hàm mở Gmail (tab mới). Nếu muốn mở ngay trong tab hiện tại, thay window.open(...) bằng: window.location.href = gmailUrl;
    const go = () => window.open(gmailUrl, "_blank", "noopener");

    // 1) Copy email -> 2) mở Gmail
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(YOUR_EMAIL).then(go).catch(go);
    } else {
      // Fallback cho trình duyệt cũ
      const t = document.createElement("input");
      t.value = YOUR_EMAIL;
      document.body.appendChild(t);
      t.select();
      try { document.execCommand("copy"); } catch(e) {}
      document.body.removeChild(t);
      go();
    }
  });
}
  // ===== Tương thích layout cũ: nếu vẫn còn form thì cũng mở Gmail =====
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!YOUR_EMAIL || !YOUR_EMAIL.includes("@")) {
        alert("Bạn chưa đặt email của mình trong script.js (biến YOUR_EMAIL).");
        return;
      }
      const name = (document.getElementById("name") || { value: "" }).value.trim();
      const email = (document.getElementById("email") || { value: "" }).value.trim();
      const message = (document.getElementById("message") || { value: "" }).value.trim();

      const subject = `Liên hệ từ website – ${name || "Khách"}`;
      const body = `Tên: ${name}\nEmail người gửi: ${email}\n\n${message}`;
      openGmail(YOUR_EMAIL, subject, body);
    });
  }

  // (Tuỳ chọn) Nút sao chép địa chỉ email – nếu vẫn còn trong HTML
  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!YOUR_EMAIL) { alert("Bạn chưa đặt email trong script.js."); return; }
      navigator.clipboard.writeText(YOUR_EMAIL)
        .then(() => alert("Đã sao chép email: " + YOUR_EMAIL))
        .catch(() => alert("Không sao chép được. Hãy copy thủ công: " + YOUR_EMAIL));
    });
  }
})();
