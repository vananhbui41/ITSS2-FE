import React from "react";
import Navbar from "./Navbar";
import NavPage from "./NavPage";
import Sidebar from './Sidebar'

const MainPage = () => {
  return (
    <>
      {/* heading section */}
      <section>
        <div>
          <Navbar />
        </div>
      </section>

      {/* sidebar section */}
      <section>
        <div className='grid grid-cols-12'>
          <div className='col-span-3 bg-sky-600 h-screen pl-2 md:col-span-2'>
              <Sidebar/>
          </div>


          <div className='col-span-9 bg-indigo-100 h-screen pl-2 md:col-span-10'>
              <NavPage/>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;