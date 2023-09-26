import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    cloudinaryImageURL: String,
    productName: String,
    productDescription: String,
    productPrice: Number,
    productCategory: String,
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;