import WebApp from '@twa-dev/sdk';
import { List } from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData.jsx';

export function ThemeParamsPage() {
  return (
    <List>
      <DisplayData
        rows={
          Object
            .entries(WebApp.themeParams)
            .map(([title, value]) => ({ title, value }))
        }
      />
    </List>
  );
}
