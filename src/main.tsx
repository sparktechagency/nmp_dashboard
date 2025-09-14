import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css';
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.ts'
import { Toaster } from 'react-hot-toast';
import '@ant-design/v5-patch-for-react-19';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-center" />
    </Provider>
  </StrictMode>
);
