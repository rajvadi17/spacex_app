import React, { useEffect, useState } from "react";
import { List, Avatar, Card, Col, Row, Switch, Select, Rate  } from 'antd';
import {
  showNotification,
  showLoader,
  hideLoader,
} from "../../../duck/actions/commonActions";
import  { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined, MinusOutlined }  from '@ant-design/icons';
import {getPizzaList} from '../../../api/login';
import {pizzaList, selectedPizzaList, removeCartItem} from '../../../duck/actions/commonActions';
import Popup from './popup';


const { Meta } = Card;
const { Option } = Select;
function Home() {
  const dispatch = useDispatch();
  const [type, setPizzaType] = useState('Veg');
  const pizzaItems = useSelector((state) => state.commonReducer.pizzaList);
  const selectedItems = useSelector((state) => state.commonReducer.selectedItems);
  const cartItems = useSelector((state) => state.commonReducer.cartItems);
  const [sortType, setSortType] = useState('Price');
  useEffect(() => {
   
  const onFinish = (async () => {
    try {
      dispatch(showLoader());
      let response = await getPizzaList('/ec196a02-aaf4-4c91-8f54-21e72f241b68');
      debugger;
      if(response.length){
        console.log(response);
        response = response.sort(function(a, b) { return a.price - b.price });
        response = response.map((obj) => {
          obj['isPopUp'] = false;
          return obj;
        })
      dispatch(pizzaList(response));
      
      dispatch(selectedPizzaList(response.filter((obj) => {return obj.isVeg})));
      console.log(pizzaItems);
      dispatch(hideLoader());
      } else {
        dispatch(hideLoader());
      dispatch(showNotification("error", "Internal API error"));
      }
    } catch (err) {
      dispatch(hideLoader());
    }
  })();
}, [])

   
    const handleTypeChange = (checked) => {
      setPizzaType(checked);
      if(checked){
        dispatch(selectedPizzaList(pizzaItems.filter((obj) => {return obj.isVeg})));
      } else {
        dispatch(selectedPizzaList(pizzaItems.filter((obj) => {return !obj.isVeg})));
      }
    }
    
    const handleSortChange = (val) => {
      
      setSortType(val);
      if(val == 'Price'){
        dispatch(pizzaList(pizzaItems.sort(function(a, b) { return a.price - b.price })));
        dispatch(selectedPizzaList(selectedItems.sort(function(a, b) { return a.price - b.price })));
      } else {
        dispatch(pizzaList(pizzaItems.sort(function(a, b) { return a.rating - b.rating })));
        dispatch(selectedPizzaList(selectedItems.sort(function(a, b) { return a.rating - b.rating })));
      }
      // if()
    }
  
    const handleAdd = (item) => {
      debugger;
      let _pizzaItems = pizzaItems.map((obj)=> {
        if(item.id == obj.id){
          obj.isPopUp = true;
          return obj;
        } else {
        return obj;
        }
      });
      let _selectedItems = selectedItems.map((obj)=> {
        if(item.id == obj.id){
          obj.isPopUp = true;
          return obj;
        } else {
        return obj;
        }
      });
      dispatch(pizzaList(_pizzaItems));
      dispatch(selectedPizzaList(_selectedItems));
    }

    const handleRemove = (item) => {
      
      dispatch(removeCartItem(cartItems.filter((obj) => item.id == obj.id)[0]));
      dispatch(showLoader());
      dispatch(showNotification("warning", "Item removed from cart"));
      dispatch(hideLoader());
    }

  return (
    <>
    
    <Row gutter={16}>
    <Col span={11}>
    <Switch checkedChildren="Veg" unCheckedChildren="Non-veg" defaultChecked onChange={(checked) => {handleTypeChange(checked)}}/>
    </Col>
    <Col span={11}>
    
    <Select defaultValue="Price" style={{ width: 200, float: 'right' }} onChange={(val) => handleSortChange(val)}>
      <Option value="Price">Price</Option>
      <Option value="Rating">Rating</Option>
      
    </Select>
    <h4 style={{  float: 'right', fontSize: '15px' }}>SortBy</h4>
    </Col>
    </Row>
    <Row gutter={20}>
     {selectedItems.length && selectedItems.map((item) => { 
       return <Col span={8}> 
      
     <Card
     actions = {[<MinusOutlined onClick={() => handleRemove(item)}/>,
     <PlusOutlined onClick={() => handleAdd(item)} />
      ]}
    hoverable
    style={{ width: 370 }}
    cover={<img alt="image" src={item.img_url} style={{height: '200px', width:'370px'}} />}
  >
    <Meta title={item.name} description={item.description} />
    <Rate disabled defaultValue={item.rating} value={item.rating} allowHalf={true}/>
    <p style={{float: 'right'}}>Rs.{item.price}</p>
    {<Popup item={item} />}
  </Card>
  
  </Col>})}
  
  </Row>
  
    </>
  );
}

export default Home;
