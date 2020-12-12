import { Popover, Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveCartItems,
  showNotification,
  showLoader,
  hideLoader,
  pizzaList,
  selectedList,
} from "../../../duck/actions/commonActions";

const { Option } = Select;
function Popup(props) {
  const dispatch = useDispatch();
  const [addOn, setAddOn] = useState("small");
  const [toppings, setSize] = useState([]);
  const selectedItems = useSelector(
    (state) => state.commonReducer.selectedItems
  );
  const item = selectedItems.filter((obj) => {
    return obj.id == props.item.id;
  }).length && selectedItems.filter((obj) => {
    return obj.id == props.item.id;
  })[0];
  const [visible, setVisible] = useState(item.isPopUp);

   useEffect(()=>{
       setVisible(item.isPopUp);
   }, [item.isPopUp])
  const hide = () => {
    dispatch(selectedList(selectedItems.map((obj) => {
        if(obj.isPopUp == item.isPopUp){
            obj.isPopUp = false;
            return obj;
        } else {
            return obj;
        }
        
    })))
    setVisible(false);
  };

  const handleVisibleChange = (visible) => {
    dispatch(selectedList(selectedItems.map((obj) => {
        if(obj.isPopUp == item.isPopUp){
            obj.isPopUp = false;
            return obj;
        } else {
            return obj;
        }
        
    })))
    setVisible(visible);
  };

  const AddToCart = () => {
    let cartItem = { ...item, addOn, toppings, cartId: Math.floor(Math.random() * 1000) };
    dispatch(showLoader());

    dispatch(saveCartItems(cartItem));
    dispatch(hideLoader());

    dispatch(showNotification("success", "Product added to cart!!! Please visit the cart"));
  };

  return (
    <Popover
      content={
        <div>
          <p>Select Size: </p>
          <Select
            defaultValue={item.options.length && item.options[0].value}
            style={{ width: 150 }}
            onChange={(val) => setAddOn(val)}
          >
            {item.options.map((obj) => {
              return (
                <Option key={obj.id} value={obj.value}>
                  {obj.value}
                </Option>
              );
              })
              
            })}
          </Select>
          <br />
          
          <br />
          <a style={{ padding: "5px" }} onClick={AddToCart}>
            Add
          </a>
          <a style={{ padding: "5px" }} onClick={hide}>
            Close
          </a>
        </div>
      }
      title="Add to cart"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
    </Popover>
  );
}

export default Popup;
