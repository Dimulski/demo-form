get12random = (elements) => {
  let selected = [];
  while (selected.length < 12) {
    let randomElement = Math.floor(Math.random() * elements.length + 1);
    if (selected.indexOf(randomElement) === -1) {
      selected.push(randomElement);
    }
  }

  return selected;
};

const lazyLoad = target => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const url = entry.target.children[0].dataset.url;
        entry.target.children[0].src = url;

        entry.target.children[0].classList.remove("hidden");
        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

const photosField = document.getElementById("photos-field");
get12random([...Array(50).keys()]).forEach(pictureId => {
  axios.get(`https://jsonplaceholder.typicode.com/photos/${pictureId}`)
    .then(response => {
      const photo = response.data;
      const photoCard = document.createElement("div");
      photoCard.className = "photo-card";
      photoCard.innerHTML =
        `<img src="../img/600.png" data-url='${photo.url}' class="photo-img-top hidden" alt="${photo.title}">
                <div class="photo-body">
                    <h5 class="photo-title">${photo.title}</h5>
                </div>`;
      photosField.appendChild(photoCard);
      lazyLoad(photoCard);
    });
});


// get12random = (elements) => {
//     var selected = [];
//     while (selected.length < 12) {
//         let randomElement = elements[Math.floor(Math.random() * elements.length)];
//         if (selected.indexOf(randomElement) === -1) {
//             selected.push(randomElement);
//         }
//     }

//     return selected;
// };

// axios.get('https://jsonplaceholder.typicode.com/photos')
//     .then(response => {
//         const photosField = document.getElementById("photos-field");
//         const first50photos = response.data.filter(photo => photo.id < 51);
//         const random12 = get12random(first50photos);

//         random12.forEach(photo => {
//             const photoCard = document.createElement("div");
//             photoCard.className = "photo-card";
//             photoCard.innerHTML =
//                 `<img src="${photo.url}" class="photo-img-top d-none" alt="${photo.title}">
//                 <div class="photo-body d-none">
//                     <h5 class="photo-title">${photo.title}</h5>
//                 </div>`;
//             photosField.appendChild(photoCard);
//             lazyLoad(photoCard);
//         });
//     });


// const observerOptions = {
//     root: null,
//     rootMargin: "0px",
//     threshold: []
// };
