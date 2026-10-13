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
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navItems.forEach((item) => {
      item.addEventListener("click", closeMenu);
    });

    window.addEventListener("scroll", function () {
      if (navLinks.classList.contains("active")) {
        closeMenu();
      }
    });

    document.addEventListener("click", function (e) {
      const isClickInsideNav = navLinks.contains(e.target);
      const isClickOnToggle = menuToggle.contains(e.target);

      if (
        !isClickInsideNav &&
        !isClickOnToggle &&
        navLinks.classList.contains("active")
      ) {
        closeMenu();
      }
    });
  }

  // 2. Accordion do Glossário
  document.querySelectorAll(".accordion-header").forEach((button) => {
    button.addEventListener("click", () => {
      const accordionItem = button.parentElement;
      const accordionBody = accordionItem.querySelector(".accordion-body");
      const isActive = button.classList.contains("active");

      document.querySelectorAll(".accordion-header").forEach((btn) => {
        btn.classList.remove("active");
        btn.nextElementSibling.style.maxHeight = null;
      });

      if (!isActive) {
        button.classList.add("active");
        accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
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

  // 4. Botão Voltar ao Topo
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

  // 5. Carrega as fotos salvas no localStorage ao abrir a página
  ["img-roseane", "img-fabricia", "img-melri"].forEach((id) => {
    const salva = localStorage.getItem(id);
    if (salva) {
      const imgElement = document.getElementById(id);
      if (imgElement) {
        imgElement.src = salva;
      }
    }
  });
});

// FUNÇÃO GLOBAL (deve ficar FORA do DOMContentLoaded)
function mudarFoto(event, imgId) {
  const arquivo = event.target.files[0];
  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
      const imgElement = document.getElementById(imgId);
      if (imgElement) {
        imgElement.src = e.target.result;
      }
      localStorage.setItem(imgId, e.target.result);
    };
    leitor.readAsDataURL(arquivo);
  }
}