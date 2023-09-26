import Image from "next/image";
import Link from "next/link";
import { useContext } from "react"
import { ProductsContext } from "./ProductsContext";

export default function Product({ _id, productName, productPrice, productDescription, cloudinaryImageURL,productCategory }) {
    const { setSelectedProducts } = useContext(ProductsContext);
    function addProduct() {
        setSelectedProducts(prev => [...prev, _id]);
    }
    return (
        <div className='w-56'>
            <div className='bg-blue-100 p-5 rounded-xl '>
                <Image
                    src={cloudinaryImageURL}
                    width={200}
                    height={400}
                    // layout='responsive'
                    alt=''
                />
            </div>
            <div className='mt-2'>
                <h3 className='font-bold text-lg mt-1'>{productName}</h3>
            </div>
            <p className='text-sm mt-1 leading-4'>{productDescription.slice(0, 50)}
                <Link href={`/details/${_id}`} className='text-emerald-500' > See more...</Link>

            </p>
            <div className='flex mt-1'>
                <div className='flex text-2xl font-bold grow'> <Image width='24' height='24' src='/naira.png' alt='naira' />{productPrice}</div>
                <button onClick={addProduct} className='bg-emerald-400 text-white py-1 px-3 rounded-xl'>add to Cart</button>
            </div>
        </div>
    )
}