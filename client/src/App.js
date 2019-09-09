import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header, Main, Auth, Book, Order, Basket } from "./Component";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
      memberList: [],
      user: undefined
    };
  }

  componentWillMount() {
    this.getBook();
    this.getMembers();
    this.getinfor();
  }

  /**
   * getBooks
   * @returns bookList
   */
  getBook = () => {
    fetch("http://localhost:4000/book")
      .then(response => {
        return response.json();
      })
      .then(data => {
        //console.log(data);
        this.setState({ bookList: data });
      });
  };

  /**
   * inserBook
   * @param book(bookName, bookAuthor, bookPrice)
   * @return ture | flase
   */
  insertBook = book => {
    fetch("http://localhost:4000/book", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        if (res.result) {
          alert("도서 입력 성공");
          this.getBook();
        } else {
          alert("도서 입력 실패");
        }
      });
  };

  /**
   * getMembers
   * @returns memberList
   */
  getMembers = () => {
    fetch("http://localhost:4000/users")
      .then(response => {
        return response.json();
      })
      .then(data => {
        //console.log(data);
        this.setState({ memberList: data });
      });
  };

  /**
   * inserMember
   * @param member( memberID, memberPassword , memberName)
   * @return true | false
   */
  insertMember = member => {
    fetch("http://localhost:4000/users/join", {
      method: "POST",
      body: JSON.stringify(member),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        console.log(res);

        if (res.result) {
          alert("회원 정보 입력 성공");
          this.getMembers();
        } else {
          alert("회원 정보 입력 실패");
        }
      });
  };

  /**
   * getinfor
   * @returns inforList
   */
  getinfor = () => {
    fetch("http://localhost:4000/users")
      .then(response => {
        return response.json();
      })
      .then(data => {
        //console.log(data);
        this.setState({ inforList: data });
      });
  };

  /**
   * inserinfor
   * @param infor( memberID, memberPassword )
   * @return true | false
   */
  insertinfor = infor => {
    console.log(infor);

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      body: JSON.stringify(infor),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        if (res.result === false) {
          alert("회원 정보 입력 실패");          
        } else {

          alert("회원 정보 입력 성공");
          this.setState({
            user: res
          })
        }
      });
  };

  render() {
    const { memberList, bookList, inforList, user } = this.state;
    return (
      <div >
        <Router>
          <Header user={user}/>
          <Route
            path="/"
            exact
            render={props => <Main {...props} bookList={bookList} />}
          />
          <Route
            path="/auth"
            render={props => (
              <Auth
                {...props}
                insertMember={this.insertMember}
                insertinfor={this.insertinfor}
                memberList={memberList}
                inforList={inforList}
              />
            )}
          />
          <Route
            path="/book"
            render={props => (
              <Book
                {...props}
                insertBook={this.insertBook}
                bookList={bookList}
              />
            )}
          />
          <Route path="/basket" render={props => <Basket {...props} />} />
          <Route path="/order" render={props => <Order {...props} />} />
        </Router>
      </div>
    );
  }
}

export default App;
