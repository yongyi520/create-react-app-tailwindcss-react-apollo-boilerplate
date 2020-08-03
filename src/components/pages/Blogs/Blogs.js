import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Blog from "./Blog/Blog";
import All from "./Blog/All";
import View from "./Blog/View";

const Blogs = () => {
  let match = useRouteMatch();
  return (
    <div className="w-full h-full px-16 py-10 overflow-auto">
      <Switch>
        <Route path={`${match.url}/new`}>
          <View />
        </Route>
        <Route path={`${match.url}/:blogId`}>
          <Blog />
        </Route>
        <Route path={`${match.url}`}>
          <All />
        </Route>
      </Switch>
    </div>
  );
};

Blogs.propTypes = {};

export default Blogs;
