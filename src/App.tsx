import { Link } from '@tanstack/react-router';

function App() {
  return (
    <div>
      App component <Link to="/login">Login</Link> <Link to="/register">Sing up</Link>
    </div>
  );
}

export default App;
