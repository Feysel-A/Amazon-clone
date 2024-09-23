import React, { useEffect, useState } from "react";
import LayOut from "../../Components/Layout/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/endPoint";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Results.module.css";
import Loader from "../../Components/Loader/Loader";

function Results() {
  const [results, setResults
    
  ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        // console.log(res.data);
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <LayOut>
        {isLoading ? (
          <Loader />
        ) : (
          <section>
            <h1 style={{ padding: "30px" }}>Results</h1>
            <p style={{ padding: "30px" }}>Category/{categoryName}</p>
            <hr />
            <div className={classes.products__container}>
              {results?.map((product, i) => (
                <ProductCard product={product} key={i}
                renderAdd={true} />
              ))}
            </div>
          </section>
        )}
      </LayOut>
    </>
  );
}

export default Results;
