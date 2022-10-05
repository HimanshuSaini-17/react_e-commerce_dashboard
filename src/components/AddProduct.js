import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        if( !productName || !price || !category || !company){
            setError(true);
            return false;
        }
        console.log(productName, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))[0].id;
        console.log(userId);
        let result = await fetch('http://localhost:2000/add-product',{
            method: 'post',
            body: JSON.stringify({productName, price, category, company, userId}),
            headers : {
                'Content-Type' : 'application/json',
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        })
        console.log(result);
        result = await result.json();
        console.log(result);
        navigate('/');
    }

  return (
    <div className='addProduct'>
        <h1>Add Product</h1>
        <input type="text" placeholder='Enter product name' value={productName} onChange={(e)=>{setProductName(e.target.value)}} className='inputBox'/>
        {error && !productName && <span className='error'>* Enter product </span>}

        <input type="text" placeholder='Enter product price' value={price} onChange={(e)=>{setPrice(e.target.value)}} className='inputBox'/>
        {error && !price && <span className='error'>* Enter price</span>}

        <input type="text" placeholder='Enter product category' value={category} onChange={(e)=>{setCategory(e.target.value)}} className='inputBox'/>
        {error && !category && <span className='error'>* Enter category</span>}

        <input type="text" placeholder='Enter product company' value={company} onChange={(e)=>{setCompany(e.target.value)}} className='inputBox'/>
        {error && !company && <span className='error'>* Enter company</span>}

        <button className='appButton' onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default AddProduct;
