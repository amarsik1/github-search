import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import { dataContext, useProvideData } from './context';

function App() {
  const data = useProvideData();
  
  return (
    <dataContext.Provider value={data}>
      <Header />
      <Body />
    </dataContext.Provider>
  );
}

export default App;
