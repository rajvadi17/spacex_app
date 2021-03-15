import React from "react";
import { Layout, Button, Input, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../duck/actions/commonActions";
import hamburgerIcon from "../../assets/icons/hamburger.svg";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/shop-trade.png"
import {
  selectedList,
} from "../../duck/actions/commonActions";
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

  const items = useSelector((state) => state.commonReducer.itemList);

  const onSearch = (event) => {
    const _selectedItems = items.filter((obj) => {
      if (obj.name.includes(event.target.value) || obj.vendor.includes(event.target.value)) {
        return true;
      }
    });
    dispatch(selectedList(_selectedItems));
  };

  return (
    <Header id="header">
      <Row >
        <Col span={18}>
      <div id="hamburger" className="inline">
        <Button onClick={toggleCollapsed}>
        <Link to="/dashboard/home">
          <div className="heading" >
          <h1 style={{ marginLeft: '10px'}}><b>SpaceX Launch Programs</b></h1>
         
          </div>
          </Link>
        </Button>
        
      </div>
      </Col>
      
      </Row>
    </Header>
  );
};

export default HeaderBar;
