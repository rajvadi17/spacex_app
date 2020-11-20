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
  cartItems.forEach((obj) => {total = obj.price +total;})

  const handleAdd = (item) => {
    let cartItem = { ...item, cartId: Math.floor(Math.random() * 1000) };
    dispatch(showLoader());

    dispatch(saveCartItems(cartItem));
    dispatch(hideLoader());

    dispatch(showNotification("success", "pizza added to cart!!!"));
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
          avatar={<Avatar src={item.img_url} />}
          title={<a href="https://ant.design">{item.name}</a>}
          description={item.description}
        />
        <br/>
    <div className="item-no">X{cartItems.filter((obj) => obj.id == item.id).length}</div>
    <br/>
        <div className="add-ons"><p>Add-Ons: {item.addOn}</p><p>Toppings: {item.toppings}</p><p>Rs. {item.price}</p></div>
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
