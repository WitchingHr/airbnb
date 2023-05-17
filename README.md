# Airbnb Clone

## Description:

Airbnb clone built with Next.js, MongoDB, Prisma, and NextAuth.js. 
Users can create an account, list their home for rent, browse other listings and make reservations. Features a fully responsive design layout, built with Tailwind CSS.

## Table of Contents:

- [Installation](#installation)
- [License](#license)
- [Images](#images)
- [Lessons Learned](#lessons-learned)

## Installation:

1. Clone the repo
   ```sh
   git clone git@github.com:WitchingHr/airbnb.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Create a .env file in the root directory and add the following:
    ```sh
    DATABASE_URL=your_mongodb_url
    NEXTAUTH_SECRET=your_nextauth_secret

    GITHUB_ID=your_github_id
    GITHUB_SECRET=your_github_secret

    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    ```
4. Run the development server
    ```sh
    npm run dev
    ```

## License:

Distributed under the MIT License. See `LICENSE` for more information.

## Images:

## Lessons Learned:

- Creating resuable components
- Managing state with zustand
- Configuring Prisma with MongoDB
- Configuring authentication with NextAuth.js
- Configuring OAuth with Google and GitHub
- API Routing with Next.js
- Creating search params using query strings
- Setting up leaflet map
- Setting up Cloudinary for image hosting
- Creating dynamic routes with Next.js
- Sanitizing data for client
- Creating server actions with Next.js
- Using search params to filter database data
- Creating loading page with Next.js 13
- Creating error page with Next.js 13
- Creating protected routes with NextAuth configuration