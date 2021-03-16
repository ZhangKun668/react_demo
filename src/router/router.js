import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { createHashHistory } from "history";
// const hashHistory = createHashHistory();

import Login from "../login/index";
import Menu from "../menu/index";

class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Menu" component={Menu}/>
        </Switch>
    </HashRouter>
    )
  }
}

export default Router;