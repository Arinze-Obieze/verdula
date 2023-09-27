import axios from "axios";
import { useState } from "react";

const UploadProducts = () => {
    const [productDescription, setProductDescription] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const uploadPreset = "verdula";
    const OUR_CLOUD_NAME = "dxzw4yiff";

    const handleFileUpload = async () => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${OUR_CLOUD_NAME}/image/upload`;
            const response = await axios.post(cloudinaryUrl, formData);
            const cloudinaryImageURL = response.data.secure_url;
            console.log(cloudinaryImageURL);
            const dataToSend = {
                cloudinaryImageURL,
                productDescription,
                productName,
                productPrice,
                productCategory,
            };

            if (cloudinaryImageURL) {
                console.log('sending to api db');
                axios.post("/api/createProduct", dataToSend)
                    .then(() => {
                        console.log("created", dataToSend);
                        setSuccess(true);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        setLoading(false);
                    });
            }

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleFileUpload();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col   text-center space-y-12'>
                <h1 className="bg-black text-3xl py-4 text-white font-serif">UPLOAD PRODUCTS</h1>
                <span className="flex flex-col border-2 mx-6">
                    <h3>Input Product Image</h3>
                    <input type="file"
                        className="border-2 border-gray-700 mx-4 my-4"
                        name="image" onChange={(event) => setFile(event.target.files[0])} />
                </span>
                <span className="flex flex-col border-2 mx-6">
                    Input Product Description
                    <input
                        className="border-2 border-gray-700 mx-4 my-4"
                        type="text"
                        name="productDescription"
                        value={productDescription}
                        onChange={(event) => setProductDescription(event.target.value)}
                    />
                </span>
                <span className="flex flex-col border-2 mx-6">
                    Input Product Name
                    <input
                        className="border-2 border-gray-700 mx-4 my-4"
                        type="text"
                        name="productName"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                    />
                </span>
                <span className="flex flex-col border-2 mx-6">
                    Input Product Price
                    <input
                        className="border-2 border-gray-700 mx-4 my-4"
                        type="number"
                        name="productPrice"
                        value={productPrice}
                        onChange={(event) => setProductPrice(event.target.value)}
                    />
                </span>

                <span className="flex flex-col border-2 mx-6">
                    Input Product Category
                    <input
                        className="border-2 border-gray-700 mx-4 my-4"
                        type="text"
                        name="productCategory"
                        value={productCategory}
                        onChange={(event) => setProductCategory(event.target.value)}
                    />
                </span>
                <button type="submit" disabled={loading}>Submit</button>
            </form>

            {loading && <p>Creating product...</p>}
            {success && <p>Product created successfully!</p>}
        </>
    );
};

export default UploadProducts;
