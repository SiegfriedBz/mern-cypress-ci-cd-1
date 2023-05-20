import './App.css';
import SideNav from './components/SideNav/SideNav';
import Habit from "./components/Habit/Habit"
import Accomplishment from './components/Accomplishment/Accomplishment';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Rewards from './components/Rewards/Rewards';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-container">
          <SideNav />
          <Switch>
            <Route strict exact path="/habits" component={Habit} />
            <Route strict exact path="/accomplishments" component={Accomplishment} />
            <Route strict exact path="/rewards" component={Rewards} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
