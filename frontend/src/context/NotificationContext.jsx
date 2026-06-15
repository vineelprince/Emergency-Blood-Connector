/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
} from "react";

const NotificationContext =
  createContext();

export const NotificationProvider =
  ({ children }) => {

    const [notifications,
      setNotifications] =
      useState([]);

    const addNotification =
      (notification) => {

        setNotifications(
          prev => [
            notification,
            ...prev,
          ]
        );
      };

    return (
      <NotificationContext.Provider
        value={{
          notifications,
          addNotification,
        }}
      >
        {children}
      </NotificationContext.Provider>
    );
  };

export const useNotifications =
  () =>
    useContext(
      NotificationContext
    );