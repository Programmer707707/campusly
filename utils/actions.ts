/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';
import { redirect } from "next/navigation";
import { deleteImage, uploadImage } from './supabase';
import db from "./db";
import { auth, currentUser, User } from "@clerk/nextjs/server";
import { imageSchema, productSchema, reviewSchema, validateWithZodSchema } from "./schema";
import { revalidatePath } from "next/cache";
import {Resend} from 'resend';
import {z} from 'zod';
const resend = new Resend(process.env.RESEND_API_KEY);



//getting user 
export const getAuthUser = async() => {
    const user = await currentUser();
    if(!user) redirect('/');
    return user;
}


//checking whether the user is admin or not
const getAdminUser = async() =>{
    const user = await getAuthUser();
    if(user.id !== process.env.ADMIN_USER_ID) redirect('/');
    return user;
}

//error rendering
const renderError = (error: unknown) : {message: string} => {
    console.log(error);
    return {message: error instanceof Error? error.message : 'an error happened',};
}

//fetching featured products from a database
export const fetchFeaturedProducts = async () => {
    const products = await db.product.findMany({
        where: {
            featured: true,
        },
    });
    return products;
}



//fetching all products from a database according to our requests
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


//Creating a product. First i am getting details from the form and validating with zod and sending create request to db
export const createProductAction = async(prevState: any, formData:FormData): Promise<{message: string}>=>{
    const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/admin/products');
}

//This is for to fetch all products from database
export const fetchAdminProducts= async() =>{
    await getAdminUser();
    const products = db.product.findMany({
        orderBy:{
            createdAt:'desc',
        },
    });
    return products;
}

// Fetching specific user's products 
export const fetchUserProducts= async() =>{
    //await getAdminUser();
    const user = await getAuthUser();
    const products = db.product.findMany({
        orderBy:{
            createdAt:'desc',
        },
        where:{
            clerkId: user.id,
        }
    });
    return products;
}


export const deleteProductAction = async(prevState: {productId: string}) =>{
    const {productId} = prevState;
    await getAdminUser();
    //db.product is built-in method and delete is belong to crud operation
    try{
        const product = await db.product.delete({
            where:{
                id: productId,
            },
        });

        //there is a full path on the product.image
        await deleteImage(product.image);
        //after deleting user will be redirected to products page
        revalidatePath('/admin/products');
        //this is a toast message
        return {message: 'product removed'};
    }
    catch(error){
        return renderError(error);
    }
}


//Fetching one product according to productId
export const fetchAdminProductDetails = async(productId: string) =>{
    await getAdminUser();
    const product = await db.product.findUnique({
        where: {
            id: productId,
        },
    });
    if(!product) redirect('/admin/products');
    return product;
}

//the prevState is for the bind method that we don't create new function but we are creating an action
export const updateProductAction = async(prevState: any, formData: FormData)=>{
    await getAdminUser();
    try{
        const productId = formData.get('id') as string;
        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(productSchema, rawData);

        await db.product.update({
            where:{
                id: productId,
            },
            data: {
                ...validatedFields,
            },
        });
        revalidatePath(`/admin/products`);
        return {message: "Product updated successfully"};
    }
    catch(error){
        return renderError(error);
    }
}

export const updateProductImageAction = async(prevState: any, formData: FormData)=>{
    await getAdminUser();
    try{
        const image = formData.get('image') as File;
        const productId = formData.get('id') as string;
        const oldImageUrl = formData.get('url') as string;

        const validatedFile = validateWithZodSchema(imageSchema, {image});
        const fullPath = await uploadImage(validatedFile.image);
        await deleteImage(oldImageUrl);
        await db.product.update({
            where:{
                id: productId,
            },
            data: {
                image: fullPath,
            }
        })

        revalidatePath(`/admin/products`);
        return {message: "Image updated successfully"};
    }
    catch(error){
        return renderError(error);
    }
}




export const sendMessage = async (prevState: {message: string}, formData: FormData) => {
    const scheme = z.object({
        name: z.string().min(1),
        university: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(1),
    })

    const parse = scheme.safeParse({
        name: formData.get('name'),
        university: formData.get('university'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if(!parse.success){
        return{
            message: 'Failed to send message',
        };
    }

    const {name, university, email, message} = parse.data;

    try{
        await resend.emails.send({
            from: `${university} <onboarding@resend.dev>`,
            to: 'toxirovsherzod707@gmail.com',
            subject: `New message from ${name}`,
            html: `<p>${email}:<br/><br/>${message} </p>`,
        })

        return {
            message: 'Message sent successfully'
        }
    }
    catch(e){
        return {
            message: 'Something went wrong',
        }
    }
}


//*******************/
// REVIEWS AND RATING
//*******************/

// creating a review 
export const createReviewAction = async(prevState: any, formData: FormData)=>{
    const user = await getAuthUser();
    try{
        const rawData = Object.fromEntries(formData); //to get the values from form
        const validatedFields = validateWithZodSchema(reviewSchema, rawData);

        await db.review.create({
            data:{
                ...validatedFields,
                clerkId: user.id,
            }
        })
        revalidatePath(`/products/${validatedFields.productId}`);
        return {message: "Review Submitted Successfully"}
    }
    catch(error){
        return renderError(error);
    }
}



//fetching the review
export const fetchProductReviews = async(productId:string) =>{
    const reviews = await db.review.findMany({
        where:{
            productId,
        },
        orderBy:{
            createdAt: 'desc',
        }
    })
    return reviews;
}


export const fetchProductReviewsByUser = async() =>{}


export const deleteReviewAction = async() =>{}


export const findExistingReview = async() =>{}


// Here I am fetching product rating 
export const fetchProductRating = async (productId: string) => {
    const result = await db.review.groupBy({
      by: ['productId'],
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
      where: { productId },
    });
    return {
      rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
      count: result[0]?._count.rating ?? 0,
    };
  };
  


// Add to cart part

export const fetchCartItems = async () => {
    const {userId} = auth();
    const cart = await db.cart.findFirst({
        where: {
            clerkId: userId?? '',
        },
        select:{
            numItemsInCart: true,
        }
    });
    return cart?.numItemsInCart || 0;
}

const fetchProduct = async () => {};

export const fetchOrCreateCart = async () => {};

const updateOrCreateCartItem = async () => {};

export const updateCart = async () => {};

export const addToCartAction = async () => {};

export const removeCartItemAction = async () => {};

export const updateCartItemAction = async () => {};




