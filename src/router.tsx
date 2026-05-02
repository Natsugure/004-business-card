import { createBrowserRouter } from 'react-router'
import { Home } from './pages/Home'
import { Card } from './pages/Card'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cards/:id',
    element: <Card />,
  },
])

export default router;