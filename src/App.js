import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loadable from "./utils/loadable";
import Spinner from "./component/Spinner";
import "./App.css";
import { createBrowserHistory } from "history";

const Layout = Loadable(lazy(() => import("./component/Layout")));
const Mint = Loadable(lazy(() => import("./pages/Mint")));
// eslint-disable-next-line no-undef
const history = createBrowserHistory({
  basename: "",
  forceRefresh: false,
});

export default function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Layout>
            <Route path="/" exact component={Mint} />
          </Layout>
        </Switch>
      </Suspense>
    </Router>
  );
}
