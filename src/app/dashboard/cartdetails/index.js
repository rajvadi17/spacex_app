import React, { useEffect, useState } from "react";
import { List, Avatar  } from 'antd';
import  { useSelector, useDispatch } from 'react-redux';
import './cart.scss';
// import Popup from './popup';


function CardDetails() {
  const cartItems = useSelector((state) => state.commonReducer.cartItems);
  let total = 0;
  cartItems.forEach((obj) => {total = obj.price +total;})
  return (
    <>
    <h2>Cart Details</h2>
  <h3>{!cartItems.length && "No items in cart"}</h3>
    <List
    itemLayout="horizontal"
    bordered
    dataSource={cartItems}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.img_url} />}
          title={<a href="https://ant.design">{item.name}</a>}
          description={item.description}
        />
        <br/>
        <div className="add-ons"><p>Add-Ons: {item.addOn}</p><p>Toppings: {item.toppings}</p><p>Rs. {item.price}</p></div>
        <hr/>
      </List.Item>
      
    )}
  />
   <h3 style={{float: 'right', marginRight: '11%'}}>Total:   {total}</h3>
    </>
  );
}

export default CardDetails;
