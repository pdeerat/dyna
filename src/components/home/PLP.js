import React, { useEffect } from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { decreaseProductStock, addToBasket, addToBasketItem } from "../../redux";
import PDP from "./PDP";

function PLP(props) { 
  const dispatch = useDispatch();
  const basketList = useSelector(state => state.basket); 
  const products = useSelector(state => state.productList);    
  const item = props.product;   
 
  const decreasingList = (item) => {
    return products.productArray.map( el => {
      if(el.SKU === item.SKU){  
        el.stock -= 1
      } return el
    });
  }

  const handelDispatches = (item) => {
    if(item.stock !== 0) {     
      dispatch(decreaseProductStock(decreasingList(item)));  
      item.purchasedUnits += 1;

      (basketList.unitArray.includes(item)) ?
        dispatch(addToBasketItem(item, item.SKU)) :
        dispatch(addToBasket(item, 1))    

    } else { 
      alert('No stock available.')
    } 
  }  
 
  useEffect(() => {  
    localStorage.setItem("Basket", JSON.stringify(basketList)); 
  }, [ basketList ]);
  
  return (
    <Card className="text-center p-0 mt-4" style={{ width: "100%" }}>
      <Card.Img variant="top" style={imgCard} src={item.img} />
      <Card.Header>{item.name}</Card.Header>
      <Card.Body style={cardBody}>
        <Card.Text>
          We have <b>{item.stock}</b> items of <b>{item.name}</b> in stock for <b>{item.price}kr</b> a piece. 
        </Card.Text>
        <small>{item.comment}</small> 
        <ButtonGroup className="d-flex flex-column mt-4" aria-label="Basic example">
          <Button
            className="font-weight-bold"
            variant="info"
            disabled= {item.stock === 0 ? true : false }
            onClick={() => handelDispatches(item)}
          >
            Buy a {item.name}
          </Button> 
          <PDP info={item}/>
        </ButtonGroup>       
      </Card.Body>
    </Card>
  );
}

const imgCard = {
  height: "200px",
  minWidth: "200px",
  objectFit: "cover"
};

const cardBody = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent:"space-between"
};

export default PLP;
