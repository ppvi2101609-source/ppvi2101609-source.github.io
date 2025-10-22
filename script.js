(function(){
  const yearEl = document.getElementById('y');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const root = document.documentElement;
  const modeBtn = document.getElementById('modeBtn');
  function applyMode(m){
    if(m==='light'){ root.classList.add('light'); } else { root.classList.remove('light'); }
    try{ localStorage.setItem('mode', m); }catch(e){}
  }
  const saved = (typeof localStorage!=='undefined') ? localStorage.getItem('mode') : null;
  if(saved){ applyMode(saved); }
  if(modeBtn){
    modeBtn.addEventListener('click',()=>{
      const m = root.classList.contains('light')? 'dark':'light';
      applyMode(m);
    });
  }

  // === ĐiỀN THÔNG TIN CỦA BẠN TẠI ĐÂY ===
  const YOUR_EMAIL = "<dien-email-cua-ban@vd.com>"; // ← ĐỔI THÀNH EMAIL CỦA BẠN (nếu dùng mailto)
  const YOUR_FACEBOOK = ""; // ← Dán link Facebook vào đây, ví dụ: https://facebook.com/ten.cua.ban
  // =======================================

  // cập nhật hiển thị link Facebook nếu đã điền
  const fb1 = document.getElementById('fbLink');
  const fb2 = document.getElementById('fbLink2');
  if (YOUR_FACEBOOK){
    if (fb1){ fb1.href = YOUR_FACEBOOK; fb1.textContent = YOUR_FACEBOOK; }
    if (fb2){ fb2.href = YOUR_FACEBOOK; fb2.textContent = YOUR_FACEBOOK; }
  }

  // form mailto
  const form = document.getElementById('contactForm');
  const copyBtn = document.getElementById('copyBtn');
  const yourEmailSpan = document.getElementById('yourEmail');
  if (yourEmailSpan && YOUR_EMAIL){
    yourEmailSpan.textContent = YOUR_EMAIL;
  }
  if (form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!YOUR_EMAIL || YOUR_EMAIL.indexOf('@')===-1){
        alert('Bạn chưa điền email của mình trong script.js (biến YOUR_EMAIL).');
        return;
      }
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const subject = encodeURIComponent('Liên hệ từ website: '+ name);
      const body = encodeURIComponent(`Tên: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
    });
  }
  if (copyBtn){
    copyBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      if(!YOUR_EMAIL){
        alert('Bạn chưa điền email trong script.js.');
        return;
      }
      navigator.clipboard.writeText(YOUR_EMAIL).then(()=>{
        alert('Đã sao chép email: ' + YOUR_EMAIL);
      }).catch(()=>{
        alert('Không sao chép được. Hãy copy thủ công: ' + YOUR_EMAIL);
      });
    });
  }
})();
