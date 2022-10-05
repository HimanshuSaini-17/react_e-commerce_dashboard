import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    // let auth = localStorage.getItem('user');
    // console.log(auth);
    let id = JSON.parse(localStorage.getItem('user'))[0].id;
    // console.log('id = ', id);
    let result = await fetch(`http://localhost:2000/products/${id}`,{
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();
    // console.log(result);
    setProduct(result);
  };

  const deleteProduct = async (id) => {
    // console.log(id);
    let result = await fetch(`http://localhost:2000/product/${id}`,{
      method:'Delete',
      headers: {
        "Content-Type": "application/json",
        authorization:JSON.parse(localStorage.getItem('token'))
      },
    });
    console.log('befor result=', result)
    result = await result.json();
    console.log('result = ', result)
    getProduct();
  }
  // console.log("product", product);

  const update = (id) => {
    console.log("update id = ", id);
    // id = parseInt(id);
    navigate(`/update/${id}`);
  }

  const addProduct = () => {
    navigate('/add');
  }

  const searchHandle = async (event) => {
    // console.log(event.target.value);
    let key = event.target.value
    let userId = JSON.parse(localStorage.getItem('user'))[0].id
    if(key){
      let result = await fetch(`http://localhost:2000/search/${userId}/${key}`,{
        method:'Get',
        headers:{
          'Content-Type' : 'application/json',
          authorization:JSON.parse(localStorage.getItem('token'))
        }
      })
      result = await result.json();
      console.log(result);
      if(result+1){
        setProduct(result);
      }
    }else{
      getProduct();
    }

  }

  return (
    <div className="productList">
      <h1>Product List</h1>
      <div className="searchAddProduct">
        <input type="text" placeholder="Search" className="searchProductBox" onChange={searchHandle}/>
        <button className='appButton displayAddButton' onClick={addProduct}>Add Product</button>
      </div>
      <table>
        <tr>
          <ul>
          <th>Sno.</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Company</th>
          {/* <li>User Id</li> */}
          <th>Remove Product</th>
          <th>Update Product</th>

          </ul>
        </tr>

        {product.length >= 0 ? product.map((value, index) => 
            <tr>
          <ul key={index}>
            <td>{index+1}</td>
            <td>{value.productName}</td>
            <td>{value.price}</td>
            <td>{value.category}</td>
            <td>{value.company}</td>
            <td><button className="listButton" onClick={()=>deleteProduct(value.productId)}>Delete</button></td>
            <td><button className="listButton" onClick={()=>{update(value.productId)}}>Update</button></td>

          </ul>
            </tr>
        )
        :
        <h1>No Result Found</h1>
        // console.log('No Result Found')
      }
      </table>
    </div>
  );
};

export default ProductList;
