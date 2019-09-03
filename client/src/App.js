import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header, Main, Auth, Book, Order, Basket } from "./Component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: []
    };
  }

  componentWillMount() {
    this.getBook();
  }

  /**
   * getBooks
   * @returns bookList
   */
  getBook = () => {
    fetch("http://localhost:3000/book")
    .then(response=>{
      return response.json();
    })
    .then(data=>{
      console.log(data);
      this.setState({bookList: data})
    })
  }

  /**
   * inserBook
   * @param book(bookName, bookAuthor, bookPrice)
   * @return ture | flase
   */
  insertBook = (book) => {
    fetch("http://localhost:3000/book", {method: 'POST', body: JSON.stringify(book),   headers:{
      'Content-Type': 'application/json'
    }})
  .then(response=>{
      return response.json();
  })
  .then(res=>{
      if(res.result){
        alert('도서 입력 성공');
        this.getBook();
      }else{
        alert('도서 입력 실패')
      }
  })
  }
  render() {
    const { bookList } = this.state;
    return (
      <div>
        <Router>
          <Header />
          <Route path="/" exact render={props => <Main {...props} bookList={bookList}/>} />
          <Route path="/auth" render={props => <Auth {...props} />} />
          <Route path="/book" render={props => <Book {...props} insertBook={this.insertBook} bookList={bookList}/>} />
          <Route path="/basket" render={props => <Basket {...props} />} />
          <Route path="/order" render={props => <Order {...props} />} />
        </Router>
      </div>
    );
  }
}

export default App;
