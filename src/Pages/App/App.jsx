import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'animate.css';

// Components


const App = () => {
  return (
    <Router>
      <GuardProvider guards={[]} error={<div>ErrorPage</div>}>
        <TransitionGroup>
          <CSSTransition classNames="animate__animated animate__fadeInLeft" timeout={100}>
            <Suspense fallback={<div className="grid place-items-center">Loading...</div>}>
              <Switch>
                <GuardedRoute path="/signin" exact></GuardedRoute>
              </Switch>
            </Suspense>
          </CSSTransition>
        </TransitionGroup>
      </GuardProvider>
    </Router>
  );
}

export default App;
