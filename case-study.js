// Case-study page: Creator/State menus drive the embedded prototype, thumbnail lightbox, nav highlight.
const base = 'app/'
const frame = document.getElementById('frame')
const creator = document.getElementById('creator'), state = document.getElementById('state')
const load = () => {
  const q = new URLSearchParams({ embed: '1' })
  if (creator.value !== 'regular') q.set('creator', creator.value)
  if (state.value !== 'normal') q.set('state', state.value)
  frame.src = base + '?' + q
}
creator.addEventListener('change', load); state.addEventListener('change', load)

const dlg = document.getElementById('lightbox')
let opener = null
document.querySelectorAll('.thumb button').forEach(b => b.addEventListener('click', () => {
  opener = b
  const img = b.querySelector('img')
  document.getElementById('lightbox-img').src = b.dataset.full
  document.getElementById('lightbox-img').alt = img.alt
  document.getElementById('lightbox-cap').textContent = b.nextElementSibling.textContent
  dlg.showModal()
}))
dlg.addEventListener('close', () => opener && opener.focus())
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close() })

const links = [...document.querySelectorAll('.nav a')]
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.setAttribute('aria-current', String(l.hash === '#' + e.target.id)))
}), { rootMargin: '-40% 0px -55% 0px' })
document.querySelectorAll('main section').forEach(s => obs.observe(s))
