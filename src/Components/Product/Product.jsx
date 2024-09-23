import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
function Product() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  //   console.log(product);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products__container}>
          {product.map((singleProduct, i) => (
            <ProductCard product={singleProduct} key={i} 
            renderAdd={true}/>
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
