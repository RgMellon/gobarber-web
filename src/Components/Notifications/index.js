import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';

import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  ScrollBar,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkedReadNotification(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  const hasUnread = useMemo(
    () => !!notifications.find(item => item.read === false),
    [notifications]
  );

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <ScrollBar>
          {notifications.map(item => (
            <Notification key={item._id} unread={!item.read}>
              <p> {item.content}</p>
              <time> {item.timeDistance} </time>
              {!item.read && (
                <button
                  onClick={() => handleMarkedReadNotification(item._id)}
                  type="button"
                >
                  Marcar como lida!
                </button>
              )}
            </Notification>
          ))}
        </ScrollBar>
      </NotificationList>
    </Container>
  );
}
