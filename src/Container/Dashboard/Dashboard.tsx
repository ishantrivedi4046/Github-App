import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/selector/restApiSelector";
import { Route, useRouteMatch } from "react-router";
import Spinner from "../../antDesign/Spinner";
import { Carousel, Layout, Menu, Typography } from "antd";
import { Vsc } from "../../Config/iconConfig";
import Icon from "@ant-design/icons";
import { routes } from "../../routes/index";
import { NavLink, Switch } from "react-router-dom";
import { SidebarOptions } from "./helper";
import { LoginReducerKeyTypes } from "../../Util/globalConstants";
import { get } from "lodash";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import gitpic1 from "../../assets/img/git1.jpg";
import gitpic2 from "../../assets/img/git2.jpg";
import gitpic3 from "../../assets/img/git3.png";
import gitpic4 from "../../assets/img/git4.jpg";

const { Sider, Header, Content } = Layout;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const dispatch = useDispatch();
  const userDataState = useSelector(getUser);
  const accessToken = useSelector((state: any) =>
    get(state.loginReducer, [LoginReducerKeyTypes.ACCESS_TOKEN], null)
  );
  let { path, url } = useRouteMatch();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("OUTH_TOKEN", accessToken);
      dispatch(
        actionCreator(actions.SET_LOGIN_STATE, {
          [LoginReducerKeyTypes.ACCESS_TOKEN]: undefined,
        })
      );
    }
  }, [accessToken, dispatch]);

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
            <Route
              path={path}
              render={(props: any) => (
                <div
                  style={{
                    width: "100%",
                    height: "100vh",
                  }}
                >
                  <Carousel
                    autoplay
                    className="carousal-style"
                    dotPosition="left"
                    dots={{
                      className: "dotStyle",
                    }}
                  >
                    <img alt="gitpic1" src={gitpic1} />
                    <img alt="gitpic2" src={gitpic2} />
                    <img alt="gitpic3" src={gitpic3} />
                    <img alt="gitpic4" src={gitpic4} />
                  </Carousel>
                </div>
              )}
            />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
