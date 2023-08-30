 {

                !productsInfos.length === 0 ? (
                    <div>no products in your shopping cart</div>)
                    : productsInfos.map(productInfo => (
                        <div className="flex mb-5" key={productInfo._id} >
                            <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                                <img className="w-24" src={productInfo.picture} alt={productInfo.name} />
                            </div>

                            <div className="pl-4">

                                <h3 className="font-bold text-lg">{productInfo.name}</h3>
                                <p className="text-sm leading-4 text-gray-700">{productInfo.description}</p>

                                <div className="flex mt-2">

                                    <div className="flex grow">
                                        <Image width='24' height='24' src='/naira.png' alt='naira' /> {productInfo.price}</div>

                                    <div >
                                        <button onClick={() => removeProduct(productInfo._id)} className="border border-emerald-500 px-2 rounded-xl text-emerald-500">-</button>

                                        <span className="px-2">
                                            {selectedProducts.filter(id => id === productInfo._id).length}
                                        </span>
                                        <button onClick={() => addProduct(productInfo._id)} className="border border-emerald-500 px-2 rounded-xl text-white bg-emerald-500">+</button>


                                    </div>

                                </div>
                            </div>

                        </div>
                    ))
            }