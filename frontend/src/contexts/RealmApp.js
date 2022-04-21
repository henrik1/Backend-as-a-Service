import React, { useEffect } from "react";
import * as Realm from "realm-web";
import { baseUrl } from "../realm.json";

function createRealmApp(id) {
  return new Realm.App({ id, baseUrl });
}

export const RealmAppContext = React.createContext(null);

export function RealmAppProvider({ appId, children }) {

  // Store Realm.App in React state. If appId changes, all children will rerender and use the new realmApp.
  const [realmApp, setRealmApp] = React.useState(createRealmApp(appId));

  // Store the app's current user in state and wrap the built-in auth functions to modify this state
  const [currentUser, setCurrentUser] = React.useState(realmApp.currentUser);

  useEffect(() => {
    setRealmApp(createRealmApp(appId));
  }, [appId]);

  // Wrap the base logIn function to save the logged in user in state
  const logIn = React.useCallback(
    async (credentials) => {
      await realmApp.logIn(credentials);
      setCurrentUser(realmApp.currentUser);
    },
    [realmApp]
  );
  // Wrap the current user's logOut function to remove the logged out user from state
  const logOut = React.useCallback(async () => {
    try {
      await realmApp.removeUser(realmApp.currentUser);
    } catch(e) {
      console.error(e);
    }
    setCurrentUser(realmApp.currentUser);
  }, [realmApp, currentUser]);

  // Override the App's currentUser & logIn properties + include the app-level logout function
  const realmAppContext = React.useMemo(() => {
    return { ...realmApp, currentUser, logIn, logOut };
  }, [realmApp, currentUser, logIn, logOut]);

  return (
    <RealmAppContext.Provider value={realmAppContext}>
      {children}
    </RealmAppContext.Provider>
  );
}
