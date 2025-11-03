// Smooth scroll for anchor links (nav, hire me, contact)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // ignore empty hrefs and javascript:void(0)
    const href = this.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close bootstrap collapse if open (mobile)
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).toggle();
      }
    }
  });
});

// Skill circular progress with IntersectionObserver
function animateSkills() {
  let skills = [
    {selector: ".html-css", valueSelector: ".html-progress", end: 90, color: "#fca61f"},
    {selector: ".javascript", valueSelector: ".javascript-progress", end: 75, color: "#7d2ae8"},
    {selector: ".php", valueSelector: ".php-progress", end: 80, color: "#20c997"},
    {selector: ".reactjs", valueSelector: ".reactjs-progress", end: 30, color: "#3f396d"}
  ];

  skills.forEach(skill => {
    let progress = document.querySelector(skill.selector);
    let value = document.querySelector(skill.valueSelector);
    if (!progress || !value) return;
    let start = 0;
    let interval = setInterval(() => {
      start++;
      value.textContent = `${start}%`;
      progress.style.background = `conic-gradient(${skill.color} ${start * 3.6}deg, #ededed 0deg)`;
      if (start >= skill.end) clearInterval(interval);
    }, 20);
  });
}

const skillSection = document.querySelector(".skill");
let skillsAnimated = false;
if (skillSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
      }
    });
  }, { threshold: 0.45 });
  observer.observe(skillSection);
}

// Portfolio filtering (jQuery)
$(document).ready(function () {
  $('.filter-item').click(function () {
    const value = $(this).attr("data-filter");
    if (value === "all") {
      $(".post").show("1000");
    } else {
      $(".post").not("." + value).hide("1000");
      $(".post").filter("." + value).show("1000");
    }
    $('.filter-item').removeClass('active');
    $(this).addClass('active');
    // refresh AOS so animations trigger correctly after filtering
    AOS.refresh();
  });
});

// Sticky navbar on scroll
document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener('scroll', function() {
      const navbar = document.getElementById('navbar-top');
      if (window.scrollY > 50) {
        if (!navbar.classList.contains('fixed-top')) {
          navbar.classList.add('fixed-top');
          let navbar_height = document.querySelector('.navbar').offsetHeight;
          document.body.style.paddingTop = navbar_height + 'px';
        }
      } else {
        if (navbar.classList.contains('fixed-top')) {
          navbar.classList.remove('fixed-top');
          document.body.style.paddingTop = '0';
        }
      } 
  });
});


// Contact form handler with Gmail link + alert
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.name.value;
      const email = form.email.value;
      const mobile = form.mobile.value;
      const message = form.message.value;

      // Gmail compose link
      const gmailLink =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=amrutapawar518@gmail.com" +
        "&su=" + encodeURIComponent("New Message from Portfolio Contact Form") +
        "&body=" + encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\n\nMessage:\n${message}`
        );

      // Open Gmail in new tab
      window.open(gmailLink, "_blank");

      // Show alert
      alert("✅ Thank you " + name + "! Your Gmail compose window has been opened.");
      
      form.reset();
    });
  }
});

// Back to top button
let mybutton = document.getElementById("btn-back-to-top");
window.addEventListener('scroll', function() {
  if (!mybutton) return;
  if (window.scrollY > 200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
});
if (mybutton) {
  mybutton.addEventListener("click", function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}