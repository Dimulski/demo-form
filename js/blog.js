getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await response.json();
};

getPosts().then(posts => {
  const blogField = document.getElementById("blog-field");
  posts.filter(posts => posts.id > 10 && posts.id < 23).forEach(post => {
    const blogCard = document.createElement("div");
    blogCard.className = "card";
    blogCard.innerHTML =
      `<div class="card-body">
            <h5 class="card-title">${post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h5>
            <p class="card-text">${post.body.length > 59 ?
        post.body.charAt(0).toUpperCase() + post.body.substring(1, 59) + "..." :
        post.body.charAt(0).toUpperCase() + post.body}</p>
            <a href="#" class="btn btn-primary read-more"  data-id="${post.id}">Read More</a>
        </div>`;
    blogField.appendChild(blogCard);
  });

  [].forEach.call(document.getElementsByClassName("read-more"), (button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const id = button.dataset.id;
      window.location = 'post.html?id=' + id;
    });
  });
});


// fetch('https://jsonplaceholder.typicode.com/posts')
// .then(response => response.json())
// .then(json => {
//     const blogField = document.getElementById("blog-field");
//     json.filter(post => post.id > 10 && post.id < 23).forEach(post => {
//         const blogCard = document.createElement("div");
//         blogCard.className = "card";
//         blogCard.innerHTML =
//         `<div class="card-body">
//             <h5 class="card-title">${post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h5>
//             <p class="card-text">${post.body.charAt(0).toUpperCase() + post.body.substring(1,60)}...</p>
//             <a href="#" class="btn btn-primary read-more"  data-id="${post.id}">Read More</a>
//         </div>`;
//         blogField.appendChild(blogCard);
//     });

//     [].forEach.call(document.getElementsByClassName("read-more"), (button) => {
//         button.addEventListener("click", (event) => {
//             event.preventDefault();
//             const id = button.dataset.id;
//             window.location = 'post.html?id=' + id;
//         })
//     })
// });