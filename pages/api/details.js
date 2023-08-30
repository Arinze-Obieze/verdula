import { InitMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function handler(req, res) {
    await InitMongoose();

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Invalid request: Missing product ID' });
    }

    try {
        const product = await Product.findById(id).exec();

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
