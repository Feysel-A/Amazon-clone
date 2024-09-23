import React from 'react'
import categoryInfos from './categoryInfo'
import CategoryCard from './CategoryCard'
import classes from './category.module.css'
function Category() {
  return (
    <section className={classes.category__container}>
      {
        categoryInfos.map((info,i)=>(
            <CategoryCard {...info} key={i}/>
        ))
      }
    </section>
  )
}

export default Category
