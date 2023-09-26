// pages/api/createProduct.js
import { InitMongoose } from "@/lib/mongoose";
import Product from '@/models/Product';

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(403).json({ message: 'Request is not allowed' });
        return;
    }

    try {
        await InitMongoose();
        console.log('Connected to the database');

        // Parse the received data as JSON
        const requestData = req.body

        const {
            cloudinaryImageURL,
            productDescription,
            productName,
            productPrice,
            productCategory,
        } = requestData;

        // Validate that required fields are not empty
        if (!cloudinaryImageURL || !productDescription || !productName || !productPrice || !productCategory) {
            res.status(400).json({ message: "Incomplete data" });
            console.log('data is missing');
        }
        else {
            const product = new Product({
                cloudinaryImageURL,
                productName,
                productDescription,
                productPrice,
                productCategory,
            });

            await product.save();
            console.log('Product created', cloudinaryImageURL, productDescription, productName, productPrice, productCategory)
            res.status(200).json({ message: "Product created successfully" });
        }

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: error.message });
    }
}
