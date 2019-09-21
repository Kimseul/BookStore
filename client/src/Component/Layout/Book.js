import React, { Component } from "react";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "",
      bookPrice: 0,
      bookAuthor: ""
    };
  }

  insertBook = e => {
    e.preventDefault();
    var postData = {
      bookName: this.state.bookName,
      bookPrice: this.state.bookPrice,
      bookAuthor: this.state.bookAuthor
    };
    this.props.insertBook(postData);
  };

  _InputHandler =(e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    const { bookName, bookPrice, bookAuthor } = this.state;
    //const { bookList } = this.props;
    return (
      <div>
        <form onSubmit={this.insertBook}>
          <h4>도서 등록</h4>
          <input   name="bookName" value={bookName} placeholder="책 제목" onChange={this._InputHandler}/>
          <input  name="bookPrice" value={bookPrice}  onChange={this._InputHandler}/>
          <input  name="bookAuthor" value={bookAuthor} placeholder="저자" onChange={this._InputHandler}/>
          <input  type="submit" value="등록" />
        </form>
        {/* {bookList.map(item => ( */}
          {/* <div>{item.bookName}</div> */}
        {/* ))} */}
      </div>
    );
  }
}

export default Book;
