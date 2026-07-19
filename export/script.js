(function () {
  'use strict';

  var RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbyOnQB_Y-Cy3UlI2xQpBSsiZUl5tOwOBJz4Yu6w20neCLIvpokrdwhGccIBcZiewVal/exec";

  var CONTENT = {
    en: {
      hero: { date: "12 December 2026", prompt: "curious what's behind the curtain?", cta: "RSVP", toggle_open: "step inside", toggle_close: "close curtain", playlist_btn: "our playlist", playlist_title: "songs for the day" },
      story: {
        eyebrow: "Our Story", title: "How it began",
        p1: "We started as two people who kept talking longer than we meant to. Patipan is seven years older, and at some point that started to matter—he began taking care of himself so he could be around longer. Kanokwan joined him, and together they built healthier routines. On November 3rd, at Labraris Hotel in Khao Yai, Patipan arrived carrying a bouquet. Kanokwan smiled the moment she saw it—she already knew what was coming.",
        p2: "They still go to the gym together most days, then look for good coffee after. Patipan says Kanokwan is like a Disney princess — kind to everyone, impossible not to love once you've seen her smile. Kanokwan says he's naturally funny, and being around him has made her calmer."
      },
      timeline: { eyebrow_label: "Arrival", title: "When to Arrive", family_only: "Private Family Ceremony", engagement: "Chinese Engagement Ceremony", tea: "Tea Ceremony", welcome: "Guest Welcome", welcome_sub: "Reception begins", note: "We'll welcome everyone from 11:30. Lunch, conversation and celebration will follow naturally from there." },
      dress: { eyebrow: "Dress Code", title: "Soft, Considered, Comfortable", desc: "Come dressed for a bright glasshouse lunch — soft colours, light fabrics, comfortable shoes. The room will glint enough; let your outfit stay soft.", ivory: "Ivory", sage: "Sage", champagne: "Champagne", green: "Deep Sage", note: "Kindly reserve white & ivory tones for the bride" },
      exp: { eyebrow: "not activities — the things we'll remember", title: "What We'll Take Home", table_title: "one long table, one long conversation", table_desc: "No round tables — one long conversation instead.", photo_booth_caption: "Say whatever you want. We'll watch it back later.", cake_caption: "Strawberries and icing, in place of a formal cake-cutting.", perfume_kicker: "blend your own", perfume_caption: "Three scents, mixed however you like. Reed diffusers available for guests who'd rather skip the perfume.", flowers_caption: "the flower someone presses into a book" },
      rsvp: {
        eyebrow: "RSVP", bridge: "", title: "We've Saved You a Seat", desc: "Let us know you're coming.",
        label_date: "Date", label_venue: "Venue",
        field_side: "Whose side are you joining?", side_groom: "Groom's side", side_bride: "Bride's side",
        field_first_name: "First name", field_last_name: "Last name",
        field_attending: "Will you join us?", yes: "Joyfully, yes", no: "Sadly, can't make it",
        field_guests: "Number of guests (incl. you)", session_default: "You're joining us for the reception lunch — 11:30",
        session_reveal: "Also invited to the morning ceremony? Let us know", session_lunch: "Reception lunch — 11:30", session_both: "Tea ceremony & reception (close family)",
        dietary_note: "This helps us prepare food and seating for everyone.", field_dietary: "Dietary note", field_dietary_ph: "Allergies, vegetarian, etc. (optional)",
        field_contact: "Contact number", field_contact_ph: "So we can reach you if needed",
        field_message: "Message", submit: "Confirm my seat", submitting: "Sending...", deadline_note: "kindly reply by 12 November 2026",
        confirmed_title: "You're at the table", view_map: "View on Maps", add_calendar: "Add to calendar", edit_response: "Edit response",
        error_required: "Please fill in the required fields.", error_generic: "Something went wrong. Please try again."
      },
      loc: { eyebrow: "Location", address: "Address to be confirmed", parking: "On-site parking available — please follow signage from the entrance.", cta_directions: "Get Directions" },
      faq: { eyebrow_label: "Notes", title: "Good to Know" },
      guestbook: { eyebrow: "Guestbook", title: "Leave Us a Message", desc: "A quick note, a memory, a wish for us — we'll read every one.", button: "Leave Us a Message" },
      footer: { message: "Thank you for celebrating with us.\nWe'll see you on December 12.\n\n#TaKaeTogether" }
    },
    th: {
      hero: { date: "12 ธันวาคม 2569", prompt: "อยากรู้ไหมว่าหลังม่านมีอะไร?", cta: "ตอบรับคำเชิญ", toggle_open: "ก้าวเข้ามา", toggle_close: "ปิดม่าน", playlist_btn: "เพลย์ลิสต์ของเรา", playlist_title: "เพลงประจำวันนี้" },
      story: {
        eyebrow: "เรื่องราวของเรา", title: "จุดเริ่มต้น",
        p1: "จากออเดอร์กาแฟธรรมดา เสียงหัวเราะที่แบ่งปัน และมิตรภาพที่ค่อยๆ เติบโต กลายเป็นช่วงเวลาที่ดีที่สุดของทุกวัน",
        p2: "วันนี้ท่ามกลางแสงอบอุ่นจากกระจกและคนที่เรารัก เราพร้อมเริ่มต้นบทใหม่ไปด้วยกัน"
      },
      timeline: { eyebrow_label: "การมาถึง", title: "เวลามาถึง", family_only: "พิธีส่วนตัวของครอบครัว", engagement: "พิธีสู่ขอแบบจีน", tea: "พิธีรดน้ำชา", welcome: "ต้อนรับแขก", welcome_sub: "เริ่มงานเลี้ยงต้อนรับ", note: "เราจะพร้อมต้อนรับทุกคนตั้งแต่ 11:30 น. เป็นต้นไป มื้อกลางวัน บทสนทนา และการเฉลิมฉลองจะค่อยๆ เกิดขึ้นเองตามธรรมชาติ" },
      dress: { eyebrow: "การแต่งกาย", title: "อ่อนหวาน เรียบง่าย สบายตัว", desc: "แต่งกายสบายๆ โทนสีอ่อน เหมาะกับมื้อกลางวันในเรือนกระจกที่สว่างไสว ห้องจะแวววาวมากพอแล้ว ให้ชุดของคุณดูนุ่มนวล", ivory: "งาช้าง", sage: "เขียวเซจ", champagne: "แชมเปญ", green: "เขียวเข้ม", note: "ขอสงวนโทนสีขาวและงาช้างไว้สำหรับเจ้าสาว" },
      exp: { eyebrow: "ไม่ใช่กิจกรรม — แต่เป็นสิ่งที่เราจะจดจำ", title: "สิ่งที่เราจะพกกลับไป", table_title: "โต๊ะยาวหนึ่งโต๊ะ บทสนทนาที่ไม่รู้จบ", table_desc: "ครอบครัวและเพื่อนฝูง เคียงบ่าเคียงไหล่ — คำอวยพรจากพ่อแม่ เรื่องเล่าเก่าๆ ที่ถูกเล่าซ้ำ จานอาหารที่ส่งต่อกันด้วยมือ นี่คือหัวใจของวันนี้", photo_booth_caption: "ไม่ใช่กล้อง — แต่คือเสียงหัวเราะที่คุณจะเก็บไว้", cake_caption: "ไม่ใช่เค้ก — แต่คือความสุขที่ทุกคนมารวมตัวกัน", perfume_kicker: "ผสมน้ำหอมของคุณเอง", perfume_caption: "ไม่ใช่ของชำร่วย แต่เป็นกลิ่นที่จะกลายเป็นความทรงจำ อีกหลายปีข้างหน้า แค่ได้กลิ่นก็เหมือนกลับมาที่โต๊ะของเรา", flowers_caption: "ดอกไม้ที่ใครสักคนจะกดแห้งเก็บไว้ในหนังสือ" },
      rsvp: {
        eyebrow: "ตอบรับคำเชิญ", bridge: "เราเก็บที่นั่งไว้ให้คุณที่โต๊ะยาวของเราแล้ว", title: "ร่วมโต๊ะกับเรา", desc: "การมาร่วมงานของคุณมีความหมายกับเรามาก แจ้งรายละเอียดสั้นๆ แล้วที่นั่งของคุณจะพร้อม",
        label_date: "วันที่", label_venue: "สถานที่",
        field_side: "คุณมาร่วมงานฝ่ายไหน?", side_groom: "ฝ่ายเจ้าบ่าว", side_bride: "ฝ่ายเจ้าสาว",
        field_first_name: "ชื่อจริง", field_last_name: "นามสกุล",
        field_attending: "จะมาร่วมงานกับเราไหม?", yes: "ยินดีอย่างยิ่งค่ะ/ครับ", no: "เสียดาย ไม่สามารถมาได้",
        field_guests: "จำนวนผู้เข้าร่วม (รวมคุณ)", session_default: "คุณจะเข้าร่วมงานเลี้ยงมื้อกลางวัน — 11:30 น.",
        session_reveal: "ได้รับเชิญร่วมพิธีช่วงเช้าด้วยหรือไม่? แจ้งเราได้เลย", session_lunch: "งานเลี้ยงมื้อกลางวัน — 11:30 น.", session_both: "พิธีรดน้ำชาและงานเลี้ยง (ญาติสนิท)",
        dietary_note: "ข้อมูลนี้ช่วยให้เราจัดเตรียมอาหารและที่นั่งให้ทุกคนได้พอดี", field_dietary: "ข้อมูลด้านอาหาร", field_dietary_ph: "แพ้อาหาร มังสวิรัติ ฯลฯ (ถ้ามี)",
        field_contact: "เบอร์ติดต่อ", field_contact_ph: "เผื่อเราต้องติดต่อกลับ",
        field_message: "ข้อความถึงเรา", submit: "ยืนยันที่นั่งของฉัน", submitting: "กำลังส่ง...", deadline_note: "กรุณาตอบรับภายใน 12 พฤศจิกายน 2569",
        confirmed_title: "คุณมีที่นั่งแล้ว", view_map: "ดูแผนที่", add_calendar: "เพิ่มลงปฏิทิน", edit_response: "แก้ไขคำตอบ",
        error_required: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน", error_generic: "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง"
      },
      loc: { eyebrow: "สถานที่", address: "ที่อยู่จะแจ้งให้ทราบเร็วๆ นี้", parking: "มีที่จอดรถภายในสถานที่ — กรุณาปฏิบัติตามป้ายบอกทางจากทางเข้า", cta_directions: "นำทาง" },
      faq: { eyebrow_label: "หมายเหตุ", title: "สิ่งที่ควรรู้" },
      guestbook: { eyebrow: "สมุดเยี่ยม", title: "ฝากข้อความถึงเรา", desc: "ข้อความสั้นๆ ความทรงจำ หรือคำอวยพร — เราจะอ่านทุกข้อความ", button: "ฝากข้อความถึงเรา" },
      footer: { message: "ขอบคุณที่มาร่วมฉลองกับเรา\nพบกัน 12 ธันวาคมนี้ค่ะ" }
    }
  };

  var FAQ_RAW = [
    { en_q: "What should I wear?", en_a: "Smart casual in soft, elegant tones. Sage green, champagne, blush, beige, and light neutrals will suit the setting beautifully. Please avoid all white.", th_q: "ควรแต่งตัวแบบไหน?", th_a: "แต่งกายสบายๆ โทนอ่อนหวานสำหรับมื้อกลางวัน ขอสงวนสีขาวและงาช้างไว้สำหรับเจ้าสาว และไม่ต้องเป็นทางการมาก" },
    { en_q: "Is the celebration indoors or outdoors?", en_a: "Inside SOL House’s bright glasshouse, surrounded by garden views. You’ll be comfortably indoors, with the feeling of an outdoor celebration.", th_q: "งานจัดในร่มหรือกลางแจ้ง?", th_a: "จัดในเรือนกระจกที่ SOL House ซึ่งมีวิวสวนโดยรอบ อยู่ในอาคารทั้งหมด อากาศแบบไหนก็ไม่มีปัญหา" },
    { en_q: "Can I bring a plus-one or my kids?", en_a: "Seating is arranged per invitation — please reach out to us directly if you have questions.", th_q: "พาคนติดหรือลูกไปด้วยได้ไหม?", th_a: "ที่นั่งจัดตามรายชื่อในบัตรเชิญ หากมีคำถามกรุณาติดต่อเราโดยตรง" },
    { en_q: "What time should I arrive?", en_a: "Please arrive by 11:30 for guest welcome — everything else unfolds naturally from there.", th_q: "ควรไปถึงเวลาไหน?", th_a: "กรุณามาถึงภายใน 11:30 น. เพื่อร่วมต้อนรับแขก จากนั้นทุกอย่างจะดำเนินไปตามธรรมชาติ" },
    { en_q: "Where do I park?", en_a: "On-site parking is available at SOL House Bangkok — follow the signage from the entrance.", th_q: "จอดรถที่ไหน?", th_a: "มีที่จอดรถภายใน SOL House Bangkok กรุณาปฏิบัติตามป้ายบอกทางจากทางเข้า" },
    { en_q: "Is there a colour to avoid?", en_a: "We kindly ask guests to avoid white and ivory, reserved for the bride.", th_q: "มีสีที่ควรเลี่ยงไหม?", th_a: "ขอความกรุณาแขกงดใส่สีขาวและงาช้าง เนื่องจากสงวนไว้สำหรับเจ้าสาว" }
  ];

  var PLAYLIST_RAW = [
    { moment_en: "Entrance", moment_th: "เดินเข้างาน", title: "Speechless" },
    { moment_en: "Cake", moment_th: "ตัดเค้ก", title: "Perfect Two" },
    { moment_en: "Bouquet", moment_th: "โยนช่อดอกไม้", title: "Sugar Sugar" }
  ];

  var state = {
    lang: 'en',
    curtainOpen: false,
    playlistOpen: false,
    faqOpen: {},
    rsvpConfirmed: false,
    morningRevealed: false,
    rsvpSubmitting: false,
    rsvpSide: 'groom', rsvpFirstName: '', rsvpLastName: '',
    rsvpAttending: 'yes', rsvpGuestCount: 1, rsvpSession: 'lunch', rsvpDietary: '', rsvpContact: '', rsvpMessage: ''
  };

  function get(obj, path) {
    return path.split('.').reduce(function (o, k) { return (o || {})[k]; }, obj);
  }

  function applyI18n() {
    var t = CONTENT[state.lang];
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = get(t, el.getAttribute('data-i18n'));
      if (val == null) return;
      el.textContent = val;
    });

    renderFaq();
    renderPlaylist();
    renderRsvpSummary();
    updateCurtainToggleLabel();
  }

  function renderFaq() {
    var lang = state.lang;
    var list = document.getElementById('faq-list');
    list.innerHTML = '';
    FAQ_RAW.forEach(function (item, i) {
      var q = lang === 'en' ? item.en_q : item.th_q;
      var a = lang === 'en' ? item.en_a : item.th_a;
      var open = !!state.faqOpen[i];
      var wrap = document.createElement('div');
      wrap.className = 'faq-item';
      wrap.innerHTML =
        '<h3><button class="faq-btn" id="faq-btn-' + i + '" aria-expanded="' + open + '" aria-controls="faq-panel-' + i + '">' +
          '<span>' + q + '</span><span class="icon" aria-hidden="true">+</span>' +
        '</button></h3>' +
        '<div class="faq-panel' + (open ? ' is-open' : '') + '" id="faq-panel-' + i + '" role="region" aria-labelledby="faq-btn-' + i + '">' + a + '</div>';
      wrap.querySelector('.faq-btn').addEventListener('click', function () {
        state.faqOpen[i] = !state.faqOpen[i];
        renderFaq();
      });
      list.appendChild(wrap);
    });
  }

  function renderPlaylist() {
    var lang = state.lang;
    var list = document.getElementById('playlist-list');
    list.innerHTML = '';
    PLAYLIST_RAW.forEach(function (song) {
      var row = document.createElement('a');
      row.href = '#';
      row.className = 'playlist-item';
      row.innerHTML = '<span class="moment">' + (lang === 'en' ? song.moment_en : song.moment_th) + '</span><span class="title">' + song.title + '</span>';
      list.appendChild(row);
    });
  }

  function updateCurtainToggleLabel() {
    var t = CONTENT[state.lang];
    var btn = document.getElementById('curtain-toggle');
    btn.textContent = state.curtainOpen ? t.hero.toggle_close : t.hero.toggle_open;
    btn.setAttribute('aria-expanded', state.curtainOpen);
  }

  function setCurtainOpen(open) {
    state.curtainOpen = open;
    document.getElementById('hero').classList.toggle('is-open', open);
    updateCurtainToggleLabel();
  }

  function renderRsvpSummary() {
    var lang = state.lang;
    var isAttending = state.rsvpAttending === 'yes';
    var fullName = (state.rsvpFirstName + ' ' + state.rsvpLastName).trim();
    var name = fullName || (lang === 'en' ? 'You' : 'คุณ');
    var text;
    if (lang === 'en') {
      text = name + ' — ' + (isAttending ? (state.rsvpGuestCount + ' guest(s), ' + (state.rsvpSession === 'both' ? 'tea ceremony & reception' : 'reception lunch')) : "won't be attending — you'll be missed");
    } else {
      text = name + ' — ' + (isAttending ? (state.rsvpGuestCount + ' ท่าน, ' + (state.rsvpSession === 'both' ? 'พิธีรดน้ำชาและงานเลี้ยง' : 'งานเลี้ยงมื้อกลางวัน')) : 'ไม่สามารถเข้าร่วมได้ — จะคิดถึงนะ');
    }
    document.getElementById('rsvp-summary').textContent = text;
  }

  function renderRsvpState() {
    document.getElementById('rsvp-confirm').style.display = state.rsvpConfirmed ? 'block' : 'none';
    document.getElementById('rsvp-form').style.display = state.rsvpConfirmed ? 'none' : 'block';

    var isGroomSide = state.rsvpSide === 'groom';
    var groomBtn = document.getElementById('rsvp-side-groom'), brideBtn = document.getElementById('rsvp-side-bride');
    groomBtn.classList.toggle('is-active', isGroomSide);
    groomBtn.setAttribute('aria-pressed', isGroomSide);
    brideBtn.classList.toggle('is-active', !isGroomSide);
    brideBtn.setAttribute('aria-pressed', !isGroomSide);

    var isAttending = state.rsvpAttending === 'yes';
    var yesBtn = document.getElementById('rsvp-yes'), noBtn = document.getElementById('rsvp-no');
    yesBtn.classList.toggle('is-active', isAttending);
    yesBtn.setAttribute('aria-pressed', isAttending);
    noBtn.classList.toggle('is-active', !isAttending);
    noBtn.setAttribute('aria-pressed', !isAttending);
    document.getElementById('rsvp-attending-fields').style.display = isAttending ? 'block' : 'none';

    document.getElementById('rsvp-guest-count').textContent = state.rsvpGuestCount;

    document.getElementById('rsvp-session-options').classList.toggle('is-open', state.morningRevealed);
    document.getElementById('rsvp-session-reveal').style.display = state.morningRevealed ? 'none' : 'inline-block';
    document.getElementById('rsvp-session-lunch').classList.toggle('is-active', state.rsvpSession === 'lunch');
    document.getElementById('rsvp-session-both').classList.toggle('is-active', state.rsvpSession === 'both');

    renderRsvpSummary();
  }

  function setRsvpSubmitting(isSubmitting) {
    state.rsvpSubmitting = isSubmitting;
    var btn = document.getElementById('rsvp-submit');
    var form = document.getElementById('rsvp-form');
    var t = CONTENT[state.lang];
    btn.disabled = isSubmitting;
    btn.textContent = isSubmitting ? t.rsvp.submitting : t.rsvp.submit;
    form.setAttribute('aria-busy', isSubmitting ? 'true' : 'false');
  }

  function showRsvpError(message) {
    var el = document.getElementById('rsvp-error');
    el.textContent = message;
    el.style.display = 'block';
    el.focus();
  }

  function hideRsvpError() {
    var el = document.getElementById('rsvp-error');
    el.style.display = 'none';
    el.textContent = '';
  }

  function resetRsvpFormFields() {
    state.rsvpSide = 'groom';
    state.rsvpFirstName = '';
    state.rsvpLastName = '';
    state.rsvpAttending = 'yes';
    state.rsvpGuestCount = 1;
    state.rsvpSession = 'lunch';
    state.rsvpDietary = '';
    state.rsvpContact = '';
    state.rsvpMessage = '';
    state.morningRevealed = false;
    document.getElementById('rsvp-first-name').value = '';
    document.getElementById('rsvp-last-name').value = '';
    document.getElementById('rsvp-dietary').value = '';
    document.getElementById('rsvp-contact').value = '';
    document.getElementById('rsvp-message').value = '';
  }

  function submitRsvp() {
    if (state.rsvpSubmitting) return;
    hideRsvpError();

    var firstName = document.getElementById('rsvp-first-name').value.trim();
    var lastName = document.getElementById('rsvp-last-name').value.trim();
    var message = document.getElementById('rsvp-message').value.trim();
    var side = state.rsvpSide;
    var attending = state.rsvpAttending;
    var guestCount = attending === 'yes' ? state.rsvpGuestCount : 0;

    if (!side || !firstName || !lastName || !attending || (attending === 'yes' && guestCount < 1)) {
      showRsvpError(CONTENT[state.lang].rsvp.error_required);
      return;
    }

    var payload = {
      side: side,
      firstName: firstName,
      lastName: lastName,
      guestCount: String(guestCount),
      attending: attending,
      message: message,
      language: state.lang,
      submittedAt: new Date().toISOString()
    };

    setRsvpSubmitting(true);

    fetch(RSVP_ENDPOINT, {
      method: 'POST',
      body: new URLSearchParams(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('RSVP request failed with status ' + res.status);
        return res.json().catch(function () {
          throw new Error('RSVP response was not valid JSON');
        });
      })
      .then(function (data) {
        if (!data || data.success !== true) {
          throw new Error('RSVP server reported failure: ' + (data && data.message));
        }
        state.rsvpFirstName = firstName;
        state.rsvpLastName = lastName;
        state.rsvpGuestCount = guestCount;
        state.rsvpMessage = message;
        state.rsvpConfirmed = true;
        setRsvpSubmitting(false);
        renderRsvpState();
        resetRsvpFormFields();
        document.getElementById('rsvp-confirm').focus();
      })
      .catch(function (err) {
        console.error('RSVP submission failed:', err);
        setRsvpSubmitting(false);
        showRsvpError(CONTENT[state.lang].rsvp.error_generic);
      });
  }

  function downloadIcs() {
    var ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      'DTSTART:20261212T113000', 'DTEND:20261212T143000',
      "SUMMARY:Kanokwan & Patipan's Wedding", 'LOCATION:SOL House Bangkok',
      'DESCRIPTION:Reception lunch at one long table.', 'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    var blob = new Blob([ics], { type: 'text/calendar' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'kanokwan-patipan-wedding.ics';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function initRevealObserver() {
    if (typeof IntersectionObserver === 'undefined') return;
    var els = document.querySelectorAll('[data-reveal]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  document.querySelectorAll('.section, #story, #timeline, #dresscode, #experiences, #rsvp, #location, #faq, #guestbook').forEach(function (el) {
    el.setAttribute('data-reveal', '');
  });

  var langEnBtn = document.getElementById('lang-en');
  var langThBtn = document.getElementById('lang-th');
  if (langEnBtn) langEnBtn.addEventListener('click', function () { state.lang = 'en'; applyI18n(); });
  if (langThBtn) langThBtn.addEventListener('click', function () { state.lang = 'th'; applyI18n(); });

  document.getElementById('curtain-toggle').addEventListener('click', function () { setCurtainOpen(!state.curtainOpen); });

  var playlistToggleBtn = document.getElementById('playlist-toggle');
  if (playlistToggleBtn) {
    playlistToggleBtn.addEventListener('click', function () {
      state.playlistOpen = !state.playlistOpen;
      var panel = document.getElementById('playlist-panel');
      panel.classList.toggle('is-open', state.playlistOpen);
      this.setAttribute('aria-expanded', state.playlistOpen);
    });
  }

  document.getElementById('hero').addEventListener('mousemove', function (e) {
    var r = this.getBoundingClientRect();
    var mx = (e.clientX - r.left) / r.width - 0.5;
    var my = (e.clientY - r.top) / r.height - 0.5;
    this.style.setProperty('--mx', (mx * 10).toFixed(1) + 'px');
    this.style.setProperty('--my', (my * 10).toFixed(1) + 'px');
  });

  document.getElementById('rsvp-first-name').addEventListener('input', function (e) { state.rsvpFirstName = e.target.value; renderRsvpSummary(); });
  document.getElementById('rsvp-last-name').addEventListener('input', function (e) { state.rsvpLastName = e.target.value; renderRsvpSummary(); });
  document.getElementById('rsvp-dietary').addEventListener('input', function (e) { state.rsvpDietary = e.target.value; });
  document.getElementById('rsvp-contact').addEventListener('input', function (e) { state.rsvpContact = e.target.value; });
  document.getElementById('rsvp-message').addEventListener('input', function (e) { state.rsvpMessage = e.target.value; });

  document.getElementById('rsvp-side-groom').addEventListener('click', function () { state.rsvpSide = 'groom'; renderRsvpState(); });
  document.getElementById('rsvp-side-bride').addEventListener('click', function () { state.rsvpSide = 'bride'; renderRsvpState(); });
  document.getElementById('rsvp-yes').addEventListener('click', function () { state.rsvpAttending = 'yes'; renderRsvpState(); });
  document.getElementById('rsvp-no').addEventListener('click', function () { state.rsvpAttending = 'no'; renderRsvpState(); });
  document.getElementById('rsvp-inc').addEventListener('click', function () { state.rsvpGuestCount = Math.min(8, state.rsvpGuestCount + 1); renderRsvpState(); });
  document.getElementById('rsvp-dec').addEventListener('click', function () { state.rsvpGuestCount = Math.max(1, state.rsvpGuestCount - 1); renderRsvpState(); });
  document.getElementById('rsvp-session-lunch').addEventListener('click', function () { state.rsvpSession = 'lunch'; renderRsvpState(); });
  document.getElementById('rsvp-session-both').addEventListener('click', function () { state.rsvpSession = 'both'; renderRsvpState(); });
  document.getElementById('rsvp-session-reveal').addEventListener('click', function () { state.morningRevealed = true; renderRsvpState(); });
  document.getElementById('rsvp-submit').addEventListener('click', submitRsvp);
  document.getElementById('rsvp-edit').addEventListener('click', function () { state.rsvpConfirmed = false; renderRsvpState(); });
  document.getElementById('rsvp-ics').addEventListener('click', downloadIcs);

  applyI18n();
  renderRsvpState();
  initRevealObserver();
  setTimeout(function () { setCurtainOpen(true); }, 1600);
})();
