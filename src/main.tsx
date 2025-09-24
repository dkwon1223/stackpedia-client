import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from '@pages/RootLayout/RootLayout';
import './index.css';
import Hero from './pages/Hero/Hero';
import Home from './pages/Home/Home';
import Technologies from './pages/Technologies/Technologies';
import Profile from './pages/Profile/Profile';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import TechnologyDetails from './pages/TechnologyDetails/TechnologyDetails';
import Stacks from './pages/Stacks/Stacks';
import Projects from './pages/Projects/Projects';
import Support from './pages/Support/Support';
import Changelog from './pages/Changelog/Changelog';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Feedback from './pages/Feedback/Feedback';

const router = createBrowserRouter([
  { path: "/", Component: Hero },
  {
    path: "/app",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "technologies", 
        children: [
          { index: true, Component: Technologies },
          { path: ":technologySlug", Component: TechnologyDetails }
        ], 
      },
      { path: "stacks", Component: Stacks },
      { path: "projects", Component: Projects },
      { path: "support", Component: Support },
      { path: "my-profile", Component: Profile },
      { path: "settings", Component: SettingsPage },
    ],
  },
  { path: "changelog", Component: Changelog },
  { path: "privacy-policy", Component: PrivacyPolicy },
  { path: "share-feedback", Component: Feedback },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
