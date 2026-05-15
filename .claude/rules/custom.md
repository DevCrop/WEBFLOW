# Custom Libraries & Code — Intellectual Data
# Lottie is NOT used. SVG animations handled via GSAP or CSS only.

---

## Library Stack

| Library       | Version  | Scope    | Load location |
|---------------|----------|----------|---------------|
| AOS           | 2.3.4    | Global   | Footer embed  |
| GSAP          | 3.12.5   | Global   | Footer embed  |
| ScrollTrigger | 3.12.5   | Global   | Footer embed (with GSAP) |
| SplitText     | 3.12.5   | Global   | Footer embed (with GSAP) |
| THREE.js      | r134     | Per-page | Page Settings → Footer only |
| Font Awesome  | 6.5.1    | Global   | Head embed (CSS only) |

> Do NOT use Lottie or any JSON-based animation players.
> SVG animations: use GSAP `gsap.to(svgElement, {...})` or CSS `@keyframes`.

---

## Global Footer Embed — Load Order

Site Settings → Custom Code → Footer (before `</body>`)

```html
<!-- 1. AOS styles (Head embed instead — avoids FOUC) -->
<!-- Move this to Head embed: <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css"> -->

<!-- 2. AOS -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>

<!-- 3. GSAP core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>

<!-- 4. Page init -->
<script>
// AOS init
Webflow.push(function () {
  AOS.init({
    duration: 700,
    easing: 'ease-out-quad',
    once: true,
    offset: 80,
    disable: 'mobile',
  });
});
</script>
```

> THREE.js: never load globally. Add to individual Page Settings → Custom Code → Footer.

---

## GSAP Patterns

Always wrap in `Webflow.push()` — fires after Webflow's own JS is ready.

### Fade-in on Scroll
Target: elements with attribute `data-gsap="fadein"`

```javascript
Webflow.push(function () {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  gsap.utils.toArray('[data-gsap="fadein"]').forEach(function (el) {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
});
```

### Stagger Children
Target: parent element with `data-gsap="stagger"`

```javascript
gsap.utils.toArray('[data-gsap="stagger"]').forEach(function (parent) {
  gsap.from(parent.children, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: parent,
      start: 'top 80%',
    },
  });
});
```

### SVG Path Animation (replaces Lottie)
Target: SVG element with `data-gsap="svg-draw"`

```javascript
gsap.utils.toArray('[data-gsap="svg-draw"] path').forEach(function (path) {
  var length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: path,
      start: 'top 80%',
    },
  });
});
```

### Hero Text Split
Target: heading with `data-gsap="hero-text"`

```javascript
var heroText = document.querySelector('[data-gsap="hero-text"]');
if (heroText) {
  var split = new SplitText(heroText, { type: 'lines,words' });
  gsap.from(split.words, {
    opacity: 0,
    y: 60,
    duration: 0.7,
    stagger: 0.05,
    ease: 'power3.out',
    delay: 0.2,
  });
}
```

---

## AOS Usage

Add `data-aos` attribute via Webflow Element Settings → Custom Attributes.

| Attribute          | Value              | Effect              |
|--------------------|--------------------|---------------------|
| `data-aos`         | `fade-up`          | Fade + move up      |
| `data-aos`         | `fade-in`          | Fade only           |
| `data-aos`         | `slide-right`      | Slide from left     |
| `data-aos`         | `zoom-in`          | Scale up            |
| `data-aos-delay`   | `100` / `200` etc  | ms delay            |
| `data-aos-duration`| `600` / `900` etc  | Override duration   |

> AOS and GSAP should not both target the same element. Pick one per element.

---

## THREE.js Canvas Setup

Per-page only. Add to Page Settings → Custom Code → Footer.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script>
Webflow.push(function () {
  var container = document.getElementById('three-canvas-container');
  if (!container) return;

  var scene    = new THREE.Scene();
  var camera   = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  camera.position.z = 5;

  // [TODO: add geometry / material / mesh]

  (function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', function () {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
</script>
```

Webflow element:
- Div Block, id = `three-canvas-container`
- Position: `relative` or `absolute` · Overflow: `hidden`
- Width / Height: set explicitly to prevent CLS

---

## Font Awesome

Head embed (CSS only — no JS bundle):

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

Usage in Webflow Embed block:
```html
<i class="fa-regular fa-envelope" aria-hidden="true"></i>
```

Prefer Webflow's built-in icon set first. Use Font Awesome only for icons not available there.

---

## Custom Attribute Convention

Use `data-*` for JS hooks. Never use style classes as JS selectors.

| Attribute    | Values                            | Purpose                    |
|--------------|-----------------------------------|----------------------------|
| `data-gsap`  | `fadein` · `stagger` · `hero-text` · `svg-draw` | GSAP target |
| `data-aos`   | `fade-up` · `fade-in` · `zoom-in` etc.          | AOS target  |
| `data-three` | `canvas-hero`                     | THREE.js mount point       |
| `data-nav`   | `sticky` · `transparent`          | Nav scroll behavior        |
