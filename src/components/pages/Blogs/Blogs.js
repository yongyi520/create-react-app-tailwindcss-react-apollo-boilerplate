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
import New from "./Blog/New";

const Blogs = () => {
  let match = useRouteMatch();
  return (
    <div id="AllBlogs">
      <Switch>
        <Route path={`${match.url}/new`}>
          <New />
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
