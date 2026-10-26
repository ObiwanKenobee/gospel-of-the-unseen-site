(() => {
  const scriptures = [
    { text: '“For we walk by faith, not by sight.”', reference: '2 CORINTHIANS 5:7', version: 'KING JAMES VERSION' },
    { text: '“While we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal.”', reference: '2 CORINTHIANS 4:18', version: 'KING JAMES VERSION' },
    { text: '“And the light shineth in darkness; and the darkness comprehended it not.”', reference: 'JOHN 1:5', version: 'KING JAMES VERSION' },
    { text: '“But the LORD looketh on the heart.”', reference: '1 SAMUEL 16:7', version: 'KING JAMES VERSION' }
  ];
  const articles = {
    faith: {
      label: '2 CORINTHIANS 5:7 · KJV',
      title: 'When sight is not enough',
      verse: '“For we walk by faith, not by sight.”',
      paragraphs: [
        'Faith is not a claim that the road is easy, nor a refusal to look honestly at the world. The apostle’s words invite us to live in trust when what is visible does not tell the whole story.',
        'Read the surrounding passage in 2 Corinthians 4–5. Paul speaks openly about affliction, mortality, courage, and hope. Christian faith is not an escape from reality; it is a way of meeting reality in light of God’s promises.',
        'For contemplation: Where are you being invited to act with faithfulness before you can see the outcome? What would trust look like when joined to wisdom, patience, and love?'
      ]
    },
    hidden: {
      label: 'MATTHEW 6:6 · KJV',
      title: 'The life no one applauds',
      verse: '“But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret.”',
      paragraphs: [
        'In the Sermon on the Mount, Jesus warns against turning religious practice into performance. He directs attention toward the hidden life before the Father—not toward an audience to impress.',
        'This is not a rejection of public worship or shared witness. It is a call to integrity: let outward devotion grow from a sincere heart rather than a hunger for recognition.',
        'For contemplation: What good might you do today without needing credit? Make room for a small, honest act of prayer, generosity, or service known only to God and those it helps.'
      ]
    },
    light: {
      label: 'JOHN 1:1–5 · KJV',
      title: 'The light that darkness cannot overcome',
      verse: '“And the light shineth in darkness; and the darkness comprehended it not.”',
      paragraphs: [
        'John opens his Gospel not with a manger scene, but with the Word, life, and light. The passage points to the identity of Christ and to a hope that is not extinguished by darkness.',
        'Christian hope does not ask us to pretend that suffering, injustice, or grief are unreal. It asks us to face them truthfully while holding fast to the light revealed in Jesus Christ.',
        'For contemplation: Where could you bear truthful witness, offer practical care, or stand beside someone who feels surrounded by darkness?'
      ]
    },
    mercy: {
      label: 'MICAH 6:8 · KJV',
      title: 'Mercy made visible',
      verse: '“...to do justly, and to love mercy, and to walk humbly with thy God.”',
      paragraphs: [
        'Micah 6:8 gathers a life of faith into a demanding pattern: justice, mercy, and humility before God. These are not abstract ideals; they shape how we use power and how we treat our neighbours.',
        'Contemplation should not end at admiration. The biblical witness continually calls people toward faithful action: to repair what is unjust, to practice mercy, and to walk humbly rather than boastfully.',
        'For contemplation: Name one concrete act of justice or mercy that you can take today. Make it specific, proportionate, and attentive to the dignity of the person you seek to serve.'
      ]
    }
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  let verseIndex = 0;
  let toastTimeout;

  const toast = (message) => {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('show');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => node.classList.remove('show'), 2400);
  };
  const renderVerse = () => {
    const verse = scriptures[verseIndex];
    $('#verse-text').textContent = verse.text;
    $('#verse-reference').innerHTML = `${verse.reference} <span>·</span> ${verse.version}`;
    $('#verse-index').textContent = `${String(verseIndex + 1).padStart(2, '0')} / ${String(scriptures.length).padStart(2, '0')}`;
    $('#verse-status').textContent = '';
  };
  $('#prev-verse').addEventListener('click', () => {
    verseIndex = (verseIndex - 1 + scriptures.length) % scriptures.length;
    renderVerse();
  });
  $('#next-verse').addEventListener('click', () => {
    verseIndex = (verseIndex + 1) % scriptures.length;
    renderVerse();
  });
  $('#copy-verse').addEventListener('click', async () => {
    const verse = scriptures[verseIndex];
    const text = `${verse.text} — ${verse.reference} (${verse.version.replace('KING JAMES VERSION', 'KJV')})`;
    try {
      await navigator.clipboard.writeText(text);
      $('#verse-status').textContent = 'Scripture copied.';
      toast('Scripture copied to clipboard');
    } catch (error) {
      $('#verse-status').textContent = 'Clipboard access is unavailable in this browser. Select the verse to copy it.';
    }
  });

  const menu = $('.menu-toggle');
  const nav = $('#primary-nav');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    menu.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !open);
  });
  $$('#primary-nav a').forEach((link) => link.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  }));

  const dialog = $('#article-dialog');
  const openArticle = (key) => {
    const article = articles[key] || articles.faith;
    $('#dialog-scripture-label').textContent = article.label;
    $('#dialog-title').textContent = article.title;
    $('#dialog-verse').textContent = article.verse;
    const content = $('#dialog-content');
    content.replaceChildren(...article.paragraphs.map((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      return p;
    }));
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };
  $$('[data-article]').forEach((button) => button.addEventListener('click', () => openArticle(button.dataset.article)));
  $$('[data-topic]').forEach((link) => link.addEventListener('click', () => {
    const key = link.dataset.topic;
    if (key === 'mercy') {
      window.setTimeout(() => openArticle('mercy'), 80);
    } else {
      window.setTimeout(() => openArticle(key), 80);
    }
  }));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  $('.dialog-done').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  $('#letter-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $('#email-address');
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    $('#form-note').textContent = 'Thank you for your interest. This preview is not connected to a mailing list, so your address has not been stored.';
    input.value = '';
    toast('Thank you — mailing list integration is still pending');
  });
  $('#year').textContent = String(new Date().getFullYear());
})();
