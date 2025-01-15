import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import Header from './components/common/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Homepage/>
    </div>
  );
}

export default App;
