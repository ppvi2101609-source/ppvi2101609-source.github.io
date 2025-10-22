// script.js — i18n VI/EN + Gmail + copy email + dark/light
(function () {
  /* ================== I18N (VI/EN) ================== */
  const I18N = {
    vi: {
      navAbout: "Về tôi",
      navProjects: "Dự án",
      navSkills: "Kỹ năng",
      navContact: "Liên hệ",
      kicker: "Portfolio cá nhân",
      heroHelloPrefix: "Xin chào, tôi là",
      heroLead:
        "Sinh viên trường Đại học Công Nghệ - Kỹ Thuật Cần Thơ. Quan tâm đến công nghệ, tự động hoá, IoT, năng lượng, và các dự án thực tiễn.",
      ctaProjects: "Xem dự án",
      ctaContact: "Liên hệ nhanh",
      ctaCV: "click để xem CV",
      labelSchool: "Trường:",
      labelPhone: "Điện thoại:",
      labelFacebook: "Facebook:",
      labelCV: "CV:",
      labelCVLink: "Bấm để xem CV",
      titleAbout: "Về tôi",
      aboutText:
        "Tôi hiện là sinh viên năm cuối của Đại học Công Nghệ – Kỹ Thuật Cần Thơ, đam mê công nghệ và kỹ thuật. Đây là trang tổng hợp quá trình học tập, kinh nghiệm dự án và định hướng phát triển của tôi.",
      titleProjects: "Dự án tiêu biểu",
      p1Title: "Mô hình điều khiển mức nước",
      p1Text:
        "Thiết kế và vận hành mô hình bồn nước: cảm biến mức, điều khiển PID/biến tần, hiển thị trạng thái.",
      p2Title: "Giám sát từ xa qua IoT",
      p2Text:
        "Xây dựng dashboard thu thập dữ liệu, cảnh báo và trực quan hoá theo thời gian.",
      p3Title: "Tối ưu hoá hệ PV bằng PVsyst",
      p3Text:
        "Nghiên cứu & mô phỏng để hỗ trợ ra quyết định đầu tư cho hộ gia đình.",
      titleSkills: "Kỹ năng",
      skTech: "Kỹ thuật",
      skTools: "Công cụ",
      skOther: "Khác",
      titleContact: "Liên hệ",
      contactHint: "Bạn có thể gọi hoặc gửi email cho mình:",
      btnEmailText: "Gửi email",
      emailLabel: "Địa chỉ email của Vĩ:",
      btnEmailSubject: "Liên hệ từ website",
      skTechItem1: "Lập trình cơ bản, điện - điện tử",
skTechItem2: "Thiết kế mô hình thử nghiệm, phân tích kết quả",
skToolsItem1: "Matlab/Simulink (cơ bản), PVsyst, AutoCAD, bộ công cụ văn phòng",
skToolsItem2: "GitHub Pages, Netlify",
skOtherItem1: "Làm việc nhóm, trình bày báo cáo",
skOtherItem2: "Quan tâm IoT, tự động hoá, năng lượng",
      langBtn: "VI",
    },
    en: {
      navAbout: "About",
      navProjects: "Projects",
      navSkills: "Skills",
      navContact: "Contact",
      kicker: "Personal portfolio",
      heroHelloPrefix: "Hi, I'm",
      heroLead:
       heroLead: "Student at Can Tho University of Technology and Engineering. Interested in technology, automation, IoT, energy, and hands-on projects.",
      ctaProjects: "View projects",
      ctaContact: "Contact",
      ctaCV: "View CV",
      labelSchool: "University:",
      labelPhone: "Phone:",
      labelFacebook: "Facebook:",
      labelCV: "CV:",
      labelCVLink: "View CV",
      titleAbout: "About",
      aboutText:
        "I'm a final-year student at Can Tho University of Technology and Engineering, passionate about technology and engineering. This page summarizes my study path, project experience, and development goals.",
      titleProjects: "Featured projects",
      p1Title: "Water level control model",
      p1Text:
        "Designed and operated a tank model: level sensors, PID/inverter control, status display.",
      p2Title: "Remote monitoring via IoT",
      p2Text:
        "Built a simple dashboard to collect data, alert, and visualize in real time.",
      p3Title: "PV system optimization with PVsyst",
      p3Text:
        "Researched & simulated to support household investment decisions.",
      titleSkills: "Skills",
      skTech: "Technical",
      skTools: "Tools",
      skOther: "Other",
      titleContact: "Contact",
      contactHint: "You can call or email me:",
      btnEmailText: "Email me",
      emailLabel: "My email:",
      btnEmailSubject: "Contact from website",
      skTechItem1: "Basic programming, electrical & electronics",
skTechItem2: "Prototype design, result analysis",
skToolsItem1: "Matlab/Simulink (basic), PVsyst, AutoCAD, office suite",
skToolsItem2: "GitHub Pages, Netlify",
skOtherItem1: "Teamwork, presentation",
skOtherItem2: "Interest in IoT, automation, energy",
      langBtn: "EN",
    },
  };

  const TEXT_IDS = [
    "navAbout","navProjects","navSkills","navContact",
    "kicker","heroHelloPrefix","heroLead",
    "ctaProjects","ctaContact","ctaCV",
    "labelSchool","labelPhone","labelFacebook","labelCV","labelCVLink",
    "titleAbout","aboutText","titleProjects",
    "p1Title","p1Text","p2Title","p2Text","p3Title","p3Text",
    "titleSkills","skTech","skTools","skOther",
    "titleContact","contactHint","btnEmailText","emailLabel",
    "skTechItem1","skTechItem2",
"skToolsItem1","skToolsItem2",
"skOtherItem1","skOtherItem2",
  ];

  function setText(id, text){
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
  }

  function applyLang(lang){
    const dict = I18N[lang] || I18N.vi;
    TEXT_IDS.forEach(id => dict[id] && setText(id, dict[id]));
    const langBtn = document.getElementById("langBtn");
    if (langBtn) langBtn.textContent = dict.langBtn || "VI";
    document.documentElement.lang = (lang === "en") ? "en" : "vi";
    try { localStorage.setItem("lang", lang); } catch(e) {}
  }

  let currentLang = (typeof localStorage !== "undefined" && localStorage.getItem("lang")) || "vi";
  applyLang(currentLang);

  /* ================== Theme ================== */
  const root = document.documentElement;
  const modeBtn = document.getElementById("modeBtn");
  function setMode(m){
    if (m === "light") root.classList.add("light");
    else root.classList.remove("light");
    try { localStorage.setItem("mode", m); } catch(e) {}
  }
  const savedMode = (typeof localStorage !== "undefined") ? localStorage.getItem("mode") : null;
  if (savedMode) setMode(savedMode);
  if (modeBtn){
    modeBtn.addEventListener("click", ()=>{
      const next = root.classList.contains("light") ? "dark" : "light";
      setMode(next);
    });
  }

  /* ================== Your info ================== */
  const YOUR_EMAIL = "phamphuvi9@gmail.com";                 // ← đổi nếu cần
  const YOUR_FACEBOOK = "https://www.facebook.com/PhamVi1209"; // ← đổi nếu cần

  ["fbLink","fbLink2"].forEach(id=>{
    const a = document.getElementById(id);
    if (a && YOUR_FACEBOOK) { a.href = YOUR_FACEBOOK; a.textContent = YOUR_FACEBOOK; }
  });
  const yourEmailSpan = document.getElementById("yourEmail");
  if (yourEmailSpan && YOUR_EMAIL) yourEmailSpan.textContent = YOUR_EMAIL;

  /* ================== Gmail compose ================== */
  function openGmail(to, subject, body){
    const url =
      `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject||"")}&body=${encodeURIComponent(body||"")}`;
    const go = () => window.open(url, "_blank", "noopener");
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(to).then(go).catch(go);
    } else {
      const t = document.createElement("input"); t.value = to; document.body.appendChild(t);
      t.select(); try { document.execCommand("copy"); } catch(e) {}
      document.body.removeChild(t); go();
    }
  }

  const emailBtn = document.getElementById("openGmailBtn");
  if (emailBtn){
    emailBtn.addEventListener("click", (e)=>{
      e.preventDefault();
      if (!YOUR_EMAIL.includes("@")){
        alert("Bạn chưa đặt email của mình trong script.js (YOUR_EMAIL).");
        return;
      }
      const subj = (currentLang === "en") ? I18N.en.btnEmailSubject : I18N.vi.btnEmailSubject;
      openGmail(YOUR_EMAIL, subj, "");
    });
  }

  /* ================== Lang button ================== */
  const langBtn = document.getElementById("langBtn");
  if (langBtn){
    langBtn.addEventListener("click", ()=>{
      currentLang = (currentLang === "vi") ? "en" : "vi";
      applyLang(currentLang);
    });
  }

  /* ================== Footer year ================== */
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
})();
