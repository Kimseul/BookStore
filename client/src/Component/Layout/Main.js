import React, { Component } from 'react';

class Main extends Component {
    
    render() {
        const { bookList } = this.props;
        return (
            <div>
                Main
                {
                    bookList.map(item=>(
                        <div>
                            {item.bookName}
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Main;