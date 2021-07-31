import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";

function Layout() {
  const { url, params } = useRouteMatch();

  return (
    <>
      <div className="container">
        <Header />
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route>
            <Home exact path="/" />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
