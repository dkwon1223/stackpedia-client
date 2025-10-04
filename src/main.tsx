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
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AxiosError } from 'axios';
import axios from 'axios';

const router = createBrowserRouter([
  { 
    path: "/", 
    Component: Hero,
    children: [
      { index: true, Component: Hero },
    ]
  },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
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
      { path: "changelog", Component: Changelog },
      { path: "share-feedback", Component: Feedback },
    ],
  },
  { path: "privacy-policy", Component: PrivacyPolicy },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      meta: {
        errorHandler: (error: AxiosError) => {
          if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            return { status, handled: true };
          }
        }
      }
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
