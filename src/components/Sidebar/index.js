import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Menu, Layout } from "antd";
import { useHistory, Link, useLocation } from "react-router-dom";
import { ShoppingCartOutlined }  from '@ant-design/icons';
import AppsIcon from "../../assets/icons/apps.svg";
import LogOutIcon from "../../assets/icons/log-off.svg";

import "./style.scss";
import img from "../../assets/download.png";
// import { userLogout } from '../../api/login';

const MENU = [
  {
    key: "home",
    icon: <img src={AppsIcon} alt="Home" className="anticon" />,
    title: "Home",
    linkTo: "/dashboard/home",
  },{
    key: "cart",
    icon: <ShoppingCartOutlined  style={{float:'right', fontSize: '40px'}}  />,
    title: "Cart Items",
    linkTo: "/dashboard/cart",
  }
];

const LogoutIcon = <img src={LogOutIcon} alt="Logout" className="anticon"/>;

const { Sider } = Layout;

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState("");
  const location = useLocation();
  const history = useHistory();
  const collapsed = useSelector((state) => state.commonReducer.isMenuCollapsed);
  const theme = useSelector((state) => state.commonReducer.theme);

  const Logout = async () => {
    // LOGOUT API NOT WORKING
    // const jwt = localStorage.getItem('user_token');
    // await userLogout(jwt)
      history.push("/");
  };

  const init = useCallback(() => {
    const screen = location.pathname.split("/");
    const key = MENU.filter((item) => {
      return screen.length > 2
        ? screen[2]
            .toLowerCase()
            .includes(item.title.replace(/\s/g, "").toLowerCase())
        : false;
    })[0]?.["key"];
    if (key) {
      setSelectedKey(key);
    }
  }, [location.pathname]);

  useEffect(() => {
    init();
  }, [init, location.pathname]);
  return (
    <Sider collapsed={collapsed} theme={theme} id="sidebar">
      <div >
        <div id="logo-small">
        <img src={img} style={{width: '48px'}} alt="not found"/>
        </div>
        <Menu
          selectedKeys={[selectedKey]}
          mode="inline"
          theme={theme}
        >
          {MENU.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} id={item.key}>
              <Link to={item.linkTo}>{item.title}</Link>
            </Menu.Item>
          ))}
          <Menu.Item
            key={MENU.length + 1}
            icon={LogoutIcon}
            onClick={Logout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;
