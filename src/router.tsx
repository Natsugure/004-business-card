import { createBrowserRouter } from 'react-router'
import { Home } from './pages/Home'
import { Card } from './pages/Card'
import { HeaderLayout } from './components/layouts/HeaderLayout';

export const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cards/:id',
        element: <Card />,
      },
    ]
  }
])

export default router;