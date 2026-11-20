import * as THREE from 'three';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/dashboard.css';

window.THREE = THREE;

import('./lib/nexori-3d.js').then(() => {
  const root = document.getElementById('root');
  if (!root) return;
  createRoot(root).render(<App />);
});