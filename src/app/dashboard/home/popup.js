import { Popover, Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveCartItems,
  showNotification,
  showLoader,
  hideLoader,
  pizzaList,
  selectedPizzaList,
} from "../../../duck/actions/commonActions";

const { Option } = Select;
function Popup(props) {
  //   state = {
  //     visible: false,
  //   };
  const dispatch = useDispatch();
//   const pizzaItems = useSelector((state) => state.commonReducer.pizzaList);
  const [addOn, setAddOn] = useState("small");
  const [toppings, setToppings] = useState([]);
  const selectedItems = useSelector(
    (state) => state.commonReducer.selectedItems
  );
  const item = selectedItems.filter((obj) => {
    return obj.id == props.item.id;
  })[0];
  const [visible, setVisible] = useState(item.isPopUp);

   useEffect(()=>{
       setVisible(item.isPopUp);
   }, [item.isPopUp])
  const hide = () => {
    // this.setState({
    //   visible: false,
    // });
    dispatch(selectedPizzaList(selectedItems.map((obj) => {
        if(obj.isPopUp == item.isPopUp){
            obj.isPopUp = false;
            return obj;
        } else {
            return obj;
        }
        
    })))
    setVisible(false);
    // dispatch(isPopUp(true));
  };

  const handleVisibleChange = (visible) => {
    // this.setState({ visible });
    dispatch(selectedPizzaList(selectedItems.map((obj) => {
        if(obj.isPopUp == item.isPopUp){
            obj.isPopUp = false;
            return obj;
        } else {
            return obj;
        }
        
    })))
    setVisible(visible);
    // dispatch(isPopUp(true));
  };

  const AddToCart = () => {
    let cartItem = { ...item, addOn, toppings, cartId: Math.floor(Math.random() * 1000) };
    dispatch(showLoader());

    dispatch(saveCartItems(cartItem));
    dispatch(hideLoader());

    dispatch(showNotification("success", "pizza added to cart"));
  };
  console.log("item", item);
  return (
    <Popover
      content={
        <div>
          <p>Select Size: </p>
          <Select
            defaultValue="small"
            style={{ width: 150 }}
            onChange={(val) => setAddOn(val)}
            allowClear
          >
            {/* <Option value="small">Small</Option>
        <Option value="medium">Medium</Option> */}
            {item.size[0].items.map((obj) => {
              return (
                <Option key={obj.size} value={obj.size}>
                  {obj.size}
                </Option>
              );
            })}
          </Select>
          <br />
          <p>Select Topping(s): </p>
          <Select
            mode="multiple"
            style={{ width: 150 }}
            onChange={(val) => setToppings(val)}
            allowClear
          >
            {/* <Option value="small">Small</Option>
        <Option value="medium">Medium</Option> */}
            {item.toppings[0].items.map((obj) => {
              return (
                <Option key={obj.name} value={obj.name}>
                  {obj.name}
                </Option>
              );
            })}
          </Select>
          <br />
          <a style={{ padding: "5px" }} onClick={AddToCart}>
            Add
          </a>
          <a style={{ padding: "5px" }} onClick={hide}>
            Close
          </a>
        </div>
      }
      title="Add-Ons and Toppings"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      {/* <Button type="primary">Click me</Button> */}
    </Popover>
  );
}

export default Popup;
