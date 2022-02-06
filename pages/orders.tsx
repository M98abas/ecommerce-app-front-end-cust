import MainLayout from "../components/MainLayout";
import RouteProtect from "../HOC/RouteProtect";
import Cookies from "js-cookie";
import styles from "../styles/CartPage.module.css";
import { AddNewOrders } from "../api";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../addToCart";
import { useState } from "react";
import { Button, message } from "antd";
import { useRouter } from "next/router";

const Orders = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const [available, setAvialable]: any = useState(
    cart.length == 0 ? true : false
  );
  const Router = useRouter();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator: any, item: any) => accumulator + item.quantity * item.price,
      0
    );
  };

  const handelSend = (e: any) => {
    let amount = cart.length;
    let total_cost = getTotalPrice();
    let cart1 = [];
    setAvialable(true);
    cart.map((val: any) => {
      let obj = { id: val.id, quantity: val.quantity };
      cart1.push(obj);
    });

    e.preventDefault();
    AddNewOrders({ amount, total_cost, cart }, (data: any, error: any) => {
      setAvialable(false);
      if (error) return message.error(error);
      else {
        Cookies.remove("cart");
        message.success("Done");
        Router.reload();
      }
    });
  };

  return (
    <RouteProtect>
      <MainLayout>
        <Button
          size="large"
          className="submit-btn"
          htmlType="submit"
          type="primary"
          onClick={handelSend}
          loading={available}
          disabled={available}
        >
          CheckOut
        </Button>
        {/* <Button type="primary" disabled={available} onClick={handelSend}> */}

        {/* </Button> */}
        <div className={styles.header}>
          <div>Image</div>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Actions</div>
          <div>Total Price</div>
        </div>
        {cart.map((item: any) => (
          <div className={styles.body}>
            <div className={styles.image}>
              <img src={item.image} alt="items" height="90" width="65" />
            </div>
            <p>{item.name}</p>
            <p>$ {item.price}</p>
            <p>{item.quantity}</p>
            <div className={styles.buttons}>
              <button onClick={() => dispatch(incrementQuantity(item.id))}>
                +
              </button>
              <button onClick={() => dispatch(decrementQuantity(item.id))}>
                -
              </button>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                x
              </button>
            </div>
            <p>$ {item.quantity * item.price}</p>
          </div>
        ))}
        <h2>Grand Total: $ {getTotalPrice()}</h2>
      </MainLayout>
    </RouteProtect>
  );
};

export default Orders;
