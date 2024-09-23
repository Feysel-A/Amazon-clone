import React, { useContext, useState } from "react";
import LayOut from "../../Components/Layout/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurencyFormat from "../../Components/CurrencyFormat/CurencyFormat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // step-1 function contact to client secret key
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${totalPrice * 100}`,
      });
      const clientSecret = response.data?.clientSecret;
      // step-2 client side confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);

      // step-3 after confirmation   --->order fire-store database save clear basket

      try {
        await setDoc(
          doc(collection(db, "user"), user.uid, "orders", paymentIntent.id),
          {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          }
        );
        console.log("Order saved successfully!");
        dispatch({ type: Type.EMPTY_BASKET });
        navigate("/orders", { state: { msg: "you have placed new order" } });
      } catch (error) {
        console.error("Error writing document: ", error);
      }
      setProcessing(false);
    } catch (error) {
      setProcessing(false);
      console.log(error);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment__header}>Checkout ({totalItem})items</div>
      {/* payment methods */}
      <section className={classes.payment}>
        {/* Addresss */}
        <div className={classes.flex}>
          <h3>Delivery address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1234 react</div>
            <div>Ethiopia Soddo</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} key={item.id} />
            ))}
          </div>
        </div>
        <hr />
        {/* cart form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={paymentHandler}>
                {/* error for card */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* cardElement */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>{" "}
                      <CurencyFormat amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Buy Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
