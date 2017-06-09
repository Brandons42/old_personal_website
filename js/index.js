import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Layout } from "components/Layout.js";

const body = document.getElementsByTagName("body");

ReactDOM.render(
    /*<Router history={hashHistory}>
      <Route path="/" component={Layout}>

    </Route>
  </Router>*/
  <Layout/>,
body);
