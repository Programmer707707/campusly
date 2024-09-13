import { redirect } from "next/navigation";
import db from "./db";


//fetching featured products from a database
export const fetchFeaturedProducts = async () => {
    const products = await db.product.findMany({
        where: {
            featured: true,
        },
    });
    return products;
}

//fetching all products from a database
export const fetchAllProducts = ({search = ""} = {search: ""}) =>{
    return db.product.findMany({
        where: {
            OR: [
                {name: {contains: search, mode: 'insensitive'}},
                {company: {contains: search, mode: 'insensitive'}}
            ]
        },
        orderBy:{
            createdAt: 'desc',
        },
    });
}



//Fetching single product according to its id
export const fetchSingleProduct = async (productId: string) => {
    const product = await db.product.findUnique({
        where:{
            id: productId,
        },
    });
    if(!product){
        redirect('/products');
    }
    return product;
}