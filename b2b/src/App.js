import './App.scss';
import Router from './router';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Router />
    </HelmetProvider>
  );
}

export default App;
