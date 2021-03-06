// let randomImage = [
//   {
//     src: "assets/img/bunny.jpg",
//     caption: "Such a cute bunny",
//   },
//   {
//     src: "assets/img/duckling.jpg",
//     caption: "So adorable",
//   },
//   {
//     src: "assets/img/kangaroo.jpg",
//     caption: "Too cute to be true",
//   },
//   {
//     src: "assets/img/kitten.jpg",
//     caption: "Enough with the cuteness",
//   },
//   {
//     src: "assets/img/koala.jpg",
//     caption: "I can't take this cuteness anymore",
//   },
//   {
//     src: "assets/img/llama.jpg",
//     caption: "Lovely",
//   },
//   {
//     src: "assets/img/panda.jpg",
//     caption: "I want to cuddle them!",
//   },
//   {
//     src: "assets/img/penguin.jpg",
//     caption: "Where can I get one?",
//   },
//   {
//     src: "assets/img/puppy.jpg",
//     caption: "My heart is melting",
//   },
//   {
//     src: "assets/img/sloth.jpg",
//     caption: "Help! Cuteness overload!",
//   },
// ];

let container = document.getElementById("random");
let btn = document.getElementById("button");
// let addImg = document.createElement("img");
// container.appendChild(addImg);
// let addText = document.createElement("p");
// container.appendChild(addText);

// btn.addEventListener("click", (e) => {
//   let showRandom = randomImage[Math.floor(Math.random() * randomImage.length)];
//   addImg.src = showRandom.src;
//   addText.innerHTML = showRandom.caption;
//   btn.innerHTML = "More!";
// });

btn.addEventListener("click", (e) => {
  fetch("http://api.icndb.com/jokes/random")
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = data.value.joke;
      btn.innerHTML = "More!";
    });
});
