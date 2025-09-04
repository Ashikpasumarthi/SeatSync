
// import React from 'react';
import ErrorPage from './errorPage';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { seatSyncStore, persistor } from './Frontend/store'; //persistor from './store';
import HomePage from './Frontend/Components/homepage';
import MovieInfoPage from './Frontend/Components/MovieInfo/movieInfoPage'
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/movie/:slug/:id',
        element: <MovieInfoPage />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={ seatSyncStore }>
    <PersistGate loading={ null } persistor={ persistor } >
      <RouterProvider router={ router } />
    </PersistGate>
  </Provider >

);

console.log("App component rendered", seatSyncStore.getState());
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

