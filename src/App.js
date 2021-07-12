import AppContextWrapper from './components/AppContextWrapper'
import Navbar from './components/Navbar'
import Routes from './components/Routes'
import Footer from './components/Footer'
import './components/styles/App.css';

function App() {
  return (
    <div className="App">
      <AppContextWrapper>
        <Navbar/>
        <Routes/>
        <Footer/>
      </AppContextWrapper>
    </div>
  );
}

export default App;
