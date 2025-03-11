const folders = document.querySelectorAll(".arts__folder");
const overlay = document.querySelector(".overlay");

const placeholder = document.createElement("div");
placeholder.classList.add("arts__image", "arts__image--expanded");

function openCloseModal() {
  currentImage.classList.toggle("arts__image--expanded");
  currentImage.classList.toggle("arts__image--active");
  overlay.classList.toggle("hidden");
}

function revealFolders(entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("folder--hidden");
    observer.unobserve(entry.target);
  });
}

const folderObserver = new IntersectionObserver(revealFolders, {
  threshold: 0.1,
  root: null,
});

folders.forEach((folder, idx) => {
  // |=======[SETTING ATTRIBUTES]=======|
  folder.dataset.index = idx;
  let isExpanded = false;
  folder.dataset.expanded = isExpanded;
  folder.dataset.orientation = idx % 2 === 0 ? "left" : "right";

  // |=======[SELECTING ELEMENTS]=======|
  const imagesContainer = folder.querySelector(".arts__images");
  const textContainer = folder.querySelector(".arts__text-container");
  const expandBtn = folder.querySelector(".arts__expand-btn");

  // |=======[EXPAND BUTTON]=======|
  expandBtn.addEventListener("click", function (e) {
    // |=======[CHANGE BUTTON TEXT]=======|
    expandBtn.textContent = isExpanded ? "expandir" : "retrair";

    // |=======[TOGGLING ACTIVE CLASSES]=======|
    imagesContainer
      .querySelectorAll(".arts__image")
      .forEach((img) => img.classList.toggle("arts__image--expanded"));
    imagesContainer.classList.toggle("arts__images--unactive");

    // |=======[SWITHING EXPANDED ATTRIBUTE AND OPACITY]=======|
    textContainer.style.opacity = isExpanded ? 1 : 0;
    isExpanded = !isExpanded;
    folder.dataset.expanded = isExpanded;
  });

  // |=======[MODAL BUTTON]=======|
  let modalOpen = false;

  imagesContainer.addEventListener("click", function (e) {
    if (isExpanded) {
      // |=======[GET CURRENT IMAGE]=======|
      if (e.target.classList.contains("arts__image")) currentImage = e.target;

      if (!modalOpen) {
        // |=======[PLACE PLACEHOLDER]=======|
        if (!modalOpen) currentImage.before(placeholder);

        // |=======[REMOVE MARGIN]=======|
        if (folder.dataset.orientation === "left")
          currentImage.style.marginLeft = 0;
        if (folder.dataset.orientation === "right")
          currentImage.style.marginRight = 0;
      } else {
        // |=======[REMOVE PLACEHOLDER]=======|
        placeholder.remove();

        // |=======[ADD MARGIN AGAIN]=======|
        currentImage.style = "";
      }

      openCloseModal();
      modalOpen = !modalOpen;
    }
  });

  // |=======[REVEAL SECTIONS]=======|
  folder.classList.add("folder--hidden");
  folderObserver.observe(folder);
});
