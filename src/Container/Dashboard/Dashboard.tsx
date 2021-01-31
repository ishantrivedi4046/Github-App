import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selector/restApiSelector";
import { Route, useRouteMatch } from "react-router";
import Spinner from "../../antDesign/Spinner";
import { Layout, Menu, Typography } from "antd";
import { Vsc } from "../../Config/iconConfig";
import Icon from "@ant-design/icons";
import { routes } from "../../routes/index";
import { NavLink, Switch } from "react-router-dom";
import { SidebarOptions } from "./helper";

const { Sider, Header, Content } = Layout;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const userDataState = useSelector(getUser);
  let { path, url } = useRouteMatch();

  useEffect(() => {
    if (loading) {
      if (userDataState) {
        setLoading(false);
      }
    }
  }, [loading, userDataState]);

  return loading ? (
    <Spinner size="large" tip="Getting Everything Ready..." />
  ) : (
    <Layout>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapse}
        onCollapse={(curState) => setCollapse(curState)}
        className="sider-styles"
        breakpoint="md"
      >
        <div className="sider-logo">
          <Icon component={Vsc.VscGithub} />
        </div>
        <Menu theme="dark" mode="inline" className="sider-menu">
          {SidebarOptions.map((item: any, index: number) => (
            <Menu.Item
              key={index}
              icon={
                <Icon
                  component={item.icon}
                  style={{ color: "white", marginRight: "1rem" }}
                />
              }
            >
              {item.desc === "Log Out" ? (
                <NavLink to="/logout">{item.desc}</NavLink>
              ) : (
                <NavLink to={`${url}/${routes[index].path}`}>
                  {item.desc}
                </NavLink>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: collapse ? "8rem" : "20rem",
          transition: "all 200ms ease",
        }}
      >
        <Header className="header-styles">
          <Typography.Title
            level={4}
            style={{
              color: "white",
              marginTop: "1rem",
            }}
          >
            Github App
          </Typography.Title>
        </Header>
        <Content className="layout-content">
          <Switch>
            {routes.map((item: any, index: number) => (
              <Route
                path={`${path}/${item.path}`}
                render={(props: any) => <item.component {...props} />}
                key={index}
              />
            ))}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
