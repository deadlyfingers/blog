(function () {
  fetch("./feed.json")
    .then(res => res.json())
    .then(data => {
      // Search index json feed loaded
      const idx = lunr(function () {
        this.ref('id');
        this.field('title', {
          boost: 10
        });
        this.field('content_text');
        this.field('summary');
        this.field('tags', {
          boost: 5
        });
        this.field('author');
        this.field('categories');
        this.field('year', {
          boost: 7
        });
        // convert JSON feed item properties to lunr search fields
        if (data && data.items && data.items.length > 0) {
          data.items.forEach(item => {
            this.add({
              id: item.id,
              title: item.title,
              content_text: item.content_text,
              summary: item.summary,
              tags: item.tags,
              author: item.author.name,
              categories: item._data.categories,
              year: item._data.year
            });
          });
        } else {
          console.error("No search feed data items available.");
        }
      });

      // Required HTML element ids
      const form = document.getElementById("search_form");
      const search = document.getElementById("search");
      const container = document.getElementById("search_results");
      const title = document.getElementById("search_title");

      // Update DOM with search title
      const updateTitle = function (query) {
        title.textContent = query.length > 0 ? 'Search results for "' + query + '"' : "";
      };

      // Update DOM with dynamic search results
      const updateResults = function (results) {
        var elements = [];
        var item;
        results.forEach(result => {
          item = data.items.find(x => x.id === result.ref);
          if (item) {
            var li = '<li><a href="' + item.url + '">' + item.title + '</a></li>';
            elements.push(li);
          }
        });
        var html = "<p>No results found</p>";
        if (elements.length > 0) {
          html = '<ul>' + elements.join("\n") + '</ul>';
        }
        container.innerHTML = html;
      };

      // Search index
      var lastQuery = "";
      const searchIndex = function (query) {
        var q = query.trim();
        if (q.length === 0 || q === lastQuery) {
          return;
        }
        var results = idx.search(q);
        updateTitle(q);
        updateResults(results);
        lastQuery = q;
      };

      // Trigger search
      const triggerSearch = function () {
        var input = search.value;
        searchIndex(input);
      };

      // View controller
      if (form && search && container && title) {
        // URL search param handler
        var params = new URLSearchParams(window.location.search);
        var q = params.get('q');
        if (q && q.length > 0) {
          searchIndex(q);
        }
        // Live search input handler
        search.addEventListener("keyup", function (e) {
          triggerSearch();
        });
        // Detect autocomplete input event on iOS
        search.addEventListener("input", function (e) {
          triggerSearch();
        });
      } else {
        console.error("Failed to get required search elements on page.");
      }
    })
    .catch(err => {
      console.error("Failed to fetch search index!", err);
    });
})();