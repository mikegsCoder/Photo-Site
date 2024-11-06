# Photo Site

:dart:  My project for the Angular and VueJS courses. This is a Web application where you can post your best outdoor photos and browse such photos posted by other users. Each post has title, keyword, location, date of creation, image URL and description.

## :arrow_forward: Getting Started:

1. Clone the repo
   ```sh
   git clone https://github.com/mikegsCoder/Photo-Site.git
   ```

## 💡 Starting the Server:

1. Open Visual Studio Code in the "server" folder and open the Terminal
   ```sh
   View -> Terminal
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the server
   ```sh
   node index.js

## 💡 Starting the Angular client:

1. Open Visual Studio Code in the "client-angular" folder and open the Terminal
   ```sh
   View -> Terminal
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the Angular project
   ```sh
   ng serve
   ```
## 💡 Starting the VueJS client:

1. Open Visual Studio Code in the "client-vuejs" folder and open the Terminal
   ```sh
   View -> Terminal
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the VueJS project
   ```sh
   npm run dev
   ```
## :information_source: Application Functionality:

- Guest visitor can: 
  - browse all posts;
  - view post details;
- Logged in user can:
  - browse his own posts; 
  - create new posts;
  - edit his own posts;
  - delete his own posts;
  - vote posts created by other users (only once per post);
  - view his profile statistics.  
- Some more features:
  - implemented app interceptor;
  - implemented auth guard;
  - implemented pipes;
  - implemented data validation for Register, Create Post and Edit Post forms;
  - implemented 404 (Not Found) component;
  - implemented loading spinner;
  - responsive design.

## :hammer_and_wrench: Technologies and Tools used:

- Angular and TypeScript for the Angular project
- VueJS and JavaScript for the VueJS project
- ExpressJS
- Mongo DB
- HTML 5
- CSS

## :gear: Application Backend:

 - NodeJS server using MongoDB, Express and JWT. 
 
## :framed_picture: Screenshot - Home Page:

![PhotoSite-HomePage](https://mikegscoder.github.io/img/PhotoSite/HomePage.jpg)

## :framed_picture: Screenshot - All Posts:

![PhotoSite-AllPosts](https://mikegscoder.github.io/img/PhotoSite/AllPosts.jpg)

## :framed_picture: Screenshot - Post Details:

![PhotoSite-PostDetails](https://mikegscoder.github.io/img/PhotoSite/Details.jpg)

## :framed_picture: Screenshot - Register Page:

![PhotoSite-Register](https://mikegscoder.github.io/img/PhotoSite/Register.jpg)

## :framed_picture: Screenshot - Login Page:

![PhotoSite-Login](https://mikegscoder.github.io/img/PhotoSite/Login.jpg)

## :framed_picture: Screenshot - Create Post:

![PhotoSite-CreatePost](https://mikegscoder.github.io/img/PhotoSite/Create.jpg)

## :framed_picture: Screenshot - Edit Post:

![PhotoSite-EditPost](https://mikegscoder.github.io/img/PhotoSite/Edit.jpg)

## :framed_picture: Screenshot - My Posts:

![PhotoSite-MyPosts](https://mikegscoder.github.io/img/PhotoSite/MyPosts.jpg)

## :framed_picture: Screenshot - Profile:

![PhotoSite-Profile](https://mikegscoder.github.io/img/PhotoSite/Profile.jpg)

## :v: Leave a feedback
Give a :star: if you like this app.
Thank you ❤️!

## 📖 License:

This project is licensed under the [MIT License](LICENSE).