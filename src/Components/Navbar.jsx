import React from 'react';
import searchIcon from "../assets/icon/search.png";
import userIcon from "../assets/icon/user.png";
import shoppingIcon from "../assets/icon/shopping.png";
function Navbar(props) {
    return (
        <header>
            <nav className='flex justify-between px-4 md:px-12 lg:px-32 bg-primary text-white py-2'>
                <div className='font-bold text-xl'>
                    TEST
                </div>
                <div className='flex gap-2' >
                    <button className='hidden md:block text-sm'>Track Order</button>
                    
                    <div className=' h-8 w-8 md:border-l-[1px] '>
                        <img className='w-full h-full ml-1' src={searchIcon} alt="search" />
                    </div>
                    
                    <div className=' h-8 w-8 border-l-[1px] '>
                        <img className='w-full h-full ml-1' src={userIcon} alt="user" />
                    </div>
                    
                    <div className=' h-8 w-8 border-l-[1px]'>
                        <img className='w-full h-full ml-1' src={shoppingIcon} alt="shopping cart" />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;