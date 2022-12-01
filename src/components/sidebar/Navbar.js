import React from "react";
import {BsBook} from 'react-icons/bs'
import { NavLink } from "react-router-dom";
import { HeaderData } from "../data/HeaderData";

const Navbar = () => {
  const activeLink = 'hover:bg-red-500 mt-7 pl-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold bg-red-500'
  const normalLink = 'hover:bg-red-500 pl-7 mt-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold'    
  return (
    <>
      <section>
        <div className='bg-sky-700 h-20 w-full flex items-center pl-10 space-x-4'>
            <div>
            <BsBook className='text-white text-4xl tex'/>
            </div>

            <div>
            <p className='text-white text-3xl'>LaVie</p>
            </div>

            <div className="w-full items-center flex justify-end pr-8 pb-6 ">
            {
                HeaderData.map((item, index)=>{
                    return(
                        <div key={index}>
                            <NavLink to={item.path}
                            className={({ isActive }) =>
                            isActive ? activeLink: normalLink}
                             >
                            <span>{item.title}</span>
                            <span>{item.icon}</span>
                            </NavLink>
                            
                        </div>
                    )
                })
            }
            </div>
        </div>  
      </section>
    </>
  );
};

export default Navbar;