# Login API Integration Plan

## Overview

This document outlines the plan to integrate the following APIs into the login page (`components/LoginScreen.tsx`) of the application:

*   `/api/LoginAPI/Init`
*   `/api/LoginAPI/Login`
*   `/api/LoginAPI/LoginOffline`

## Prerequisites

*   Node.js and npm installed
*   React development environment set up
*   `axios` library

## Detailed Plan

1.  **API Client Setup (`src/api.ts`):**
    *   Install `axios` if it's not already a dependency: `npm install axios`
    *   Create a new file `src/api.ts` to house the API client functions.
    *   Define functions using `axios` to call each of the specified APIs:
        *   `Init`: `/api/LoginAPI/Init`
        *   `Login`: `/api/LoginAPI/Login`
        *   `LoginOffline`: `/api/LoginAPI/LoginOffline`
    *   Handle potential errors and data transformations within these functions.

2.  **Login Page Integration (`components/LoginScreen.tsx`):**
    *   **`Init` API:**
        *   Import the `Init` API function from `src/api.ts`.
        *   Call the `Init` API in a `useEffect` hook that runs only once when the component mounts. Use a ref to ensure it's only called once.
        *   Store the result in a state variable using `useState` if needed.
    *   **`Login` API:**
        *   Import the `Login` API function from `src/api.ts`.
        *   Replace the `setTimeout` in the `handleLogin` function with a call to the `Login` API.
        *   Pass the username and password from the input fields to the `Login` API function.
        *   Update the login state based on the API response.
    *   **`LoginOffline` API:**
        *   Import the `LoginOffline` API function from `src/api.ts`.
        *   Add a button below the login form to trigger the `LoginOffline` API call.
        *   Call the `LoginOffline` API when the button is clicked.
        *   Update the login state based on the API response.
    *   **Error Handling:**
        *   Use `try...catch` blocks to handle potential errors from the API calls.
        *   Display error messages to the user using a state variable and conditional rendering.

3.  **Type Definitions (`types.ts`):**
    *   Define TypeScript types for the request and response data of each API in `types.ts`.

## Mermaid Diagram

```mermaid
graph LR
    A[LoginScreen.tsx] --> B(useEffect - Init API (once));
    A --> C{Login Form Submission};
    C --> D(/api/LoginAPI/Login);
    A --> E[LoginOffline Button];
    E --> F(/api/LoginAPI/LoginOffline);
    B --> G{Store Init Data};
    D --> H{Update Login State};
    F --> H;
    G --> A;
    H --> A;
    D -- Error --> I[Display Error];
    F -- Error --> I;
    B -- Error --> I;
    I --> A;
    style B fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#ccf,stroke:#333,stroke-width:2px
    style F fill:#ccf,stroke:#333,stroke-width:2px