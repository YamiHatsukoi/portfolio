// Scroll reveal — trigger .reveal elements as they enter the viewport
(function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

// Active sidebar nav link based on scroll position (portfolio page)
(function () {
  var navLinks = document.querySelectorAll('.sidebar .nav-link[href^="#"]');
  if (!navLinks.length) return;

  var sections = Array.from(navLinks).map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  });

  function updateActive() {
    var scrollY = window.scrollY + 120;
    var current = null;

    sections.forEach(function (section) {
      if (section && section.offsetTop <= scrollY) {
        current = section;
      }
    });

    navLinks.forEach(function (link) {
      var target = document.querySelector(link.getAttribute('href'));
      link.classList.toggle('active', target === current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

// Sidebar toggle (portfolio page mobile)
(function () {
  var sidebar = document.getElementById('sidebar');
  var toggleBtn = document.getElementById('toggleSidebar');
  var closeBtn = document.getElementById('closeSidebar');
  if (!sidebar) return;

  function setSidebarState() {
    if (window.innerWidth < 768) {
      if (!sidebar.classList.contains('sidebar-open')) {
        sidebar.style.left = '-250px';
      }
      if (toggleBtn) toggleBtn.style.display = 'block';
      if (closeBtn) closeBtn.style.display = 'block';
    } else {
      sidebar.style.left = '0';
      sidebar.classList.remove('sidebar-open');
      if (toggleBtn) toggleBtn.style.display = 'none';
      if (closeBtn) closeBtn.style.display = 'none';
    }
  }

  window.addEventListener('resize', setSidebarState);
  setSidebarState();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      sidebar.style.left = '0';
      sidebar.classList.add('sidebar-open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      sidebar.style.left = '-250px';
      sidebar.classList.remove('sidebar-open');
    });
  }
})();
