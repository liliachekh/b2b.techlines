import './App.scss';
import Router from './router';
import { HelmetProvider } from 'react-helmet-async';
function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Router />
    </HelmetProvider>
  );
}

export default App;
