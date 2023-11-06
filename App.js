import logo from "./logo.svg";
import "./App.css";
import App_bar from "./Component/App_bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashbaord from "./Component/Dashboard/Dashbaord";
import WelcomeScreen from "./Component/WelcomeScreen";
import Demologin from "./Component/Demologin";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={WelcomeScreen} />
        <Route path="/login" exact component={Demologin} />
        <Route path="/dashboard" exact component={Dashbaord} />

        {/* Add more routes here */}
      </Switch>
    </Router>
  );
};

export default App;
