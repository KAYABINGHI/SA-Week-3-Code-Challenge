
# Simple Blog/Post Manager

This project is a simple web application to manage blog posts using a local JSON server as the backend and a frontend built with HTML, CSS, and JavaScript. The app allows users to view, add, update, and delete blog posts, with core and advanced features implemented as described below.







## Installation

Install my-project with npm
1. Run `npm install -g json-server@0.17.4`
2. Run `json-server db.json` (starts API on port 3000)
3. Open `index.html` in a browser or use `live-server`
## Features

As a user, you can:

- View Posts: See all blog post titles and images in a list. On page load, the `displayPosts` function fetches data from http://localhost:3000/posts and displays each post's title as a list item (e.g., `<ul> `or `<div>`) inside the `#post-list` div.
- View Post Details: Click a post title in `#post-list` to view its details (title, content, author) in the `#post-detail` div. A click event listener on each post title triggers the `handlePostClick` function to fetch and display the post's data.
- Add a Post: Submit a form with the ID `new-post-form` to create a new post. The `addNewPostListener` function handles form submission, creates a new post object (title, content, author), and appends it to `#post-list`. New posts do not persist after a page refresh for this deliverable.
- Program Flow: A `main()` function runs after the DOM is fully loaded, invoking `displayPosts` and `addNewPostListener` to start the application logic.
- View First Post on Load: See the details of the first post in `#post-detail` immediately after the page loads, without needing to click a title.
- Edit a Post: Click an "Edit" button in `#post-detail` to show a form (ID: `edit-post-form`) for updating the post's title and content. On submission, changes reflect in `#post-list` and `#post-detail` (no backend persistence required for this deliverable).
- Delete a Post: Click a "Delete" button in `#post-detail` to remove the post from `#post-list` and clear `#post-detail` or show a default message (no backend persistence required for this deliverable).


## Tech Stack

**Client:** Vanilla javascript, CSS, HTML

**Server:** JSON


## Lessons Learned

I have learnt about creating fake REST APIs. I also learnt that working as a front end developer one needs mock data that they can use to quickly prototype front and end components. Data should be fetched and asychronously and tha APIs sgould support not just GET but Also POST, PUT and DELETE requests. This package saves alot of time while prototyping.


## License

This project is under Moringa school. You are free to use, modify, and distribute this code, provided that the original author is credited.


## Authors

- [@KAYABINGHI](https://github.com/KAYABINGHI)


## Contact

For questions or support, reach out to:

Email: muchaipauls@gmail.com