// script.js
document.addEventListener('DOMContentLoaded', () => {
  // ---------- LOADING ----------
  const loading = document.getElementById('loading-screen');
  setTimeout(() => {
    loading.style.opacity = '0';
    setTimeout(() => loading.classList.add('hidden'), 500);
  }, 1500);

  // ---------- TYPING WELCOME ----------
  const welcomeEl = document.querySelector('.welcome-msg');
  const phrases = ['ACCESS GRANTED, GOD.', 'WELCOME BACK, NIKIYA.', 'SYSTEM READY.'];
  let i = 0, j = 0, current = '', isDeleting = false;
  function typeEffect() {
    if (!welcomeEl) return;
    if (i < phrases.length) {
      if (!isDeleting && j <= phrases[i].length) {
        current = phrases[i].substring(0, j++);
        welcomeEl.textContent = current;
      } else if (isDeleting && j >= 0) {
        current = phrases[i].substring(0, j--);
        welcomeEl.textContent = current;
      }
      if (j === phrases[i].length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
      if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % phrases.length; }
    }
    setTimeout(typeEffect, isDeleting ? 60 : 120);
  }
  setTimeout(typeEffect, 1600);

  // ---------- LOGIN SIM (localStorage) ----------
  const loginModal = document.getElementById('login-modal');
  const app = document.getElementById('app');
  const loginBtn = document.getElementById('login-btn');
  const emailInp = document.getElementById('login-email');
  const passInp = document.getElementById('login-password');
  const errorDiv = document.getElementById('login-error');

  if (localStorage.getItem('god-logged') === 'true') {
    loginModal.classList.add('hidden');
    app.classList.remove('hidden');
  }

  loginBtn.addEventListener('click', () => {
    const email = emailInp.value.trim();
    const pass = passInp.value.trim();
    if (email === '' || pass === '') {
      errorDiv.textContent = '> invalid credentials';
      return;
    }
    // just simulate
    localStorage.setItem('god-logged', 'true');
    loginModal.classList.add('hidden');
    app.classList.remove('hidden');
    errorDiv.textContent = '';
  });

  // logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('god-logged');
    location.reload();
  });

  // ---------- PAGE NAVIGATION ----------
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = item.dataset.page;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      pages.forEach(p => p.classList.remove('active'));
      document.getElementById(pageId).classList.add('active');
    });
  });

  // ---------- PRIVATE CHAT (dynamic messages) ----------
  const privateInput = document.getElementById('private-msg-input');
  const privateSend = document.getElementById('private-send');
  const privateArea = document.getElementById('private-msg-area');

  function addPrivateMessage(text, isSent = true) {
    if (!text.trim()) return;
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', isSent ? 'sent' : 'received');
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2,'0')}`;
    msgDiv.innerHTML = `<span>${text} <span class="timestamp">${time}</span></span>`;
    privateArea.appendChild(msgDiv);
    privateArea.scrollTop = privateArea.scrollHeight;
  }

  privateSend.addEventListener('click', () => {
    addPrivateMessage(privateInput.value, true);
    privateInput.value = '';
    // simulate reply after 1s
    setTimeout(() => addPrivateMessage('(auto) system ack', false), 800);
  });
  privateInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') privateSend.click(); });

  // ---------- GROUP CHAT ----------
  const groupInput = document.getElementById('group-msg-input');
  const groupSend = document.getElementById('group-send');
  const groupArea = document.getElementById('group-msg-area');
  groupSend.addEventListener('click', () => {
    if (!groupInput.value.trim()) return;
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'group-msg');
    const now = new Date();
    msgDiv.innerHTML = `<span>you: ${groupInput.value} <span class="timestamp">${now.getHours()}:${now.getMinutes()}</span></span>`;
    groupArea.appendChild(msgDiv);
    groupInput.value = '';
    groupArea.scrollTop = groupArea.scrollHeight;
  });

  // ---------- PROFILE (upload + save) ----------
  const avatarUpload = document.getElementById('avatar-upload');
  const preview = document.getElementById('profile-preview');
  avatarUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (f) => preview.src = f.target.result;
      reader.readAsDataURL(file);
    }
  });
  document.getElementById('save-profile').addEventListener('click', () => {
    alert('> profile data saved locally (simulated)');
  });

  // ---------- SETTINGS: dark/light (fake) + password form ----------
  document.querySelector('#theme-toggle').addEventListener('change', (e) => {
    document.body.style.background = e.target.checked ? '#e0e5f0' : '#0b0e1a';
    document.body.style.color = e.target.checked ? 'black' : '#c0e0ff';
  });
  document.querySelector('.setting-row .small-btn').addEventListener('click', () => {
    document.getElementById('password-form').classList.toggle('hidden');
  });

  // ---------- SUPPORT CHAT (auto reply) ----------
  const supportBubble = document.getElementById('support-bubble');
  const supportWin = document.getElementById('support-window');
  supportBubble.addEventListener('click', () => supportWin.classList.toggle('hidden'));

  const supportInput = document.getElementById('support-input');
  const supportSend = document.getElementById('support-send');
  const supportMsgs = document.getElementById('support-msgs');

  function addSupportMsg(text, isUser = true) {
    const msg = document.createElement('div');
    msg.className = 'msg ' + (isUser ? 'user' : 'support');
    msg.style.padding = '4px 8px'; msg.style.background = isUser ? '#0a3a4a' : '#2a1e4a';
    msg.style.margin = '4px'; msg.style.borderRadius = '12px';
    msg.innerHTML = text;
    supportMsgs.appendChild(msg);
    supportMsgs.scrollTop = supportMsgs.scrollHeight;
  }

  supportSend.addEventListener('click', () => {
    const txt = supportInput.value.trim();
    if (!txt) return;
    addSupportMsg(`you: ${txt}`, true);
    supportInput.value = '';
    setTimeout(() => {
      addSupportMsg('support: operator Nikiya will reply (sim) 🟢', false);
    }, 600);
  });

  // ---------- active members / extra: placeholder ----------
});