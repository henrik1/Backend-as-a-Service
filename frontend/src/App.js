import './fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf';
import './fonts/PlusJakartaSans-2.6/static/PlusJakartaSans-ExtraBold.ttf';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { RealmAppProvider } from "./contexts/RealmApp";
import { ThemeProvider } from "./theme/Theme";
import { appId } from "./realm.json";
import "./App.css";
import AppBar from './components/AppBar';
import ProtectedRoute from './components/ProtectedRoute';
import PageLoader from './components/PageLoader';

const Articles = lazy(() => import("./pages/articles"));
const SigninPage = lazy(() => import("./pages/signin"));

function App() {
  return (
    <div className="App">
      <AppBar />
      <Routes>

        <Route path="/signin/*" element={
          <Suspense fallback={<PageLoader />}>
            <SigninPage />
          </Suspense>
        } />

        <Route path="/*" element={
          <ProtectedRoute redirectPath="/signin">
            <Suspense fallback={<PageLoader />}>
              <Articles />
            </Suspense>
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  );
}

export default function AppWithRealm() {
  return (
    <ThemeProvider>
      <RealmAppProvider appId={appId}>
        <App />
      </RealmAppProvider>
    </ThemeProvider>
  );
}
