import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SiderMenu from './components/SiderMenu/SiderMenu';
import { OrganizationsProvider } from './contexts/OrganizationsContext';
import { PointsProvider } from './contexts/PointsContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LoginPage from './pages/LoginPage';
import OrganizationPage from './pages/OrganizationPage';
import ProductsPage from './pages/ProductsPage';
import PointsPage from './pages/PointsPage';
import KekPage from './pages/KekPage';
import AboutPage from './pages/AboutPage';
import AboutPageHeader from './pages/AboutPageHeader';
import { MainSiderProvider } from './contexts/MainSiderContext';

import localStorageService from './LocalStorageService';

const App = () => {
  return (
    <OrganizationsProvider>
      <PointsProvider>
        <MainSiderProvider>
          <BrowserRouter>
            <Layout
              style={{
                minHeight: '100vh',
              }}
            >
              {/*Menu*/}
              <Switch>
                <Route path={'/login'} component={null} />
                <Route path={'/'} component={SiderMenu} />
              </Switch>
              <Layout className="site-layout">
                {/*Header*/}
                <Switch>
                  <Route path={'/login'} component={null} />
                  <Route path={'/'} component={Header} />
                </Switch>
                {/*PageHeader*/}
                <Switch>
                  <Route path={'/about'} component={AboutPageHeader} />
                </Switch>
                {/*Content*/}
                <Route path={'/about'} component={AboutPage} />
                <Switch>
                  <Route path={'/org/:orgId/points'} component={PointsPage} />
                  <Route
                    path={'/org/:orgId/products'}
                    component={ProductsPage}
                  />
                  <Route path={'/org'} component={OrganizationPage} />
                  {/*======================*/}
                  {/*TODO приватный роут не в свиче все ломает*/}
                  <PrivateRoute path={'/users'}>
                    <div>users</div>
                  </PrivateRoute>
                  <Route path={'/qwe'} component={KekPage} />
                  <Route path={'/login'} component={LoginPage} />
                  <Route path="/" exact>
                    <div>home</div>
                    <AuthButton />
                  </Route>
                  {/*======================*/}
                </Switch>
                {/*Footer*/}
                <Switch>
                  {/*<Route path={'/login'} component={null} />*/}
                  <Route path={'/'} component={Footer} />
                </Switch>
              </Layout>
            </Layout>
          </BrowserRouter>
        </MainSiderProvider>
      </PointsProvider>
    </OrganizationsProvider>
  );
};

const AuthButton = () => {
  let history = useHistory();

  return localStorageService.getAccessToken() ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          localStorageService.clearToken();
          history.push('/');
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
};

export default App;
