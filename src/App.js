import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
// import NotFound from "./pages/NotFound";
// import AllQutes from "./pages/AllQutes";
// import NewQute from "./pages/NewQute";
// import QuteDetail from "./pages/QuteDetail";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQute = React.lazy(() => import("./pages/NewQute"));
const QuteDetail = React.lazy(() => import("./pages/QuteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQutes = React.lazy(() => import("./pages/AllQutes"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner></LoadingSpinner>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/qutes"></Redirect>
          </Route>
          <Route path="/qutes" exact>
            <AllQutes></AllQutes>
          </Route>
          <Route path="/new-qute">
            <NewQute></NewQute>
          </Route>
          <Route path="/qutes/:quteid">
            <QuteDetail></QuteDetail>
          </Route>
          <Route path="*" exact>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
