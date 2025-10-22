// script.js
(function () {
  // Năm ở footer
  const yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Dark/Light mode
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

  // ==== THÔNG TIN CỦA BẠN (chỉnh ở đây) ====
  const YOUR_EMAIL = "phamphuvi9@gmail.com"; // <— email của Vĩ
  const YOUR_FACEBOOK = "";                  // dán link FB nếu có
  // ==========================================

  // Cập nhật link Facebook nếu có
  const fb1 = document.getElementById("fbLink");
  const fb2 = document.getElementById("fbLink2");
  if (YOUR_FACEBOOK) {
    if (fb1) { fb1.href = YOUR_FACEBOOK; fb1.textContent = YOUR_FACEBOOK; }
    if (fb2) { fb2.href = YOUR_FACEBOOK; fb2.textContent = YOUR_FACEBOOK; }
  }

  // Form mailto
  const form = document.getElementById("contactForm");
  const copyBtn = document.getElementById("copyBtn");
  const yourEmailSpan = document.getElementById("yourEmail");

  if (yourEmailSpan && YOUR_EMAIL) yourEmailSpan.textContent = YOUR_EMAIL;

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!YOUR_EMAIL || !YOUR_EMAIL.includes("@")) {
        alert("Bạn chưa đặt email của mình (biến YOUR_EMAIL trong script.js).");
        return;
      }
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent("Liên hệ từ website – " + name);
      const body = encodeURIComponent(
        `Tên: ${name}\nEmail người gửi: ${email}\n\n${message}`
      );

      // Mở app email của máy người dùng
      window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
    });
  }

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
