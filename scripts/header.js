const listEl = document.querySelector(".hero__list");

function handleHover(e) {
  if (e.target.classList.contains("hero__link")) {
    const link = e.target;
    const siblings = link
      .closest(".hero__list")
      .querySelectorAll(".hero__link");
    siblings.forEach((item) => {
      if (item !== link) item.style.opacity = this;
    });
  }
}

listEl.addEventListener("mouseover", handleHover.bind(0.5));
listEl.addEventListener("mouseout", handleHover.bind(1));
