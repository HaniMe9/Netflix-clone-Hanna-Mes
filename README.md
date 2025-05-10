# Netflix Clone Using React.js and Firebase

A Netflix clone built with **React.js** and **Firebase**. This project includes a responsive design and is deployed on **Hanna Meressa**.

Overview:
Your Netflix clone aims to replicate the core features of Netflix, such as navigation, displaying movie and TV show recommendations, and allowing the user to interact with the UI. It uses React, React Router, and Firebase (for user authentication) to create a dynamic and interactive user experience.

Key Components and Features:
Navbar:
Dynamic Navbar: Your Navbar component contains navigation links to different sections like Home, TV Shows, Movies, and more. It changes its appearance when the user scrolls down the page (adding a "nav-dark" class).
User Profile: The navbar also includes a user profile icon, and upon clicking the profile image, the user can sign out of Netflix. This is managed by Firebase's authentication system (e.g., logout function).

Movie Data Fetching:
API Integration: Using The Movie Database (TMDb) API, your app fetches movie and show data such as popular movies, new releases, and categories like "Now Playing" or "Trending."
Use of useEffect: The useEffect hook fetches the data when the component loads, storing the results in the state (apiData).

Movie Cards:
Displaying Movies: The TitleCards component dynamically renders a list of movie cards based on the fetched data. Each card displays an image of the movie and its title.
Scrollable Cards: The wheel event listener allows the user to scroll horizontally through the list of movie cards by moving the mouse wheel.

Routing with React Router:
React Router: Used for navigation between different sections of the site. For instance, when a user clicks on a movie, they are redirected to a player page (e.g., /player/:id).

Firebase Authentication:
Sign In/Sign Out: Firebase is used for user authentication. The user can sign in, and their information is stored, allowing them to interact with the app securely.
Sign-out functionality: When a user clicks "Sign Out of Netflix" in the dropdown menu, the logout() function is triggered, which signs them out.

Responsive Design:
Media Queries: The app adapts to different screen sizes. For example, the navbar adjusts its padding and image sizes for smaller screen widths.

Technologies Used:
- React: The core front-end library that helps create components and manage state.
- React Router: Allows for navigation between different routes without refreshing the page.
- Firebase: Used for user authentication (sign-in and sign-out).
- TMDb API: Provides movie and TV show data, allowing you to fetch the latest popular movies, trending shows, and more.

 CSS: Used for styling the application, including media queries for responsiveness.

User Flow:
The user visits the homepage, where the navbar with links to various sections is displayed.
As the user scrolls down, the navbar background changes based on the scroll position.
The movie data (e.g., popular movies) is fetched from the TMDb API and displayed in a horizontally scrollable list of cards.
The user can navigate to different sections like "TV Shows," "Movies," etc., and click on a movie to view more details or play content (if the player page is implemented).
If the user is authenticated, they can sign out through the profile dropdown in the navbar.

Conclusion:
This Netflix clone mimics the essential features of Netflix, including dynamic content loading, a responsive UI, user authentication, and navigation between different sections of the app. It is a solid starting point for building a functional streaming platform or any content-based web app.

![image](https://github.com/user-attachments/assets/a274e178-f52b-409c-85ac-6e3cd402365d)
