import WebApp from '@twa-dev/sdk';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { routes } from '@/navigation/routes.jsx';

function BackButtonManipulator() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function onClick() {
      navigate(-1);
    }
    WebApp.BackButton.onClick(onClick);

    return () => WebApp.BackButton.offClick(onClick);
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === '/') {
      WebApp.BackButton.isVisible && WebApp.BackButton.hide();
    } else {
      !WebApp.BackButton.isVisible && WebApp.BackButton.show();
    }
  }, [location]);

  return null;
}

/**
 * @return {JSX.Element}
 */
export function App() {
  return (
    <AppRoot
      appearance={WebApp.colorScheme}
      platform={['macos', 'ios'].includes(WebApp.platform) ? 'ios' : 'base'}
    >
      <BrowserRouter>
        <BackButtonManipulator/>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </BrowserRouter>
    </AppRoot>
  );
}
