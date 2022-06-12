# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

### `npx create-react-app my-app --template redux-typescript`

## Available Scripts

In the project directory, you can run:

### `npm install`
Install packages dependencies
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Project Structure

    .
    ├── ...
    ├── src                     
    │   ├── index.tsx                       # The starting point for the app
    │   ├── App.tsx                         # The top-level React component
    │   ├── app             
    │   │   ├── hooks.js                    # Redux hooks
    │   │   ├── store.js                    # Creates the Redux store instance
    │   ├── components             
    │   │   ├── book                        # React components for books management page
    │   │   ├── chart                       # React components for analytics page
    │   │   ├── chart                       # React components for users page
    │   │   ├── Layout.tsx                  # Main layout
    │   │   ├── ListItems.tsx               # List items for layout drawer
    │   │   ├── Popup.tsx                   # Popup dialog
    │   │   ├── Popup.tsx                   # Popup dialog for data grid
    │   ├── data                            # Data source for users and books
    │   ├── features             
    │   │   ├── books           
    │   │   │   ├── booksSlice.ts           # Redux reducer for books management CRUD
    │   │   │   ├── transactionSlice.ts     # Redux reducer for books borrow and return record
    │   │   ├── users           
    │   │   │   ├── currentUserSlice.ts     # Redux reducer for current logged in user
    │   │   │   ├── usersSlice.ts           # Redux reducer logic for users management CRUD
    │   ├── pages                           # Pages according to react router     
    │   └── ...                 
    └── ...

## Scalability

React
* Modularity and reusability
* Low coupling between components with clearly defined interface
* Easy to extract new components or merge components into one
* A single source of truth for global states with Redux

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
