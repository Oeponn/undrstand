import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';
import {ThemeProvider} from 'components/contexts/ThemeContext';
import './css/index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) for TypeScript
root.render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
