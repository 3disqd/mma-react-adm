import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SiderMenu from './components/SiderMenu/SiderMenu';
import { UserProvider } from './contexts/UserContext';
import { OrganizationsProvider } from './contexts/OrganizationsContext';
import { PointsProvider } from './contexts/PointsContext';
import { MainSiderProvider } from './contexts/MainSiderContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LoginPage from './pages/LoginPage';
import OrganizationPage from './pages/OrganizationPage';
import ProductsPage from './pages/ProductsPage';
import PointsPage from './pages/PointsPage';
import KekPage from './pages/KekPage';
import AboutPage from './pages/AboutPage';
import AboutPageHeader from './pages/AboutPageHeader';
import RegistrationPage from './pages/RegistrationPage';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <OrganizationsProvider>
          <PointsProvider>
            <MainSiderProvider>
              <Layout
                style={{
                  minHeight: '100vh',
                }}
              >
                {/*Menu*/}
                <Switch>
                  <Route path={'/reg'} component={null} />
                  <Route path={'/login'} component={null} />
                  <PrivateRoute path={'/'} component={SiderMenu} />
                </Switch>
                <Layout className="site-layout">
                  {/*Header*/}
                  <Switch>
                    <Route path={'/reg'} component={null} />
                    <Route path={'/login'} component={null} />
                    <PrivateRoute path={'/'} component={Header} />
                  </Switch>
                  {/*PageHeader*/}
                  <Switch>
                    <PrivateRoute path={'/about'} component={AboutPageHeader} />
                  </Switch>
                  {/*Content*/}
                  <Switch>
                    <PrivateRoute path={'/about'} component={AboutPage} />
                    <PrivateRoute
                      path={'/org/:orgId/points'}
                      component={PointsPage}
                    />
                    <PrivateRoute
                      path={'/org/:orgId/products'}
                      component={ProductsPage}
                    />
                    <PrivateRoute path={'/org'} exact component={OrganizationPage} />
                    <PrivateRoute path={'/users'} component={KekPage} />

                    {/*======================*/}
                    {/*TODO приватный роут не в свиче все ломает*/}

                    <Route path={'/reg'} component={RegistrationPage} />
                    <Route path={'/login'} component={LoginPage} />
                    <Route path="/" exact>
                      <div>home</div>
                    </Route>
                    {/*======================*/}
                    <Route path="/">
                      <div>404</div>
                    </Route>
                  </Switch>
                  {/*Footer*/}
                  <Switch>
                    <Route path={'/'} component={Footer} />
                  </Switch>
                </Layout>
              </Layout>
            </MainSiderProvider>
          </PointsProvider>
        </OrganizationsProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
