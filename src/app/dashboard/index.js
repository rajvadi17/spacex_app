import React, { lazy, useEffect } from "react";
import { Route, useRouteMatch, Switch, Redirect, useHistory } from "react-router-dom";
import { Layout } from "antd";
import HeaderBar from "../../components/Header";
import SuspenseWrapper from "../../components/SuspenseWrapper";
import BreadCrumbWrapper from "../../components/BreadCrumbWrapper";
import "./dashboard.scss";

// DASHBOARD ROUTE COMPONENTS
const Home = lazy(() => import("./home"));

const Cart = lazy(() => import("./cartdetails"));

const { Content } = Layout;

const Dashboard = () => {
  const match = useRouteMatch();
  const history = useHistory();
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {/* <Sidebar /> */}
        <Layout>
          <HeaderBar />
          <Content>
            <BreadCrumbWrapper />
            <SuspenseWrapper>
              <Switch>
                <Route key="home" path={`${match.url}/home`} >
                  <Home />
                </Route>
                <Route key="cart" path={`${match.url}/cart`} >
                  <Cart />
                </Route>
                <Route key="redirect">
                  <Redirect to={`${match.url}/login`} />
                </Route>
              </Switch>
            </SuspenseWrapper>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
