import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div>
                <h1>
                    도서구매
                    <ul>
                        <li>
                            <Link  to="/">Main</Link>
                        </li>
                        <li>
                            <Link to="/auth">Auth</Link>
                        </li>
                        <li>
                            <Link to="/book">Book</Link>
                        </li>
                        <li>
                            <Link to="/order">Order</Link>
                        </li>
                        <li>
                            <Link to="/basket">Basket</Link>
                        </li>
                    </ul>
                </h1>
            </div>
        );
    }
}
 
export default Header;