import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavPage from "./NavPage";
import Sidebar from './Sidebar';
import './index.css';

const MainPage = () => {
  return (
    <div style={{height: '100%'}}>
      {/* heading section */}
      <section>
        <div>
          <Navbar />
        </div>
      </section>

      {/* sidebar section */}
      <section style={{height: '100%'}}>
        <div 
        style={{height: '100%'}}
        className='grid grid-cols-12'>
          <div className='col-span-3 bg-sky-600 h-screen pt-9 md:col-span-2'>
              <Sidebar/>
          </div>


          <div 
          className='box-container col-span-9 bg-indigo-100 h-screen pl-2 md:col-span-10'>
              <NavPage/>
              <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;