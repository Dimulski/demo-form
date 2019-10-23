(() => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const id = url.searchParams.get("id");
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.json())
    .then(json => {
      document.getElementById("title").innerText = json.title.charAt(0).toUpperCase() + json.title.slice(1);
      document.getElementById("body").innerText = json.body.charAt(0).toUpperCase() + json.body.slice(1);
    });
})();
