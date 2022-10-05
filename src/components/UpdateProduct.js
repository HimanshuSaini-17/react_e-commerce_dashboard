import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetail();
    },[]);
    
    const getProductDetail = async () => {
        // params = JSON.parse(params);
        // console.log("params = ", params);
        const id = +(params.id)
        // console.log('id=',typeof id);
        let result = await fetch(`http://localhost:2000/product/${id}`, {
            method: 'Get',
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        // console.log('result=',result);
        setProductName(result[0].productName);
        setPrice(result[0].price);
        setCategory(result[0].category);
        setCompany(result[0].company);
    }
    
    const updateProduct = async () => {
        // console.log(productName, price, category, company);
        const id = +(params.id);
        console.log(id);
        let result = await fetch(`http://localhost:2000/product/${id}`,{
            method: 'Put',
            body: JSON.stringify({productName, price, category, company}),
            headers: {
                authorization:JSON.parse(localStorage.getItem('token')),
                'Content-Type': 'application/json',
            }
        });
        console.log(productName, price, category, company);
        result = await result.json();
        console.log(result);
        navigate('/');
    }



  return (
    <div className='addProduct'>
        <h1>Update Product</h1>
        <input type="text" placeholder='Enter product name' value={productName} onChange={(e)=>{setProductName(e.target.value)}} className='inputBox'/>

        <input type="text" placeholder='Enter product price' value={price} onChange={(e)=>{setPrice(e.target.value)}} className='inputBox'/>

        <input type="text" placeholder='Enter product category' value={category} onChange={(e)=>{setCategory(e.target.value)}} className='inputBox'/>

        <input type="text" placeholder='Enter product company' value={company} onChange={(e)=>{setCompany(e.target.value)}} className='inputBox'/>

        <button className='appButton' onClick={updateProduct}>Update Product</button>
    </div>
  )
}

export default UpdateProduct
