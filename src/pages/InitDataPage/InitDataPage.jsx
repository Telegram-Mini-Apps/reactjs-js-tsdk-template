import { useMemo } from 'react';
import { List, Placeholder } from '@telegram-apps/telegram-ui';
import WebApp from '@twa-dev/sdk';

import { DisplayData } from '@/components/DisplayData/DisplayData.jsx';

// TODO: @twa-dev/types is outdated.
/**
 * @typedef {import('@twa-dev/types').WebAppUser} ExactWebAppUser
 * @property {boolean} [allows_write_to_pm]
 * @property {boolean} [added_to_attachment_menu]
 */

/**
 * @param {ExactWebAppUser} user
 * @returns {DisplayDataRow[]}
 */
function getUserRows(user) {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photo_url },
    { title: 'last_name', value: user.last_name },
    { title: 'first_name', value: user.first_name },
    { title: 'is_bot', value: user.is_bot },
    { title: 'is_premium', value: user.is_premium },
    { title: 'language_code', value: user.language_code },
    { title: 'allows_to_write_to_pm', value: user.allows_write_to_pm },
    { title: 'added_to_attachment_menu', value: user.added_to_attachment_menu },
  ];
}

/**
 * @returns {JSX.Element}
 */
export function InitDataPage() {
  const initDataRaw = WebApp.initData;
  const initData = WebApp.initDataUnsafe;

  const initDataRows = useMemo(() => {
    if (!initData || !initDataRaw) {
      return;
    }
    const {
      hash,
      start_param,
      chat_instance,
      chat_type,
      auth_date,
      can_send_after,
      query_id,
    } = initData;
    return [
      { title: 'raw', value: initDataRaw },
      { title: 'auth_date', value: new Date(auth_date * 1000).toLocaleString() },
      { title: 'auth_date (raw)', value: auth_date },
      { title: 'hash', value: hash },
      { title: 'can_send_after', value: can_send_after },
      { title: 'query_id', value: query_id },
      { title: 'start_param', value: start_param },
      { title: 'chat_type', value: chat_type },
      { title: 'chat_instance', value: chat_instance },
    ];
  }, [initData, initDataRaw]);

  const userRows = useMemo(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined;
  }, [initData]);

  const receiverRows = useMemo(() => {
    return initData && initData.receiver ? getUserRows(initData.receiver) : undefined;
  }, [initData]);

  const chatRows = useMemo(() => {
    if (!initData?.chat) {
      return;
    }
    const { id, title, type, username, photo_url } = initData.chat;

    return [
      { title: 'id', value: id.toString() },
      { title: 'title', value: title },
      { title: 'type', value: type },
      { title: 'username', value: username },
      { title: 'photo_url', value: photo_url },
    ];
  }, [initData]);

  if (!initDataRows) {
    return (
      <Placeholder
        header="Oops"
        description="Application was launched with missing init data"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    );
  }
  return (
    <List>
      <DisplayData header={'Init Data'} rows={initDataRows}/>
      {userRows && <DisplayData header={'User'} rows={userRows}/>}
      {receiverRows && <DisplayData header={'Receiver'} rows={receiverRows}/>}
      {chatRows && <DisplayData header={'Chat'} rows={chatRows}/>}
    </List>
  );
}
