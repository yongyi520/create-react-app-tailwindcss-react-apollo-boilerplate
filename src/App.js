import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Blogs from "./components/pages/Blogs/Blogs";
import "./tailwind.output.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Sidebar from "./components/sidebar/Sidebar";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="w-full h-screen flex flex-row">
          <Sidebar />

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <div className="flex flex-col items-center bg-gray-100 w-full">
            <div className="flex items-center justify-center border-b border-gray-200 w-full inset-x-0 h-20 shadow-sm">
              <div className="flex items-center justify-between w-full px-16 py-4">
                <div className="flex w-1/4 items-center justify-start">
                </div>
                <div className="w-1/2"></div>
                <div className="flex items-center justify-end w-1/4">
                  <div className="py-2 pl-6 pr-0">Search Input</div>
                  <div className="py-2 pl-6 pr-0">Avatar</div>
                </div>
              </div>
            </div>
            <Switch>
              <Route path="/blogs">
                <Blogs />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
