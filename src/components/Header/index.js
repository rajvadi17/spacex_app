import React from "react";
import { Layout, Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../duck/actions/commonActions";
import hamburgerIcon from "../../assets/icons/hamburger.svg";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/shop-trade.png"
import "./style.scss";
import { ShoppingCartOutlined }  from '@ant-design/icons';
import { useHistory } from "react-router";

const { Header } = Layout;
const { Search } = Input;
const HeaderBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toggleCollapsed = () => {
    dispatch(toggleMenu());
  };

  return (
    <Header id="header">
      <div id="hamburger" className="inline">
        <Button onClick={toggleCollapsed}>
        <Link to="/dashboard/home">
          <img style={{height: '28px',width: '33px'}} src={logo} alt="menu" />
          <div className="heading" >
          <h1 style={{ marginLeft: '10px'}}>Shop Trade</h1>
         
          </div>
          </Link>
        </Button>
        
      </div>
      <div className="heading" >
      <Link to="/dashboard/cart">
      <ShoppingCartOutlined />
      </Link>
      </div>
    </Header>
  );
};

export default HeaderBar;
