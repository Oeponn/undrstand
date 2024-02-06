import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';

export const RouteChangeHandler = () => {
  const location = useLocation();

  useEffect(() => {
    let title = 'Undrstand';
    switch (location.pathname) {
      case '/':
        title = 'Undrstand';
        break;
      case '/about':
        title = 'About | Undrstand';
        break;
      case '/settings':
        title = 'Settings | Undrstand';
        break;
      default:
        title = 'Page Not Found';
    }

    document.title = title;
  }, [location.pathname]);

  return null;
};
