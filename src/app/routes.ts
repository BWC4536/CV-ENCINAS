import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Equipos } from './components/Equipos';
import { Calendario } from './components/Calendario';
import { ElClub } from './components/ElClub';
import { Inscripciones } from './components/Inscripciones';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'equipos', Component: Equipos },
      { path: 'calendario', Component: Calendario },
      { path: 'el-club', Component: ElClub },
      { path: 'inscripciones', Component: Inscripciones },
    ],
  },
]);
