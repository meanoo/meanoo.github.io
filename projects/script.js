const app = {
    initialize: function() {
      app.client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: "ix4wnbg3o6cz",
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: "1xGpOQ6bGZ-zGhoX7uJkIurYBNUIVnuKxvNPIPcGcP0"
      });
    },
  
    getEntry: function(entry) {
      // fetch a particular project
      app.client.getEntry(entry).then(project => {
        const projectData = {
          title: project.fields.title,
          imageUrl: `http:${project[1].fields.vid.fields.file.url}`,
          imageUrl2: `http:${project[1].fields.bgvid.fields.file.url}`,
          imageUrl3: `http:${project[1].fields.reel2020.fields.file.url}`,
          imageTitle: project[1].fields.vid.fields.title,
          description: documentToHtmlString(project.fields.description)
        };
        // load the template for this item from a local file
        fetch('projectPage.mustache')
          .then(response => response.text())
          .then(template => {
            // render the template with the data
            const rendered = Mustache.render(template, projectData);
            // add the element to the container
            $('.container').append(rendered);
          }
        );
      });
    },
  
    getAllEntries: function() {
      // fetch all entries
      app.client.getEntries().then(response => {
          debugger;
        // go through each one
        response.items.forEach(project => {
          // pull out the data you're interested in
          const projectData = {
            title: project.fields.title,
            imageUrl: `http:${project[1].fields.vid.fields.file.url}`,
            imageUrl2: `http:${project[1].fields.bgvid.fields.file.url}`,
            imageUrl3: `http:${project[1].fields.reel2020.fields.file.url}`,
            imageTitle: project.fields[1].vid.fields.title,
            urlSlug: `${project.fields.urlSlug}.html`
          };
          // load the template for this item from a local file
          fetch('projectOnHome.mustache')
            .then(response => response.text())
            .then(template => {
              // render the template with the data
              const rendered = Mustache.render(template, projectData);
              // add the element to the container
              $('.container').append(rendered);
            }
          );
        });
      });
    }
  };