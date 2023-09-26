import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Image from 'next/image';

const ProductDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log(id)
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/details?id=${id}`);
                    const data = await response.json();
                    console.log(data);
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            }
        };

        fetchProductDetails();
    }, [id]);




    // Destructuring from product, or using an empty object as default if product is null
    const { productName, productPrice, productDescription, cloudinaryImageURL } = product || {};
    // console.log(product)


    return (
        <div>
            {product ? (
                <>
                    <div className='flex flex-col mt-12  items-center md:flex-row'>
                        <div className='w-64 bg-blue-100 p-5 rounded-xl '>
                            <img src={cloudinaryImageURL} alt='' />
                        </div>
                        <div>
                            <span className='flex mt-2 justify-around'>
                                <h3 className='font-bold text-lg mt-1'>{productName}</h3>
                                <div className='flex text-xl font-bold '> <Image width='24' height='24' src='/naira.png' alt='naira' />{productPrice}</div>
                            </span>
                            <p className='text-sm mt-1  text-gray-900 leading-4 px-5'>{productDescription}</p>
                        </div>

                    </div>

                </>
            ) : (
                <p>Loading...</p>
            )}
            <Footer />
        </div>
    );
};

export default ProductDetailPage;
