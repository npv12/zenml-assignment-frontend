This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) made for the ZenML frontend developer challenge.

## Getting Started

First, Install all packages using:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

NOTE: I have used node version v18.19.0 and npm version 9.2.0. However, it should run on any latest versions of the same.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the
solution to the challenge. The main page showcases all the stacks the user has created. The user can click on a view details button to see the details of the stack which visualises the stack with the configurations used. You can click on individual configuration to see the details of the configuration.

## Technologies Used

-   Next.js
-   Tailwind CSS
-   React Query
-   React FLow
-   ShadCN

## Folder Structure

-   `components`: Contains all the components used in the project.
-   `components/ui`: Contains all the UI components used in the project. This is auto created by ShadCN.
-   `app/api`: Contains the API calls to the backend.
-   `app/types`: Contains the types used in the project.
-   `app/utils`: Contains the utility functions used in the project.
-   `pages`: Contains all the pages used in the project.

## Assumptions made

-   `User` And `Project` are not ID and used only for display purposes.
-   `is_shared` is not used in the project.
-   Navigation is based from using react flow library

## How is it made

-   The project is made using Next.js and Tailwind CSS.
-   For state management, since the application is very small scale, a local state is maintained in every page and react query is used to maintain the state of the API calls.
-   The main page lists all the stacks. The assumption is that `/Stacks` endpoint is from a particular user alone and all needs to be displayed
-   Each stack has a `View Details` button which opens up a new page `/{stack_id}` which shows the details of the stack visualised using react flow.
-   All pages are made mobile responsive. The grid sizes changes based on the screen size.
-   The orientation of react flow changes as the screen size changes and changes to vertical scrolling for a phone since that is much more convinient.
-   In case any of the API call fails, an error page is shown to the user. A better way is to also show a toast with the error reason and how to debug. But I leave it for future implementation.
-   For components, most components are used from ShadCN. ErrorPage, LoadingPage are separate components.
-   Tab Navigation is tested to be working across all pages

## How is it prepared for future

-   In case a new stack creation flow is supposed to be implemented, it can be added directly to the main page.
-   For editing the stack, while viewing the stack, instead of `Fit View` I would use a `Edit` button which would allow the user to edit the stack. Since react flow is already implemented, it would be straightforward to implement the editing flow.

## Bonus questions

1. For implementing remaining CRUD operations, I would add a new page for each of the operations. For example, for creating a new stack, I would add a new page `/create` which would have a form to create a new stack. For updating a stack, I would add a new page `/{stack_id}/edit` which would have a form to update the stack. Deletion would open a modal which would require the user to confirm the deletion. All of them should be fairly straightforward to implement and reusing the creation and arrangement of nodes should help by generalising the implementation
2. For handling authentication, I would use a cookie based authentication. The user would login and the token would be stored in the cookie. The cookie would be sent with every request to the server. In case the token expires, the server would return a 401 and the user would be redirected to the login page. The user would have to login again to get a new token. This would be a simple implementation and would be secure enough for the application.
3. For separating open and closed source features, I would use a feature flag. The open source features would be available to all users and the closed source features would be available to only the users who have access to it. The feature flag would be set in the backend and the frontend would check the feature flag before showing the feature.

If we are also assuming that some features inside the frontend are supposed to be closed source, I would create a different folder for components which are supposed to be closed source and not track it by default. I would try to make most components common and opensource and only keep the essential page code inside the closed source part to make it easier to maintain.
