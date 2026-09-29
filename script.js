document.addEventListener("DOMContentLoaded", function () {
  // 1. Menu Hambúrguer para Tablet e Mobile
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  function closeMenu() {
    if (menuToggle && navLinks) {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    }
  }

  if (menuToggle && navLinks) {
    // Alterna a exibição do menu
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Fecha o menu ao clicar em qualquer item da navegação
    navItems.forEach((item) => {
      item.addEventListener("click", closeMenu);
    });

    // Fecha o menu ao rolar a página (scroll)
    window.addEventListener("scroll", function () {
      if (navLinks.classList.contains("active")) {
        closeMenu();
      }
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (e) {
      const isClickInsideNav = navLinks.contains(e.target);
      const isClickOnToggle = menuToggle.contains(e.target);

      if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  // 2. Accordion do Glossário
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const body = this.nextElementSibling;

      if (body.style.display === "block") {
        body.style.display = "none";
      } else {
        document
          .querySelectorAll(".accordion-body")
          .forEach((el) => (el.style.display = "none"));
        body.style.display = "block";
      }
    });
  });

  // 3. Formulário de Contato
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Obrigado pelo contato! A equipe da ARQUIVIA retornará em breve.");
      contactForm.reset();
    });
  }

  // Lógica do Botão Voltar ao Topo
  const btnTop = document.querySelector(".scrollTop");

  if (btnTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        btnTop.classList.add("show");
      } else {
        btnTop.classList.remove("show");
      }
    });

    btnTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});