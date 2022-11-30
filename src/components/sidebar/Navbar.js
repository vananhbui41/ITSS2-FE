import React from "react";
import {BsBook} from 'react-icons/bs'


const Navbar = () => {
  return (
    <>
      <section>
        <div className='bg-sky-700 h-20 w-full flex items-center pl-10 space-x-4'>
            <div>
            <BsBook className='text-white text-4xl'/>
            </div>

            <div>
            <p className='text-white text-3xl'>LaVie</p>
            </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;