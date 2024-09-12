/* ********** Menu ********** */
((d) => {
  const button = document.querySelector(".menu-btn");
  const nav = document.querySelector(".menu");

  button.addEventListener("click", (e) => {
    button.firstElementChild.classList.toggle("none");
    button.lastElementChild.classList.toggle("none");
    nav.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    button.firstElementChild.classList.remove("none");
    button.lastElementChild.classList.add("none");
    nav.classList.remove("is-active");
  });
})(document);

/* ********** ContactForm ********** */

const $form = document.querySelector(".contact-form"),
  $loader = document.querySelector(".contact-form-loader"),
  $response = document.querySelector(".contact-form-response");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $loader.classList.remove("none");
  fetch("https://formsubmit.co/ajax/nelvissalazar.16@gmail.com", {
    method: "POST",
    body: new FormData(e.target),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      location.hash = "#gracias";
      $form.reset();
    })
    .catch((err) => {
      console.log(err);
      let message =
        err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
      $response.querySelector(
        "h3"
      ).innerHTML = `Error ${err.status}: ${message}`;
    })
    .finally(() => {
      $loader.classList.add("none");
      setTimeout(() => {
        location.hash = "#close";
      }, 3000);
    });
});
