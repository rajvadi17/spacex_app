import React, { useEffect, useState } from "react";
import {
  List,
  Avatar,
  Card,
  Col,
  Row,
  Switch,
  Select,
  Rate,
  Input,
  Button,
} from "antd";
import {
  showNotification,
  showLoader,
  hideLoader,
} from "../../../duck/actions/commonActions";
import { useSelector, useDispatch } from "react-redux";
import {
  PlusOutlined,
  MinusOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import {
  itemList,
  selectedList,
  removeCartItem,
} from "../../../duck/actions/commonActions";
import * as data from "../../../assets/data.json";
import Popup from "./popup";
import LogOutIcon from "../../../assets/icons/log-off.svg";

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;
function Home() {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("All Products");
  const items = useSelector((state) => state.commonReducer.itemList);
  const selectedItems = useSelector(
    (state) => state.commonReducer.selectedItems
  );
  const cartItems = useSelector((state) => state.commonReducer.cartItems);
  const [sortOrder, setSortOrder] = useState("ltoh");
  const [filterTypes, setFilterTypes] = useState([
    { label: "All Products", value: "all", color: true },
    { label: "Tee shirt", value: "T-shirt", color: false },
    { label: "Denim", value: "Denim", color: false },
    { label: "Sweatshirts", value: "sweatshirt", color: false },
    { label: "Polo Tee Shirt", value: "polo", color: false },
    { label: "Shirt", value: "shirt", color: false },
  ]);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    
    console.log(data.default);
    let jsonData = data.default;
    jsonData = jsonData.map((obj) => {
      obj["isPopUp"] = false;
      return obj;
    });
    jsonData = jsonData.sort(function (a, b) {
            return a.price - b.price;
          })
      
    dispatch(itemList(jsonData));
    dispatch(selectedList(jsonData));
  }, []);

  const handleTypeChange = (val) => {
    // setPizzaType(checked);
    setFilterType(val.label);
    const _filterTypes = filterTypes.map((obj) => {
      if (obj.value == val.value) {
        obj.color = true;
      } else {
        obj.color = false;
      }
      return obj;
    });
    setFilterTypes(_filterTypes);
    if (val.value == "shirt") {
      dispatch(
        selectedList(
          items.filter((obj) => {
            return val.value == obj.tag;
          })
        )
      );
    } else if (val.value != "all") {
      dispatch(
        selectedList(
          items.filter((obj) => {
            return (
              val.value == obj.tag || obj.name.toLowerCase().includes(val.value)
            );
          })
        )
      );
    } else {
      dispatch(selectedList(items));
    }
    
  };

  const handleSortChange = (val) => {
    setSortOrder(val);
    val == "ltoh" ? dispatch(
        itemList(
          selectedItems.sort(function (a, b) {
            return a.price - b.price;
          })
        )
      ):
      dispatch(
        selectedList(
          selectedItems.sort(function (a, b) {
            return b.price - a.price;
          })
        )
      );
   
  };

  const handleAdd = (item) => {
    let _items = items.map((obj) => {
      if (item.id == obj.id) {
        obj.isPopUp = true;
        return obj;
      } else {
        return obj;
      }
    });
    let _selectedItems = selectedItems.map((obj) => {
      if (item.id == obj.id) {
        obj.isPopUp = true;
        return obj;
      } else {
        return obj;
      }
    });
    dispatch(itemList(_items));
    dispatch(selectedList(_selectedItems));
  };

  const handleRemove = (item) => {
    dispatch(removeCartItem(cartItems.filter((obj) => item.id == obj.id)[0]));
    dispatch(showLoader());
    dispatch(showNotification("warning", "Item removed from cart"));
    dispatch(hideLoader());
  };

  const onSearch = (event) => {
    const _selectedItems = items.filter((obj) => {
      if (obj.name.includes(event.target.value)) {
        return true;
      }
    });
    dispatch(selectedList(_selectedItems));
  };

 
  return (
    <>
    <Row gutter={[16, 16]}>
  <h2 style={{marginTop: '1.2%',marginLeft: '0.5%'}}><b>{filterType}</b>{"  (" + selectedItems.length + " Products)" }</h2>
    </Row>
      <Row gutter={[24, 16]}>
      <h3 style={{marginTop: '1.2%',marginLeft: '0.5%'}}><b>FILTERS:{" "}</b></h3>
        <Col span={18}>
          
          {filterTypes.map((obj) => {
            return (
              <Button
                size="large"
                type={obj.color ? "primary" : "default"}
                className="filter-btn"
                onClick={() => handleTypeChange(obj)}
              >
                {obj.label}
              </Button>
            );
          })}
        </Col>
        {/* <Col span={2}>
          <Search
            placeholder="input search text"
            allowClear
            onChange={onSearch}
          />
,    margin-left: 0.5%;        </Col> */}
        <Col span={4}>
          <Select
            defaultValue="Sort By: Price Low to High"
            className="sort-select"
            style={{ width: 250 }}
            onChange={(val) => handleSortChange(val)}
          >
            <Option value="ltoh">Sort By: Low to High</Option>
            <Option value="htol">Sort By: High to Low</Option>
          </Select>
          {/* <h4 style={{ float: "right", fontSize: "15px" }}>SortBy</h4>
          {sortOrder == "asc" && (
            <SortDescendingOutlined
              className="ascending-icon"
              // onClick={() => handleSortOrder("dsc")}
            />
          )}
          {sortOrder == "dsc" && (
            <SortAscendingOutlined
              className="ascending-icon"
              // onClick={() => handleSortOrder("asc")}
            />
          )} */}
        </Col>
      </Row>
      <Row gutter={[48, 8]}>
        {selectedItems.length ? (
          selectedItems.map((item) => {
            return (
              <Col>
                <Card
                  hoverable
                  actions={[
                    <MinusOutlined onClick={() => handleRemove(item)} />,
                    <PlusOutlined onClick={() => handleAdd(item)} />,
                  ]}
                  hoverable
                  style={{ width: 225 }}
                  cover={
                    <img
                      alt="image"
                      src={item.image_src[0]}
                      style={{ height: "300px", width: "225px" }}
                    />
                  }
                >
                  <Meta title={item.vendor} description={item.name} />
                  {/* <Rate disabled defaultValue={item.rating} value={item.rating} allowHalf={true}/> */}
                  <div>
                  <p>
                    <b>${item.price}  </b>
                    
                      <s>${item.compare_at_price}</s>
                      <span style={{ color: "red" }}>
                        ({Math.round(
                          ((item.compare_at_price - item.price) /
                            item.compare_at_price) *
                            100
                        )}
                        % OFF)
                      </span>
                    </p>
                  </div>
                  {<Popup item={item} />}
                </Card>
              </Col>
            );
          })
        ) : (
          <h2>No items found</h2>
        )}
      </Row>
    </>
  );
}

export default Home;
