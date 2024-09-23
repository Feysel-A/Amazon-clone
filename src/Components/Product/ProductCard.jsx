import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CuurencyFormat from "../CurrencyFormat/CurencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { id, image, title, price, rating, description } = product;
  const [state, dispatch] = useContext(DataContext);
  // console.log(state);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        image,
        title,
        price,
        rating,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card__container} ${flex && classes.product__fixed}`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="no image" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && (
          <div
            style={{
              maxWidth: "700px",
            }}
          >
            {description}
          </div>
        )}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/*rating counter */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CuurencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
