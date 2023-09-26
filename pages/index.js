import Head from 'next/head'
import { useState } from 'react'
import Product from '@/components/Product'
import { InitMongoose } from '@/lib/mongoose'
import { findAllProducts } from './api/products'
import Layout from '@/components/Layout'

export default function Home({ products }) {
  // State to manage the search phrase input
  const [phrase, setPhrase] = useState('')

  // Check if products is an array with data before using map
  const categoryNames = Array.isArray(products) ? [...new Set(products.map(p => p.productCategory))] : [];

  // Filter products based on the search phrase
  if (phrase) {
    products = products.filter(p => p.productName.toLowerCase().includes(phrase));
  }

  return (
    <>
      <Head>

      </Head>
      <Layout className='p-5'>
        {/* Search input field */}
        <input value={phrase} onChange={e => setPhrase(e.target.value)} type={'text'} placeholder='Search for products' className='outline-emerald-400 bg-gray-100 w-full py-2 px-2 rounded-xl' />
        <div>
          {/* Loop through category names */}
          {categoryNames.map(categoryName => (
            <div key={categoryName}>
              {/* Check if there are products in the current category */}
              {products.filter(p => p.productCategory === categoryName).length > 0 && (
                <div>
                  {/* Display the category name */}
                  <h2 className='text-2xl py-5 capitalize'>{categoryName}</h2>
                  {/* Display products within the category */}
                  <div className='flex -mx-5 overflow-x-scroll snap-x scrollbar-hide'>
                    {products.filter(p => p.productCategory === categoryName).map(productInfo => (
                      <div key={productInfo._id} className='px-5 snap-start'>
                        <Product {...productInfo} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  // Initialize Mongoose connection
  await InitMongoose()

  // Fetch all products from the database
  const products = await findAllProducts()

  return {
    props: {
      // Parse products to JSON and send as props to Home component
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}
