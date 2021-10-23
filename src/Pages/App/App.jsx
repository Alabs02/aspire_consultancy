import { Suspense, lazy, createRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'animate.css';

// Components
const Home = lazy(() => import(/* webpackChunkName: "Pages.Auth" */ '../Home'));

// User
const UserSignIn = lazy(() => import(/* webpackChunkName: "Pages.Auth" */ '../User/UserSignIn'));


const AppRoute = ({ component: Component, layout: Layout, ...properties}) => (
  <GuardedRoute {...properties} render={props => (
    <Layout ref={createRef()}>
      <Component {...props} />
    </Layout>
  )}></GuardedRoute>
);

const App = () => {
  return (
    <Router>
      <GuardProvider guards={[]} error={<div>ErrorPage</div>}>
        <TransitionGroup>
          <CSSTransition classNames="animate__animated animate__fadeInLeft" timeout={100}>
            <Suspense fallback={<div className="grid place-items-center">Loading...</div>}>
              <Switch>
                <GuardedRoute path="/" exact component={Home}></GuardedRoute>
                <GuardedRoute path="/user/login" exact component={UserSignIn}></GuardedRoute>
              </Switch>
            </Suspense>
          </CSSTransition>
        </TransitionGroup>
      </GuardProvider>
    </Router>
  );
}

export default App;
