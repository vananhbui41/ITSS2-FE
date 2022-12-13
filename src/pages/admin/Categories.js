import React from 'react';
import { Helmet } from 'react-helmet-async';
import CategoriesData from './data/CategoriesData';



// import {CategoriesData} from ''

function Categories() {
  return (
        <>
          <Helmet>
            <title> Categories - Words | Lavie </title>
          </Helmet>
          <section>
            <CategoriesData />
          </section>
        </>
  );
}

export default Categories;