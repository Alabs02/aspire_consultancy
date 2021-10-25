import { StrictMode } from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import { App } from './Pages';
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './Utils';

console.log('Token:', getToken());

render(
  <StrictMode>
    <RecoilRoot>
      <ToastContainer
        position={'top-right'}
        autoClose={4000}
        hideProgressBar={true}
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
