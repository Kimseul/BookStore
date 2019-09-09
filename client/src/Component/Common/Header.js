import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <h1>
                    도서구매
                    </h1>
                    <ul>
                        <li>
                            <Link  to="/">Main</Link>
                        </li>
                        {
                            user === undefined ? 
                            (                        <li>
                                <Link to="/auth">Auth</Link>
                            </li>
                            )
                            :
                            (
                                <li>
                                    {user.memberName}
                                </li>
                            )
                        }

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
                
            </div>
        );
    }
}
 
export default Header;