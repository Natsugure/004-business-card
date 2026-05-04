import { createBrowserRouter } from 'react-router'
import { Home } from '../pages/Home'
import { Card } from '../pages/Card'
import { HeaderLayout } from '../components/layouts/HeaderLayout';
import { CardRegister } from '../pages/CardRegister';

export const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cards',
        children: [
          {
            path: 'register',
            element: <CardRegister />,
          },
          {
            path: ':id',
            element: <Card />,
          },
        ]
      }
    ]
  }
])

export default router;