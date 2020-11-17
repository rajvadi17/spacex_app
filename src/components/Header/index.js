import React from "react";
import { Layout, Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../duck/actions/commonActions";
import hamburgerIcon from "../../assets/icons/hamburger.svg";
import "./style.scss";
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
          <img src={hamburgerIcon} alt="menu" />
        </Button>
        
      </div>
      <div className="heading" >
      <h1>Local Pizza Store</h1>
      </div>
    </Header>
  );
};

export default HeaderBar;
