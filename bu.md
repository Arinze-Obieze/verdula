import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import { useContext, useEffect, useState } from "react";

export default function ChekOutPage() {
    const { selectedProducts } = useContext(ProductsContext);
    const [productsInfo, setProductsInfo] = useState([])
    useEffect(() => {
        const uniqIds = [new Set(selectedProducts)];
        fetch('/api/products?ids='+uniqIds.join(','))
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => setProductsInfo(json))
            .catch(error => console.error('Error fetching products:', error));

    }, [selectedProducts])
    return (
        <Layout>
            {selectedProducts.join(',')}
            checkout
        </Layout>
    )

}