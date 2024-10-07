# Country Info App

**Country Info App** is a full-stack application that provides detailed information about countries, including data about their population, bordering countries, and their flags. The application consists of a backend built with Express.js and a frontend developed in Next.js.

## Project Overview

### Backend

**Tech Stack:**

- Node.js (Express.js)

**Key Features:**

- An API to fetch a list of available countries.
- An API to retrieve detailed information about specific countries, including border countries, population data, and flag images.

### Frontend

**Tech Stack:**

- React.js v.18.0
- Next.js v.14.2
- shadcn/ui
- recharts

**Key Features:**

- A country list page displaying available countries.
- A country info page providing detailed information about a selected country, including its flag and border countries.
- A population chart to visualize the country's population over time.

## Instructions to Run the Application

### Backend

1. Navigate to the backend folder:
    ```bash
    cd server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with the following variables:
    ```plaintext
    PORT=5000
    NEXT_PUBLIC_URL=http://localhost:3000
    ```

4. Start the server:
    ```bash
    npm start
    ```

### Frontend

1. Navigate to the frontend folder:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file with the following variable:
    ```plaintext
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```

4. Start the application:
    ```bash
    npm run dev
    ```
