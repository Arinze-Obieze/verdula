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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" onChange={(event) => setFile(event.target.files[0])} />
                <span>
                    Description
                    <input
                        type="text"
                        name="productDescription"
                        value={productDescription}
                        onChange={(event) => setProductDescription(event.target.value)}
                    />
                </span>
                <span>
                    name
                    <input
                        type="text"
                        name="productName"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                    />
                </span>
                <span>
                    price
                    <input
                        type="number"
                        name="productPrice"
                        value={productPrice}
                        onChange={(event) => setProductPrice(event.target.value)}
                    />
                </span>

                <span>
                    category
                    <input
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
        </div>
    );
};

export default UploadProducts;
