import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Select,
  Input,
  Button,
} from "antd";
import Loading from '../../../components/Loading';
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
// import Popup from "./popup";
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
  const [launchSuccess, setLaunchSuccess] = useState(false);
  const [launchLanding, setLaunchLanding] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [filterTypes, setFilterTypes] = useState([
    { label: "2006", value: "2006", color: false },
    { label: "2007", value: "2007", color: false },
    { label: "2008", value: "2008", color: false },
    { label: "2009", value: "2009", color: false },
    { label: "2010", value: "2010", color: false },
    { label: "2011", value: "2011", color: false },
    { label: "2012", value: "2012", color: false },
    { label: "2013", value: "2013", color: false },
    { label: "2014", value: "2014", color: false },
    { label: "2015", value: "2015", color: false },
    { label: "2016", value: "2016", color: false },
    { label: "2017", value: "2017", color: false },
    { label: "2018", value: "2018", color: false },
    { label: "2019", value: "2019", color: false },
    { label: "2020", value: "2020", color: false }
  ]);

  useEffect(() => {
    // dispatch(itemList());
    let queryParam ='';
    
    if(launchSuccess == 'True'){
      queryParam = queryParam + '&launch_success=true';
    }else if(launchSuccess == 'False'){
      queryParam = queryParam + '&launch_success=false';
    }
    if(launchLanding == 'True'){
      queryParam = queryParam + '&launch_landing=true';
    } else if(launchLanding == 'False'){
      queryParam = queryParam + '&launch_landing=false';
    }
    if(selectedYear){
      queryParam = queryParam + '&launch_year='+ selectedYear;
      }
      setShowLoader(true);
      dispatch(itemList(queryParam)).then(()=> {
        setShowLoader(false);
      });
    // dispatch(selectedList());
  }, [launchSuccess, launchLanding, selectedYear]);

  const handleQueryParam = (obj) => {
   
    if(obj){
      setSelectedYear(obj.value);
    
    } 
  }


  const handleLandingSuccess = (obj) => {
    console.log(obj);
    
      setLaunchLanding(obj);
    handleQueryParam();
  }

  const handleLaunchSuccess = (obj) => {

      setLaunchSuccess(obj);

    handleQueryParam();
  }

  const handleClearAll = () => {
    setLaunchSuccess('');
    setSelectedYear('');
    setLaunchLanding('');
  }
 
  return (
    <>
    <Row gutter={[16, 16]}>
  <h2 style={{marginTop: '1.2%',marginLeft: '0.5%'}}><b>{filterType}</b>{"  (" + items.length + " Products)" }</h2>
    </Row>
    <div className="flex-container">
      {showLoader&& <Loading show={showLoader}/>}
    <div style={{minWidth: '230px', maxWidth: "230px"}} >
      <h3><b style={{marginTop: '1.2%',marginLeft: '0.5%'}}>Filters:{" "}</b></h3>
      <br/>

      <div style={{flexWrap:'wrap', display: 'flex'}}>

              <div style={{margin: '10px', minWidth: '230px'}}>
              <Button
                size="large"
                className="filter-btn-inactive"
                type={ "default"}
                onClick={() => handleClearAll()}
              >
                Clear All
              </Button>
              </div>
        </div>
      <b style={{marginTop: '1.2%',marginLeft: '0.5%', align: 'center'}}><u>Launch Year:{" "}</u></b>
        <div style={{flexWrap:'wrap', display: 'flex'}}>
          
          {filterTypes.map((obj) => {
            return (
              <div style={{margin: '10px'}}>
              <Button
                size="large"
                className={obj.value == selectedYear ? "filter-btn-active" : "filter-btn-inactive"}
                type={ "default"}
                onClick={() => handleQueryParam(obj)}
              >
                {obj.label}
              </Button>
              </div>
            );
          })}
        </div>
        <b style={{marginTop: '1.2%',marginLeft: '0.5%', align: 'center'}}><u>Successful Launch:{" "}</u></b>
        <div style={{flexWrap:'wrap', display: 'flex'}}>
          
          {["True", "False"].map((obj) => {
            return (
              <div style={{margin: '10px'}}>
              <Button
                size="large"
                className={ launchSuccess == obj ? "filter-btn-active" : "filter-btn-inactive"}
                type={ "default"}
                onClick={() => handleLaunchSuccess(obj)}
              >
                {obj}
              </Button>
              </div>
            );
          })}
        </div>
        <b style={{marginTop: '1.2%',marginLeft: '0.5%', align: 'center'}}><u>Successful Landing:{" "}</u></b>
        <div style={{flexWrap:'wrap', display: 'flex'}}>
          
          {["True", "False"].map((obj) => {
            return (
              <div style={{margin: '10px'}}>
              <Button
                size="large"
                className={launchLanding == obj ? "filter-btn-active" : "filter-btn-inactive"}
                type={ "default"}
                onClick={() => handleLandingSuccess(obj)}
              >
                {obj}
              </Button>
              </div>
            );
          })}
        </div>
        
        
      </div>
      <div style={{flexWrap:'wrap', display: 'flex'}}>
        {items.length ? (
          items.map((item) => {
            return (
              <div style={{margin: '10px'}}>
                <Card
                  hoverable
                  // actions={[
                  //   <MinusOutlined onClick={() => handleRemove(item)} />,
                  //   <PlusOutlined onClick={() => handleAdd(item)} />,
                  // ]}
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="image not found"
                      src={item.links.flickr_images}
                      style={{ height: "300px", width: "240px" }}
                    />
                  }
                >
                  <Meta title={item.mission_name + '  #' + item.flight_number}  />
                  {/* <Rate disabled defaultValue={item.rating} value={item.rating} allowHalf={true}/> */}
                  <div>
                  <p>
                  <b>Machine Ids: </b>{item.mission_id.join(",")  || '-'}  
                  <br/>
                    <b>Launch Year:  </b>{item.launch_year} 
                    <br/>
                      <b>Successful Launch:  </b>{item.launch_success.toString()}
                      <br/>
                      <b>Successful Landing: </b> {item.launch_landing ? item.launch_landing.toString() : '-'}
                      {/* <span style={{ color: "red" }}>
                        ({Math.round(
                          ((item.compare_at_price - item.price) /
                            item.compare_at_price) *
                            100
                        )}
                        % OFF)
                      </span> */}
                    </p>
                  </div>
                  {/* {<Popup item={item} />} */}
                </Card>
              </div>
            );
          })
        ) : (
          <h2>No Data Found</h2>
        )}
      </div>
      </div>
      
    </>
  );
}

export default Home;
