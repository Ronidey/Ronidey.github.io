const $btnBars = document.getElementById('btnBars');
const $sidebar = document.getElementById('sidebar');
const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverable = document.querySelectorAll('.hoverable');
const $sideNavLinks = document.querySelectorAll('.side-nav__link');
const $hero = document.getElementById('hero');
const $header = document.getElementById('header');
const $loader = document.getElementById('loader');

window.addEventListener('load', function () {
  $loader.classList.add('hide');
  $loader.addEventListener('transitionend', function () {
    this.parentElement.removeChild(this);
  });
  const showOnScroll = document.querySelectorAll('.show-on-scroll');

  for (let elm of showOnScroll) {
    elm.style.animationPlayState = 'running';
  }
});

$sidebar.addEventListener('click', (e) => {
  if ((e.target.tagName = 'A')) {
    $sidebar.classList.remove('is-open');
  }
});

for (let $el of $hoverable) {
  $el.addEventListener('mouseenter', onMouseEnter);
  $el.addEventListener('mouseleave', onMouseLeave);
}

gsap.registerPlugin('ScrollTrigger');

$btnBars.addEventListener('click', function () {
  $sidebar.classList.add('is-open');
});

$sidebar.querySelector('.btn-close').addEventListener('click', function () {
  $sidebar.classList.remove('is-open');
});

document.addEventListener('mousemove', (e) => {
  gsap.to($bigBall, {
    x: e.clientX - 15,
    y: e.clientY - 15,
    duration: 1.25,
    ease: 'power4.out'
  });

  gsap.to($smallBall, {
    x: e.clientX - 4,
    y: e.clientY - 4,
    duration: 0.25
  });
});

function onMouseEnter() {
  gsap.to($bigBall, {
    scale: 2.5
  });
}

function onMouseLeave() {
  gsap.to($bigBall, {
    scale: 1
  });
}

gsap.utils.toArray('.show-on-scroll').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        el.classList.add('is-visible');
      }
    }
  });
});

gsap.to($hero, {
  scrollTrigger: {
    trigger: $hero,
    start: 'bottom top',
    end: 'bottom bottom',
    onEnter: () => {
      $header.classList.add('is-scrolled');
    },
    onEnterBack: () => {
      $header.classList.remove('is-scrolled');
    }
  }
});

gsap.utils.toArray('.section').forEach((el) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        showActiveLink(el);
      },
      onEnterBack: () => {
        showActiveLink(el);
      }
    }
  });
});

function showActiveLink(el) {
  const navLink = document.querySelectorAll(
    `.nav a[href="#${el.id}"], .side-nav a[href="#${el.id}"]`
  );
  const activeLinks = document.querySelectorAll(
    '.nav__link.is-active, .side-nav__link.is-active'
  );

  for (let link of activeLinks) {
    link.classList.remove('is-active');
  }

  for (let link of navLink) {
    link.classList.add('is-active');
  }
}
