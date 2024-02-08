import { Route, Routes as Router } from 'react-router-dom';
import EditContact from './pages/EditContact';
import Home from './pages/Home';
import NewContact from './pages/NewContact';

export default function Routes() {
  // Uma forma de definir rotas usando o useRoutes
  // const routes = useRoutes([
  //   {
  //     path: '/',
  //     element: <Home />,
  //   },
  //   {
  //     path: '/new',
  //     element: <NewContact />,
  //   },
  //   {
  //     path: '/edit/:id',
  //     element: <EditContact />,
  //   },
  // ]);

  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Router>
  );
}
