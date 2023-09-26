import { useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";

const Order = ({ total }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        console.log("Total prop changed:", total);
    }, [total]);

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
            
            console.log( response,total, email)
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
    // console.log(total)
    return (
        <>
            {/**Order */}
            <div className="mt-1">
                <button
                    className="flex px-5 py-2 text-white w-full justify-center mb-4 shadow-emerald-400 bg-emerald-500"
                >Fill in your information</button>
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


        </>
    );
}

export default Order;