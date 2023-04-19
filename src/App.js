import './App.css';
import { Route, Switch } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Chatpage from './pages/Chatpage'

function App()
{
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/chats' component={Chatpage} />
      </Switch>
    </div>
  );
}

export default App;
