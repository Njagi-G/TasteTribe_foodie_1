# Taste-Tribe
[![HomePage.png](https://i.postimg.cc/Jzh1DDs0/HomePage.png)](https://postimg.cc/F72twKgX)

Welcome to TasteTribe! Finding a suitable recipe online can be trying, especially since most of the accessible alternatives are high-end meals that may not be appropriate for a middle- or lower-class home. Taste Tribe aims to address this issue by providing a forum for discovering and sharing simple, practical recipes that meet everyday needs. Our service gives you access to a variety of simple recipes, complete with ingredients, methods, and serving sizes. Additionally, registered users can improve their experience by commenting, bookmarking, and rating recipes.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Team Members](#team-members)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
### Problem Statement
Finding the right recipe online can be difficult, especially when most of the available recipes are for high-end or gourmet meals that may be out of reach. Individuals and families frequently struggle to find easy and quick-to-prepare meals that meet their daily needs. The absence of easily available, simple recipes exacerbates the situation, making it impossible for customers to enjoy home-cooked meals without spending too much time searching or understanding complex cooking instructions.

### Solution
Taste Tribe addresses this problem by offering a dedicated platform for discovering and sharing simple, practical recipes. Our application provides a curated collection of recipes that include essential details such as ingredients, preparation procedures, and serving sizes. This ensures that users can quickly find recipes that are both manageable and affordable.

```
TasteTribe_2.0
├─ .env
├─ Pipfile
├─ Pipfile.lock
├─ README.md
├─ client
│  ├─ README.md
│  ├─ db.json
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ api.js
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ ExploreRecipes.jsx
│  │  │  ├─ FeaturedRecipes.jsx
│  │  │  ├─ FeaturedRecipesCard.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ NavBar.jsx
│  │  │  └─ UserRecipesCard.jsx
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ AboutUs
│  │  │  │  └─ AboutUs.jsx
│  │  │  ├─ Admin
│  │  │  │  ├─ AdminDashboard.jsx
│  │  │  │  └─ AdminSignIn.jsx
│  │  │  ├─ ContactUs
│  │  │  │  └─ ContactUs.jsx
│  │  │  ├─ ErrorPage
│  │  │  │  └─ ErrorPage.jsx
│  │  │  ├─ Home
│  │  │  │  └─ Home.jsx
│  │  │  ├─ LogIn
│  │  │  │  └─ LogIn.jsx
│  │  │  ├─ RecipeInfo
│  │  │  │  └─ RecipeInfo.jsx
│  │  │  ├─ Recipes
│  │  │  │  └─ Recipes.jsx
│  │  │  ├─ SignUp
│  │  │  │  └─ SignUp.jsx
│  │  │  ├─ UserProfile
│  │  │  │  └─ UserProfile.jsx
│  │  │  └─ UserRecipes
│  │  │     └─ UserRecipes.jsx
│  │  └─ routes.jsx
│  ├─ tailwind.config.js
│  └─ vite.config.js
├─ package-lock.json
└─ server
   ├─ Pipfile
   ├─ Pipfile.lock
   ├─ app.py
   ├─ config.py
   ├─ db.json
   ├─ instance
   │  └─ tastetribe.db
   ├─ migrations
   │  ├─ README
   │  ├─ alembic.ini
   │  ├─ env.py
   │  ├─ script.py.mako
   │  └─ versions
   │     └─ 1ded27d83174_initial_migration.py
   ├─ models.py
   ├─ requirements.txt
   ├─ routes
   │  ├─ admin.py
   │  ├─ auth.py
   │  ├─ bookmarks.py
   │  ├─ comments.py
   │  ├─ contact.py
   │  ├─ likes.py
   │  ├─ notifications.py
   │  ├─ ratings.py
   │  ├─ recipes.py
   │  └─ users.py
   ├─ schema
   │  └─ schema.py
   ├─ secret.py
   ├─ seed.py
   └─ uploads
      ├─ carlos-derecichei-FsFeN06h_sQ-unsplash.jpg
      ├─ desola-lanre-ologun-IgUR1iX0mqM-unsplash.jpg
      └─ sai-de-silva-cykFL7IQCTk-unsplash.jpg

```
## Features

### MVP (Minimum Viable Product)
- Login
- Create an account
- View and Update profile(profile images saved on Cloudinary)
- View and search recipes (by name, ingredients and number of people served)
- Filter recipes by country, ratings, ingredients, number of people served and createdDateTime.
- Create, Update and Delete new recipes
- Bookmarking/Favoriting recipes
- Share recipe on social media(facebook, twitter and whatsapp)

## Technology Stack
### Frontend

- React
- React Router
- React icons
- React toastify
- Framer motion
- tailwindCSS for styling

### Backend

- Flask
- SQLAlchemy for ORM
- SQLite
- RESTful API

### Deployment

- Vercel for Frontend
- Render for Backend

## Installation
### Backend Setup

1. Clone the repository:

    ```sh
    git clone git@github.com:Nicolex0/TasteTribe_2.0.git
    ```

2. Navigate to the project directory:

    ```sh
    cd TasteTribe_2.0
    ```

3. Navigate to the server directory:

    ```sh
    cd server
    ```

4. Ensure you are using python v3.8.13 and install the packages for the project:

    ```sh
    pipenv --python 3.8.13
    ```
    then

    ```sh
    pipenv install
    ```

5. Activate and Enter your virtual environment:

    ```sh
    pipenv shell
    ```

6. Run the server: 

    ```sh
    python app.py
    ```

### Frontend Setup

1. Open another terminal.

2. Navigate to the frontend directory:

    ```sh
    cd TasteTribe_2.0/client
    ```

3. Ensure you are using nodejs v20.16.0. Use the Node Version Manager. If you don't have the version manager and/or the nodejs version, install them for the front-end to run smoothly:

    ```sh
    nvm use 20.16.0
    ```

4. Install the frontend dependencies:

    ```sh
    npm install
    ```

5. Run the application:

    ```sh
    npm run dev
    ```

## Team Members

- Nicole Apono
- Dennis Githaiga
- Joy Simiyu
- Tony Brian
- John-Alexander Kamau

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

