(function () {
  fetch("./search.json")
    .then(res => res.json())
    .then((data) => {
      // Search index json dictionary loaded
      const idx = lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('content', {
          boost: 10
        });
        this.field('author');
        this.field('categories');

        Object.keys(data).forEach((key, index) => {
          var value = data[key];
          value['id'] = key;
          this.add(value);
        });
      });

      // DOM element ids
      const form = document.getElementById("form");
      const search = document.getElementById("search");
      const list = document.getElementById("results");

      // Submit form handler
      if (form && search && list) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var query = search.value;
          var results = idx.search(query);
          updateResults(results);
        });
      } else {
        console.error("Unable to get search elements");
      }

      // Update DOM
      const updateResults = function (results) {
        var items = [];
        var item;
        results.forEach(result => {
          item = data[result.ref];
          if (item) {
            var li = '<li><a href="' + item.url + '">' + item.title + '</a></li>';
            items.push(li);
          }
        });
        var html = "<li>No results found</li>";
        if (items.length > 0) {
          html = items.join("\n");
        }
        list.innerHTML = html;
      };
    })
    .catch(err => {
      console.error("Failed to fetch search index!", err);
    });
})();