// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
// const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Testimony = lazy(() => import('../pages/protected/Testimony'))
const Events = lazy(() => import('../pages/protected/Events'))
const Partners = lazy(() => import('../pages/protected/Partners'))
const News = lazy(() => import('../pages/protected/News'))
const Articles = lazy(() => import('../pages/protected/Articles'))
const ArticleDetails = lazy(() => import('../pages/protected/ArticleDetails'))
const HostCenter = lazy(() => import('../pages/protected/HostCenters'))
// const Integration = lazy(() => import('../pages/protected/Integration'))
// const Calendar = lazy(() => import('../pages/protected/Calendar'))
// const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
// const GettingStarted = lazy(() => import('../pages/GettingStarted'))
// const DocFeatures = lazy(() => import('../pages/DocFeatures'))
// const DocComponents = lazy(() => import('../pages/DocComponents'))



const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/events",
    component: Events,
  },
  {
    path: "/partners",
    component: Partners,
  },
  {
    path: "/news",
    component: News,
  },
  {
    path: "/hostcenters",
    component: HostCenter,
  },
  {
    path: "/testimony",
    component: Testimony,
  },
  {
    path: "/articles",
    component: Articles,
  },
  {
    path: "/articles/:id",
    component: ArticleDetails,
  }
];

export default routes
