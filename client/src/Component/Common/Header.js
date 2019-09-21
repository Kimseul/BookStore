import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
                   <Link class="nav-link" class="navbar-brand" to="/">BookStore</Link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
            <Link class="nav-link" class="navbar-brand" to="/auth">Auth</Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Auth
              </a>
            </li>

          </ul>
        </div>
      </nav>
    //   <div>
    //       <h1>
    //           도서구매
    //           </h1>
    //           <ul>
                
    //               {
    //                   user === undefined ?
    //                   (                        <li>
    //                       <Link to="/auth">Auth</Link>
    //                   </li>
    //                   )
    //                   :
    //                   (
    //                       <li>
    //                           {user.memberName}
    //                       </li>
    //                   )
    //               }

    //               <li>
    //                   <Link to="/book">Book</Link>
    //               </li>
    //               <li>
    //                   <Link to="/order">Order</Link>
    //               </li>
    //               <li>
    //                   <Link to="/basket">Basket</Link>
    //               </li>
    //           </ul>

    //   </div>
    );
  }
}

export default Header;
