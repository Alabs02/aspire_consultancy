import { StrictMode } from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import { App } from './Pages';
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

render(
  <StrictMode>
    <RecoilRoot>
      <ToastContainer
        position={'top-right'}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={true}
        pauseOnHover={true}
        draggable={true}
        theme={'light'}
      />
      <App />
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
