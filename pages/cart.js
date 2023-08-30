import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaNairaSign, IconName } from "react-icons/fa6";


export default function ChekOutPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handlePayment = async () => {

        const url = '/api/paystack_api'

        try {
            const response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, amount: total })
                }
            )
            if (response.ok) {
                const responseData = await response.json();
                console.log('Payment initialization Data:', responseData);
                //handle direction to the authorization url
                const { authorization_url } = responseData.data
                console.log(authorization_url);
                window.location.href = authorization_url
            }

        } catch (error) {
            console.error('Error sending Data:', error)
        }

    }





    // Get the selectedProducts state from the ProductsContext using useContext
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
    // Create a state variable to store the fetched product information
    const [productsInfos, setProductsInfos] = useState([]);

    // Use useEffect to fetch product information when selectedProducts changes
    useEffect(() => {
        // Create an array of unique product IDs by converting selectedProducts to Set and then back to array
        const uniqIds = [...new Set(selectedProducts)];
        // Fetch product information from the API using the unique IDs
        fetch('/api/products?ids=' + uniqIds.join(','))
            .then(response => response.json())
            .then(json => setProductsInfos(json));
    }, [selectedProducts]);

    function addProduct(id) {
        setSelectedProducts(prev => [...prev, id])
    }
    function removeProduct(id) {
        const pos = selectedProducts.indexOf(id)
        if (pos !== -1) {
            const newSelectedProducts =
                setSelectedProducts(prev => {

                    return prev.filter((value, index) => index !== pos)
                })
        }
    }

    const deliveryPrice = 5;
    let subtotal = 0;
    if (selectedProducts?.length) {
        for (let id of selectedProducts) {
            const price = productsInfos.find(p => p._id === id)?.price || 0;
            subtotal += price;
        }
    }

    const total = subtotal + deliveryPrice


    return (
        <Layout>

            {selectedProducts.length === 0 && (
                <div>no products in your shopping cart</div>
            )}

            {productsInfos.length && productsInfos.map(productInfo => {
                const amount = selectedProducts.filter(id => id === productInfo._id).length;
                if (amount === 0) return;
                return (
                    <div className="flex mb-5 items-center" key={productInfo._id}>
                        <div className="bg-gray-100 p-3 rounded-xl shrink-0" style={{ boxShadow: 'inset 1px 0px 10px 10px rgba(0,0,0,0.1)' }}>
                            <img className="w-24" src={productInfo.picture} alt="" />
                        </div>
                        <div className="pl-4 items-center">
                            <h3 className="font-bold text-lg">{productInfo.name}</h3>
                            <p className="text-sm leading-4 text-gray-500">{productInfo.description}</p>
                            <div className="flex mt-1">
                                <div className="grow font-bold flex">
                                    <Image width='24' height='24' src='/naira.png' alt='nairaIcon' />
                                    {productInfo.price}</div>
                                <div>
                                    <button onClick={() => removeProduct(productInfo._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                                    <span className="px-2">
                                        {selectedProducts.filter(id => id === productInfo._id).length}
                                    </span>
                                    <button onClick={() => addProduct(productInfo._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}




            <div className="mt-4">
                <div className="flex my-3">
                    <div className="grow font-bold text-gray-400 flex">Subtotal:</div>
                    <h3 className="font-bold flex">
                        <Image width='24' height='24' src='/naira.png' alt='nairaIcon' />
                        {subtotal}</h3>

                </div>
            </div>
            <div className="flex my-3">
                <div className="grow font-bold text-gray-400">Delivery:</div>
                <h3 className="font-bold flex">
                    <Image width='24' height='24' src='/naira.png' alt='nairaIcon' />

                    {deliveryPrice}</h3>
            </div>
            <div className="flex my-3 border-t-2 pt-3 border-dashed border-emerald-500">
                <div className="grow font-bold text-gray-400">Total:</div>

                <div className="flex my-3">
                    <Image width='24' height='24' src='/naira.png' alt='nairaIcon' />
                    <h3 className="font-bold flex">
                        {total}
                    </h3>
                </div>

            </div>
            <button className="flex px-5 py-2 text-white w-full justify-center my-4 shadow-emerald-400 bg-emerald-500">Order Information</button>





            {/**Order */}
            <div className="mt-4">

                <div className="mb-3 w-full">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                        className='w-full outline-emerald-200'
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        className='w-full outline-emerald-200'
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={handleLocationChange}
                        className='w-full outline-emerald-200'
                        required

                    />
                </div>
            </div>
            <button onClick={handlePayment} className="flex px-5 py-2  text-white w-full justify-center my-4 shadow-emerald-400 bg-emerald-500">Pay
                <FaNairaSign className="mt-1 mr-1 ml-1" />
                {total}</button>




        </Layout>
    );
}
