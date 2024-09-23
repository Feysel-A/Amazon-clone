import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Classes from './Carousel.module.css'
import { img } from "./img/data";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((singelImage,i)=>(
          <img src={singelImage} key={i}/>
        ))}
      </Carousel>
      <div className={Classes.hero__img}></div>
    </div>
  );
}

export default CarouselEffect;
