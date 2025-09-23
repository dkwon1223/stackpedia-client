import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from '@pages/RootLayout/RootLayout';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // { path: "*", Component: Home },
      // { index: true, Component: Home },
      // { path: "technologies", 
      //   children: [
      //     { index: true, Component: Technologies },
      //     { path: ":technologySlug", Component: TechnologyDetails }
      //   ], 
      // },
      // { path: "profile", Component: Profile },
      // { path: "settings", Component: Settings },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
