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
        this.field('tags', {
          boost: 5
        });
        this.field('_categories');

        if (data && data.items && data.items.length > 0) {
          data.items.forEach(item => {
            this.add(item);
          });
        } else {
          console.error("No search feed data items available.");
        }
      });

      // DOM element ids
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
      const searchIndex = function (query) {
        //var fuzzyQuery = query.length > 0 ? query + "~1" : query;
        var results = idx.search(query);
        updateTitle(query);
        updateResults(results);
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
          var input = search.value;
          searchIndex(input);
        });
      } else {
        console.error("Failed to get required search elements on page.");
      }
    })
    .catch(err => {
      console.error("Failed to fetch search index!", err);
    });
})();