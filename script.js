(function () {
  'use strict';

  /* 갤러리 라이트박스 */
  var box = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var current = 0;
  var opener = null;

  function show(i) {
    if (!box || !items.length) return;
    current = (i + items.length) % items.length;
    var it = items[current];
    var img = it.querySelector('img');
    var cap = it.querySelector('.gallery-caption');
    var big = box.querySelector('.lightbox-img');
    big.src = img.getAttribute('src');
    big.alt = img.getAttribute('alt') || '';
    box.querySelector('.lightbox-caption').textContent = cap ? cap.textContent : '';
    box.querySelector('.lightbox-count').textContent = (current + 1) + ' / ' + items.length;
  }

  function openAt(i, trigger) {
    opener = trigger;
    show(i);
    if (typeof box.showModal === 'function') box.showModal();
    else box.setAttribute('open', '');
  }

  if (box && items.length) {
    items.forEach(function (it, i) {
      it.addEventListener('click', function () { openAt(i, it); });
    });
    box.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
    box.querySelector('.lightbox-close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    box.addEventListener('close', function () { if (opener) opener.focus(); });
  }

  /* 모바일 메뉴 */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.classList.toggle('is-open', open);
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    });
  }

  /* 문의 폼: 시안이라 전송하지 않음 */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = ['f-name', 'f-tel', 'f-message'];
      for (var i = 0; i < fields.length; i++) {
        var el = document.getElementById(fields[i]);
        if (el && !el.value.trim()) {
          status.textContent = '이름, 연락처, 문의 내용을 모두 입력해 주세요.';
          el.focus();
          return;
        }
      }
      status.textContent = '시안이라 전송되지 않습니다. 전화로 문의해 주세요.';
    });
  }
})();
