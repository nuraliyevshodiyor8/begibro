const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [
  ...document.querySelectorAll(selector)
];


/* =========================
   SCROLL
========================= */

const header = $("#header");
const progress = $("#progress");
const toTop = $("#toTop");

function scrollHandler(){

  const scroll = window.scrollY;

  const height =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percent =
    height > 0
      ? (scroll / height) * 100
      : 0;

  progress.style.width = `${percent}%`;

  header.classList.toggle(
    "scrolled",
    scroll > 20
  );

  toTop.classList.toggle(
    "show",
    scroll > 500
  );

}

window.addEventListener(
  "scroll",
  scrollHandler
);

scrollHandler();


/* =========================
   MOBILE MENU
========================= */

const menuBtn = $("#menuBtn");
const nav = $("#nav");

menuBtn.addEventListener(
  "click",
  () => {
    nav.classList.toggle("open");
  }
);


$$(".nav a").forEach(
  link => {

    link.addEventListener(
      "click",
      () => {
        nav.classList.remove("open");
      }
    );

  }
);


/* =========================
   DARK MODE
========================= */

const themeBtn = $("#themeBtn");

if(
  localStorage.getItem(
    "begibro-theme"
  ) === "dark"
){

  document.body.classList.add(
    "dark"
  );

}

themeBtn.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark"
    );

    localStorage.setItem(
      "begibro-theme",

      document.body.classList.contains(
        "dark"
      )
        ? "dark"
        : "light"
    );

  }
);


/* =========================
   GO TOP
========================= */

toTop.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }
);


/* =========================
   ACTIVE NAV
========================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav a"
  );

window.addEventListener(
  "scroll",
  () => {

    let current = "home";

    sections.forEach(
      section => {

        const top =
          section.offsetTop - 150;

        if(
          window.scrollY >= top
        ){

          current =
            section.getAttribute("id");

        }

      }
    );

    navLinks.forEach(
      link => {

        link.classList.toggle(
          "active",

          link.getAttribute(
            "href"
          ) === `#${current}`
        );

      }
    );

  }
);


/* =========================
   CREATOR GOAL
========================= */

let goal =
  Number(
    localStorage.getItem(
      "begibro-goal"
    ) || 72
  );

const goalValue =
  $("#goalValue");

const goalBar =
  $("#goalBar");

const goalBtn =
  $("#goalBtn");

function renderGoal(){

  goalValue.textContent =
    goal;

  goalBar.style.width =
    `${goal}%`;

}

renderGoal();

goalBtn.addEventListener(
  "click",
  () => {

    goal++;

    if(goal > 100){
      goal = 100;
    }

    localStorage.setItem(
      "begibro-goal",
      goal
    );

    renderGoal();

    showToast(
      `Progress ${goal}% bo‘ldi`
    );

  }
);


/* =========================
   CLOCK
========================= */

function updateClock(){

  const now =
    new Date();

  const time =
    now.toLocaleTimeString(
      "uz-UZ",
      {
        hour12:false
      }
    );

  $("#clock").textContent =
    time;


  const end =
    new Date(
      now.getFullYear(),
      11,
      31,
      23,
      59,
      59
    );

  const days =
    Math.ceil(
      (end - now) /
      86400000
    );

  $("#daysLeft").textContent =
    Math.max(
      0,
      days
    );

}

updateClock();

setInterval(
  updateClock,
  1000
);


/* =========================
   PORTFOLIO FILTER
========================= */

$$(".filter").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        $$(".filter").forEach(
          b => {
            b.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        const filter =
          button.dataset.filter;

        $$(".project").forEach(
          project => {

            const category =
              project.dataset.category;

            if(
              filter === "all" ||
              category === filter
            ){

              project.classList.remove(
                "hide"
              );

            }else{

              project.classList.add(
                "hide"
              );

            }

          }
        );

      }
    );

  }
);


/* =========================
   DONATION
========================= */

const donateInput =
  $("#donateAmount");

const donateMessage =
  $("#donateMessage");

const donateBtn =
  $("#donateBtn");

const donateModal =
  $("#donateModal");

const donateSummary =
  $("#donateSummary");


$$(".amount").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        $$(".amount").forEach(
          item => {

            item.classList.remove(
              "active"
            );

          }
        );

        button.classList.add(
          "active"
        );

        donateInput.value =
          button.dataset.amount;

      }
    );

  }
);


donateInput.addEventListener(
  "input",
  () => {

    $$(".amount").forEach(
      item => {

        item.classList.remove(
          "active"
        );

      }
    );

  }
);


function openDonate(){

  donateModal.classList.add(
    "open"
  );

}


function closeDonate(){

  donateModal.classList.remove(
    "open"
  );

}


donateBtn.addEventListener(
  "click",
  () => {

    const amount =
      Math.max(
        1,
        Number(
          donateInput.value
        ) || 10
      );

    const message =
      donateMessage.value.trim();


    donateSummary.textContent =
      `${amount.toLocaleString(
        "uz-UZ"
      )} ming UZS donat tanlandi.` +
      (
        message
          ? ` Izoh: "${message}"`
          : ""
      );


    openDonate();

  }
);


$("#closeDonate")
  .addEventListener(
    "click",
    closeDonate
  );


$("#donateBg")
  .addEventListener(
    "click",
    closeDonate
  );


/* =========================
   VIDEO MODAL
========================= */

const videoModal =
  $("#videoModal");


$("#openVideo")
  .addEventListener(
    "click",
    () => {

      videoModal.classList.add(
        "open"
      );

    }
  );


$("#closeVideo")
  .addEventListener(
    "click",
    () => {

      videoModal.classList.remove(
        "open"
      );

    }
  );


$("#videoBg")
  .addEventListener(
    "click",
    () => {

      videoModal.classList.remove(
        "open"
      );

    }
  );


/* =========================
   COPY BUTTON
========================= */

const copyBtn =
  $("#copyBtn");

copyBtn.addEventListener(
  "click",
  async () => {

    try{

      await navigator.clipboard.writeText(
        "BegiBro"
      );

      showToast(
        "BegiBro nusxalandi"
      );

    }catch{

      showToast(
        "BegiBro"
      );

    }

  }
);


/* =========================
   TOAST
========================= */

const toast =
  $("#toast");

function showToast(
  message
){

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  setTimeout(
    () => {

      toast.classList.remove(
        "show"
      );

    },
    1800
  );

}


/* =========================
   ESCAPE
========================= */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key === "Escape"
    ){

      closeDonate();

      videoModal.classList.remove(
        "open"
      );

    }

  }
);


/* =========================
   SMOOTH ANCHORS
========================= */

$$('a[href^="#"]').forEach(
  link => {

    link.addEventListener(
      "click",
      event => {

        const target =
          document.querySelector(
            link.getAttribute(
              "href"
            )
          );

        if(target){

          event.preventDefault();

          target.scrollIntoView({
            behavior:"smooth"
          });

        }

      }
    );

  }
);