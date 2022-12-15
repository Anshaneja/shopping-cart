import React from "react";
import Navbar from "../Components/Navbar";
import data from "../assets/data.json";
import earphoneImg from "../assets/Images/Earphone.png"
import plus from "../assets/icon/plus.png"
import minus from "../assets/icon/minus.png";
import deleteIcon from "../assets/icon/DELETE.png";
import locationIcon from "../assets/icon/LOCATION.png";
import checkIcon from "../assets/icon/check.png";

import { useState } from "react";
import { useEffect } from "react";

const HomePage = () => {
    const [products, setProducts] = useState(data.products);
    const [productCounts, setproductCounts] = useState(initialCount());
    const discounts = data.discount;
    const pincodes = data.pincode;
    const[pincode, setPincode] = useState(0);
    const[subtotal, setSubtotal] = useState(0);
    const[discount, setDiscount] = useState(0);
    const[grandtotal, setGrandtotal] = useState(0);

    //delivery
    const[deliveryPrice, setdeliveryPrice] = useState(0);
    const[cashOnDelivery, setCashOnDelivery] = useState(0);
    const[minDeliveryDate, setMinDeliveryDate] = useState(0);
    const[maxDeliveryDate, setMaxDeliveryDate] = useState(0);
    

    function initialCount(){
        let counts = {};
        for (let i=0; i < products.length ; i++){
            counts[products[i].id] = 0;
        }
        return counts;
    }

    useEffect(()=>{
        let total = 0;
        for (let i=0; i < products.length ; i++){
            total += products[i].price * productCounts[products[i].id];
        }
        setSubtotal(total);
        let amount = total >= discounts.minTotal? discounts.discountPercentage / 100 * total : 0 
        setDiscount( amount);
        setGrandtotal(total - amount + deliveryPrice);

    },[productCounts,products,deliveryPrice])

    function incrementHandler(id){
        let newCounts = {...productCounts}
        console.log(newCounts);
        newCounts[id] = newCounts[id] + 1;
        setproductCounts(newCounts);
    }
    function decrementHandler(id){
        let newCounts = {...productCounts}
        newCounts[id] = newCounts[id] > 0? newCounts[id] - 1 : 0 ;
        setproductCounts(newCounts);
    }
    function deleteHandler(id){
        let newCounts = {...productCounts}
        delete newCounts.id;
        setproductCounts(newCounts);
        let newProducts = products.filter((item)=> item.id!== id)
        setProducts(newProducts);
    }
    function pincodeChangeHandler(){
        console.log(pincode);
        console.log(pincodes[pincode].deliveryPrice);
            setdeliveryPrice(pincodes[pincode].deliveryPrice);
            setCashOnDelivery(pincodes[pincode].cashOnDelivery);
            setMinDeliveryDate(pincodes[pincode].estimatedDays.min);
            setMaxDeliveryDate(pincodes[pincode].estimatedDays.max);
        
    }
    return (
        <>
        <Navbar />
        <div className="pb-16 h-full md:bg-gray-100 ">
            
            <div className="text-lg flex gap-3 p-5 border-b-2 md:border-none ">
                <button className="text-gray-500 md:hidden">{'<'}</button>
                <h1 className="font-bold text-gray-700 md:text-gray-800 md:text-2xl ml-24">Shopping Cart</h1>  
            </div>
            <div className="md:hidden flex w-full flex-col">
                {products.map((item)=> (
                    <div className="flex bg-gray-200 gap-5 rounded py-5 px-2 m-4 ">
                        <div className="w-24 px-3 pt-5  bg-white rounded">
                            <img src={earphoneImg}  className=" w-full h-full" alt="earphone" />
                        </div>
                        <div className="flex flex-col justify-center w-full">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl">{item.name}</h2>
                                <div className="h-4 w-4" onClick={() => deleteHandler(item.id)}>
                                    <img className="h-full w-full" src={deleteIcon} alt="delete" />
                                </div> 
                            </div>
                            <h3 className="text-gray-700 text-sm">{item.desc}</h3>
                            <h3 className="text-gray-700 text-sm">Qty: 1</h3>
                            <div className="flex text-lg justify-between">
                                <span >{item.price} $</span>
                                <div className="flex items-center">
                                    <div className="h-6 w-6" onClick={()=> decrementHandler(item.id)}>
                                        <img className="h-full w-full" src={minus} alt="minus" />
                                    </div>
                                    <span className="bg-white rounded px-2 border-gray-400 border-[1px]">{productCounts[item.id]}</span>
                                    <div className="h-6 w-6" onClick={()=> incrementHandler(item.id)}>
                                        <img className="h-full w-full" src={plus} alt="plus"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden md:flex bg-white flex-col border-[1px] border-gray-300 rounded-lg mx-16 pb-8 pt-4">
                <div className="flex w-full text-gray-600 border-b-[1px] justify-center border-gray-300 px-4">
                    <h4 className="w-[40%] lg:w-[35%]">Product</h4>
                    <h4 className="w-[18%] lg:w-[16%]">Price</h4>
                    <h4 className="w-[18%] lg:w-[15%]">Quantity</h4>
                    <h4 className="w-[18%] lg:w-[15%]">Subtotal</h4>
                    <h4 className="w-[6%] lg:w-[4%]"> </h4>
                </div>
                <div>
                {products.map((item)=>(
                    <div className="flex items-center justify-center">
                        <div className="flex w-[40%] lg:w-[35%] items-center">
                            <div className="w-24 p-5  bg-white rounded">
                                <img src={earphoneImg}  className=" w-full h-full" alt="earphone" />
                            </div>
                            <div>
                                <h5 className="text-xl">{item.name}</h5>
                                <span className="text-gray-700 text-sm">{item.desc}</span>
                            </div>
                        </div>
                        <div className="w-[20%] lg:w-[16%]">
                            <span>{item.price}$</span>
                        </div>
                        <div className="w-[20%] lg:w-[16%]">
                            <div className="flex items-center">
                                <div className="h-6 w-6" onClick={()=> decrementHandler(item.id)}>
                                    <img className="h-full w-full" src={minus} alt="minus" />
                                </div>
                                <span className="bg-white rounded px-2 border-gray-400 border-[1px]">{productCounts[item.id]}</span>
                                <div className="h-6 w-6" onClick={()=> incrementHandler(item.id)}>
                                    <img className="h-full w-full" src={plus} alt="plus"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-[20%] lg:w-[16%]">
                            <span>{item.price * productCounts[item.id]}$</span>
                        </div>
                        <div className="w-[6%] lg:w-[4%]">
                            <div className="h-4 w-4" onClick={() => deleteHandler(item.id)}>
                                <img className="h-full w-full" src={deleteIcon} alt="delete" />
                            </div> 
                        </div> 
                    </div>
                ))}
                </div>
                <div className="flex flex-col md:flex-row w-full">
                    <div className=" flex flex-col md:w-1/2 m-5 p-3 border-[1px] md:border-none border-gray-300 rounded-lg gap-2 ">
                        <h2 className="text-lg font-bold">Delivery Availability</h2>
                        <div className="flex items-center justify-between border-b-[1px] border-gray-700 ">
                            <div className="flex items-center w-full">
                                <div className="h-4 w-4">
                                    <img className="w-full h-full" src={locationIcon} alt="location" />
                                </div>
                                <input value={pincode} onChange={(e)=> setPincode(e.target.value) } className="w-full text-gray-600 text-base"/>
                            </div>
                            <button className="text-primary text-xs font-bold" onClick={() => pincodeChangeHandler()}>CHANGE</button>
                        </div>
                        {pincode!==0  &&(<div className="flex justify-evenly text-base text-gray-600 gap-2">
                            { deliveryPrice===0 && (<div className="flex flex-col items-center">
                                <div className="h-6 w-6">
                                    <img className="w-full h-full" src={checkIcon} alt="check" />
                                </div>
                                <div>Free Delivery</div>
                            </div>)}
                            { cashOnDelivery===true && (<div className="flex flex-col items-center">
                                <div className="h-6 w-6">
                                    <img className="w-full h-full" src={checkIcon} alt="check" />
                                </div>
                                <div>Cash on delivery</div>
                            </div>)}
                            <div className="flex flex-col items-center">
                                <div className="h-6 w-6">
                                    <img className="w-full h-full" src={checkIcon} alt="check" />
                                </div>
                                <div>Estimated delivery time is {minDeliveryDate} - {maxDeliveryDate} </div>
                            </div>
                        </div>)}
                        {/* {pincodeDetails.map((item)=>(
                            
                        ))} */}
                    </div>
                    <div className="m-5 border-[1px] md:border-none md:w-1/2 border-gray-300 rounded-lg">
                        <div className="flex flex-col gap-3 p-3">
                            <h2 className="font-bold text-lg">{`Order Summary (${products.length} items)`}</h2>
                            <div className="flex flex-col gap-2 text-base text-gray-600">
                                <div className="flex justify-between">
                                    <h4 > Subtotal</h4>
                                    <span>{subtotal} $</span>
                                </div>
                                <div className="flex justify-between">
                                    <h4 > Total Discount</h4>
                                    <span>{discount} $</span>
                                </div>
                                <div className="flex justify-between">
                                    <h4 > Shipping</h4>
                                    <span>{deliveryPrice === 0? "Free" : deliveryPrice + '$'} </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-2 py-1 bg-gray-200 flex justify-between">
                            <h3 className="font-bold text-base"> Grand Total</h3>
                            <span>{grandtotal} $</span>
                        </div>
                    </div>
                </div>
            

                <div className=" flex flex-col justify-center items-center md:items-end md:pr-8 gap-3">
                    <button className="bg-primary text-white font-semibold text-sm px-5 py-2 rounded-full">CHECKOUT</button>
                    <button className="text-primary text-xs font-bold">CONTINUE SHOPPING</button>
                </div>
            </div>
            
            <div className="md:hidden flex flex-col md:flex-row w-full">
                <div className=" flex flex-col md:w-1/2 m-5 p-3 border-[1px] md:border-none border-gray-300 rounded-lg gap-2">
                    <h2>Delivery Availability</h2>
                    <div className="flex items-center justify-between border-b-[1px] border-gray-700">
                        <div className="flex items-center w-full">
                            <div className="h-4 w-4">
                                <img className="w-full h-full" src={locationIcon} alt="location" />
                            </div>
                            <input value={pincode} onChange={(e)=> setPincode(e.target.value) } className="w-full text-gray-600 text-sm"/>
                        </div>
                        <button className="text-primary text-xs font-bold" onClick={() => pincodeChangeHandler()}>CHANGE</button>
                    </div>
                    {pincode!==0 &&(<div className="flex justify-evenly text-xs text-gray-600 gap-2">
                        { deliveryPrice===0 && (<div className="flex flex-col items-center">
                            <div className="h-4 w-4">
                                <img className="w-full h-full" src={checkIcon} alt="check" />
                            </div>
                            <div>Free Delivery</div>
                        </div>)}
                        { cashOnDelivery && (<div className="flex flex-col items-center">
                            <div className="h-4 w-4">
                                <img className="w-full h-full" src={checkIcon} alt="check" />
                            </div>
                            <div>Cash on delivery</div>
                        </div>)}
                        <div className="flex flex-col items-center">
                            <div className="h-4 w-4">
                                <img className="w-full h-full" src={checkIcon} alt="check" />
                            </div>
                            <div>Estimated delivery time is {minDeliveryDate} - {maxDeliveryDate} </div>
                        </div>
                    </div>)}
                    {/* {pincodeDetails.map((item)=>(
                        
                    ))} */}
                </div>
                <div className="m-5 border-[1px] md:border-none md:w-1/2 border-gray-300 rounded-lg">
                    <div className="flex flex-col gap-3 p-3">
                        <h2 className="font-bold">{`Order Summary (${products.length} items)`}</h2>
                        <div className="flex flex-col gap-2 text-xs text-gray-600">
                            <div className="flex justify-between">
                                <h4 > Subtotal</h4>
                                <span>{subtotal} $</span>
                            </div>
                            <div className="flex justify-between">
                                <h4 > Total Discount</h4>
                                <span>{discount} $</span>
                            </div>
                            <div className="flex justify-between">
                                <h4 > Shipping</h4>
                                <span>{deliveryPrice === 0? "Free" : deliveryPrice + '$'} </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-2 py-1 bg-gray-200 flex justify-between">
                        <h3 className="font-bold text-sm"> Grand Total</h3>
                        <span>{grandtotal} $</span>
                    </div>
                </div>
            </div>
            

            <div className=" md:hidden flex flex-col justify-center items-center md:items-end md:pr-8 gap-3">
                <button className="bg-primary text-white font-semibold text-sm px-5 py-2 rounded-full">CHECKOUT</button>
                <button className="text-primary text-xs font-bold">CONTINUE SHOPPING</button>
            </div>
        
        </div>
        </>
    )
}
export default HomePage;