export function setupSearch(posts) {
  const searchForm = document.querySelector("form#search");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const searchTerm = form.term.value;
    const term = searchTerm.toLowerCase();

    const filteredPosts = posts.filter(function (post) {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();
      const author = post.author.name.toLowerCase();

      const tagsMatch = Boolean(post.tags.map(tag => tag.toLowerCase()).filter(tag => tag.includes(term)).length)

      return title.includes(term) || body.includes(term) || author.includes(term) || tagsMatch;
    })
  });
}


