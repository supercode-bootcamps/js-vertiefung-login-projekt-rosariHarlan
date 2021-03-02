let randomImage = [
  {
    src: "assets/img/bunny.jpg",
    caption: "Such a cute bunny",
  },
  {
    src: "assets/img/duckling.jpg",
    caption: "So adorable",
  },
  {
    src: "assets/img/kangaroo.jpg",
    caption: "Too cute to be true",
  },
  {
    src: "assets/img/kitten.jpg",
    caption: "Enough with the cuteness",
  },
  {
    src: "assets/img/koala.jpg",
    caption: "I can't take this cuteness anymore",
  },
  {
    src: "assets/img/llama.jpg",
    caption: "Lovely",
  },
  {
    src: "assets/img/panda.jpg",
    caption: "I want to cuddle them!",
  },
  {
    src: "assets/img/penguin.jpg",
    caption: "Where can I get one?",
  },
  {
    src: "assets/img/puppy.jpg",
    caption: "My heart is melting",
  },
  {
    src: "assets/img/sloth.jpg",
    caption: "Help! Cuteness overload!",
  },
];

let container = document.getElementById("random");
let btn = document.getElementById("button");

btn.addEventListener("click", (e) => {
  let showRandom = randomImage[Math.floor(Math.random() * randomImage.length)];
  container.innerHTML = `<img src="${showRandom.src}"><br><p>${showRandom.caption}</p>`;
});
