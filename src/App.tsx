import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
// @ts-ignore
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Login from "./components/Login";
import UploadForm from "./components/UploadForm";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path={`/detail/:id`}>
            <Detail />
          </Route>
          <Route path="/upload">
            <UploadForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        {/* <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/login" component={Login} />
        </Switch> */}
      </Router>
    </div>
  );
};

export default App;
