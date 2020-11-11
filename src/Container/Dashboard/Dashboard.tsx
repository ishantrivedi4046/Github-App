import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogin, getOuthToken } from "../../redux/selector/loginSelector";
import api from "../../Apiservice/loginSerice";
import { RestData } from "../../classes/RestData";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import { Redirect, Route, useRouteMatch } from "react-router";
import Spinner from "../../antDesign/Spinner";
import { Layout, Menu, Typography } from "antd";
import * as Im from "react-icons/im";
import * as Go from "react-icons/go";
import * as Ri from "react-icons/ri";
import * as Gi from "react-icons/gi";
import * as Vsc from "react-icons/vsc";
import Icon from "@ant-design/icons";
import { routes } from "../../routes/index";
import { NavLink, Switch } from "react-router-dom";

const { Sider, Header, Content } = Layout;
const options = [
  {
    icon: Im.ImProfile,
    desc: "Your Profile",
  },
  {
    icon: Go.GoRepo,
    desc: "Your Repositories",
  },
  {
    icon: Ri.RiNotificationBadgeFill,
    desc: "Your Notifications",
  },
  {
    icon: Go.GoGist,
    desc: "Your Gists",
  },
  {
    icon: Gi.GiShadowFollower,
    desc: "Your Followers",
  },
  {
    icon: Ri.RiUserFollowFill,
    desc: "Your Following",
  },
  {
    icon: Gi.GiHouseKeys,
    desc: "Your SSH Keys",
  },
];

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const dispatch = useDispatch();
  const loggedIn = useSelector(getLogin);
  const token = getOuthToken();
  let { path, url } = useRouteMatch();

  useEffect(() => {
    if (loading) {
      let userData = null;
      api
        .getAuthenticatedUser(token)
        .then((res) => {
          userData = new RestData(res.data);
          localStorage.removeItem("autherization_initiated");
          setLoading(false);
          dispatch(
            actionCreator(actions.SET_DATA, {
              data: userData,
            })
          );
        })
        .catch((error) => {
          dispatch(actionCreator(actions.LOGOUT));
        });
    }
  }, []);

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return loading ? (
    <Spinner size="large" tip="Getting Everything Ready..." />
  ) : (
    <Layout>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapse}
        onCollapse={(curState) => setCollapse(curState)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        breakpoint="md"
      >
        <div className="sider-logo">
          <Icon component={Vsc.VscGithub} />
        </div>
        <Menu theme="dark" mode="inline" className="sider-menu">
          {options.map((item: any, index: number) => (
            <Menu.Item
              key={index}
              icon={
                <Icon
                  component={item.icon}
                  style={{ color: "white", marginRight: "1rem" }}
                />
              }
            >
              <NavLink to={`${url}/${routes[index].path}`}>{item.desc}</NavLink>
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
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "1rem",
          }}
        >
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
            {routes.map((item: any) => (
              <Route
                path={`${path}/${item.path}`}
                render={(props: any) => <item.component {...props} />}
              />
            ))}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
