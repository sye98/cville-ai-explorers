'use strict';
// Community interactions are progressively enhanced. All essential links work without JavaScript.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const workspace = document.querySelector('.thread-workspace');
  const tabs = [...document.querySelectorAll('.thread-tab')];
  const panels = [...document.querySelectorAll('.thread-panel')];
  const lineGroup = document.querySelector('.diagram-lines');
  // A geometric connection diagram: three starting points merge at a common junction.
  // No external graphics runtime or network call is needed for the interaction.
  if (lineGroup) {
    for (let i = 0; i < 18; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const lane = Math.floor(i / 6);
      const y = 46 + lane * 65 + (i % 6) * 4;
      const bend = 26 + lane * 80 - (i % 6) * 9;
      path.setAttribute('d', `M 5 ${y} C 170 ${y}, 180 ${bend}, 305 ${114 + (i - 9) * 3} S 460 ${194 - lane * 70 + (i % 6) * 5}, 585 114`);
      path.setAttribute('class', 'diagram-line');
      path.dataset.lane = String(lane);
      lineGroup.append(path);
    }
  }
  function selectThread(tab) {
    const name = tab.dataset.thread;
    workspace.dataset.thread = name;
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.id !== `panel-${name}`; });
    document.querySelectorAll('.diagram-line').forEach(line => {
      const active = Number(line.dataset.lane) === tabs.indexOf(tab);
      line.style.opacity = active ? '.9' : '.17';
      if (!reducedMotion.matches && typeof line.animate === 'function') {
        line.animate([{strokeDashoffset:900},{strokeDashoffset:0}], {duration:1050, easing:'cubic-bezier(.22,1,.36,1)', fill:'none'});
      }
    });
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => selectThread(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target !== undefined) { event.preventDefault(); selectThread(tabs[target]); tabs[target].focus(); }
    });
  });
  if (tabs.length) selectThread(tabs[0]);
  const orientationQuery = window.matchMedia('(max-width:700px)');
  function updateOrientation() { document.querySelector('.thread-choices')?.setAttribute('aria-orientation', orientationQuery.matches ? 'horizontal' : 'vertical'); }
  orientationQuery.addEventListener('change',updateOrientation); updateOrientation();

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting) {entry.target.classList.add('in-view'); observer.unobserve(entry.target);} });
    }, {threshold:0.06,rootMargin:'0px 0px 35px 0px'});
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  }
  let scrollPending = false;
  const progress = document.querySelector('.scroll-progress');
  function updateProgress() {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${distance > 0 ? Math.min(100, window.scrollY / distance * 100) : 0}%`;
    scrollPending = false;
  }
  window.addEventListener('scroll', () => { if(!scrollPending) { scrollPending=true; requestAnimationFrame(updateProgress); } },{passive:true});
  window.addEventListener('resize',updateProgress); updateProgress();

  const dialog = document.querySelector('#share-dialog');
  const shareButton = document.querySelector('.share-trigger');
  const shareUrl = 'https://cville-ai-woven.sifanye-ghost.chatgpt.site';
  if(dialog && shareButton) {
    shareButton.addEventListener('click', () => { document.querySelector('.copy-status').textContent=''; dialog.showModal(); });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if(event.target === dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();} });
    dialog.querySelector('.copy-link').addEventListener('click', async () => {
      const status=dialog.querySelector('.copy-status');
      try {await navigator.clipboard.writeText(shareUrl);status.textContent='Copied. Pass the spark along.';} catch {status.textContent='Select the link above to copy it, or scan the QR code.';}
    });
  }
  // Archive gracefully after the event; no countdown or invented next meetup.
  const now=Date.now();
  const ends=Date.parse('2026-09-30T00:00:00Z');
  if(now>=ends) {
    const status=document.querySelector('#event-status');if(status)status.textContent='FROM THE ARCHIVE · MEETUP #17';
    const eventButton=document.querySelector('.event-action .button');if(eventButton)eventButton.firstChild.textContent='View the meetup ';
    const sectionLabel=document.querySelector('.evening-heading .section-label');if(sectionLabel)sectionLabel.textContent='02 / AT THE WORKBENCH';
    const heroLink=document.querySelector('.hero-copy .button');if(heroLink){heroLink.href='https://www.meetup.com/cville-tech/';heroLink.firstChild.textContent='Explore our meetups ';}
    const rsvp=document.querySelector('.evening-buttons .button');if(rsvp)rsvp.firstChild.textContent='View event details ';
  }
})();
