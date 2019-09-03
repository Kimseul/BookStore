import React, { Component } from "react";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "다영이 바부",
      bookPrice: 30000,
      bookAuthor: "김예슬"
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

  render() {
    const { bookName, bookPrice, bookAuthor } = this.state;
    const { bookList } = this.props;
    return (
      <div>
        <form onSubmit={this.insertBook}>
          <input value={bookName} />
          <input value={bookPrice} />
          <input value={bookAuthor} />
          <input type="submit" />
        </form>
        {bookList.map(item => (
          <div>{item.bookName}</div>
        ))}
      </div>
    );
  }
}

export default Book;
