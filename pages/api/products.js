import { InitMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function findAllProducts() {
    return Product.find().exec();
}
export default async function handler(req, res) {
    await InitMongoose();
    const { ids } = req.query
    if (ids) {
        const idsArray = ids.split(',');
        //console.log(ids);

        res.json(
            await Product.find({
                '_id': { $in: idsArray }
            }).exec()
        );
    } else {
        res.json(await findAllProducts());
    }
}