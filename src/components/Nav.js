import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();  
    const auth = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <div>
            <img className='navLogo' src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png" alt="logo" />
            { auth ?   
            <ul className='nav-ul'>
                <li></li>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update/0">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth)[0].name})</Link></li>
            </ul>
            :
            <ul className='nav-ul nav-right'>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
            }
        </div>
    );
}

export default Nav
