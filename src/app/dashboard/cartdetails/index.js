import React, { useEffect, useState } from "react";
import { List, Avatar, Button } from 'antd';
import  { useSelector, useDispatch } from 'react-redux';
import {
  saveCartItems,
  showNotification,
  showLoader,
  hideLoader,
  pizzaList,
  selectedPizzaList,
  removeCartItem
} from "../../../duck/actions/commonActions";
import './cart.scss';
// import Popup from './popup';


function CardDetails() {
  const cartItems = useSelector((state) => state.commonReducer.cartItems);
  const dispatch = useDispatch();
  let total = 0;
  cartItems.forEach((obj) => {total = parseInt(obj.price) +total;})

  const handleAdd = (item) => {
    let cartItem = { ...item, cartId: Math.floor(Math.random() * 1000) };
    dispatch(showLoader());

    dispatch(saveCartItems(cartItem));
    dispatch(hideLoader());

    dispatch(showNotification("success", "Product added to cart!!!"));
  }

  const handleRemove = (item) => {
      
    dispatch(removeCartItem(cartItems.filter((obj) => item.id == obj.id)[0]));
    dispatch(showLoader());
    dispatch(showNotification("warning", "Item removed from cart"));
    dispatch(hideLoader());
  }
  return (
    <>
    <h2>Cart Details</h2>
  <h3>{!cartItems.length && "No items in cart"}</h3>
    <List
    itemLayout="horizontal"
    bordered
    dataSource={[...new Map(cartItems.map(item =>
      [item['id'], item])).values()]}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.image_src[0]} />}
          title={<b href={"https://"+item.vendor+".in"}>{item.vendor}</b>}
          description={item.name}
        />
        <br/>
    <div className="item-no">X{cartItems.filter((obj) => obj.id == item.id).length}</div>
    <br/>
        <div className="add-ons"><p>Size: {item.addOn}</p><b> ${item.price}</b></div>
        <br/>
        <div><Button onClick={() => handleAdd(item)}>Add</Button></div>
        <div className="remove-item"><Button danger onClick={() => handleRemove(item)}> Remove</Button></div>
        <hr/>
      </List.Item>
      
    )}
  />
   <h3 style={{float: 'right', marginRight: '11%'}}>Total:   {total}</h3>
    </>
  );
}

export default CardDetails;
