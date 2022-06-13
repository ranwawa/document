import logo from './logo.svg';
import './App.css';
import { LifeCycleClass } from './lifecycle.tsx';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <LifeCycleClass />
    </div>
  );
}

export default App;
