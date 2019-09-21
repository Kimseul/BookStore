import React, { Component } from 'react';


class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            memberID: "",
            memberPassword : "",
            membername: "",
            ID: "",
            Password : ""
        };
    }

    insertMember = e => {
        e.preventDefault();
        var postData = {
            memberID : this.state.memberID,
            memberPassword : this.state.memberPassword,
            membername : this.state.membername
        };
        this.props.insertMember(postData);
    };

    insertinfor = e => {
        e.preventDefault();
        var postData = {
            memberID : this.state.ID ,
            memberPassword : this.state.Password
        };
        console.log(postData);
        
        this.props.insertinfor(postData);
    };


    _InputHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
       
        const { memberID, memberPassword, membername ,ID,Password } = this.state;
        return (
            <div>
                <form onSubmit={this.insertMember}>
                <h3>회원 가입</h3>
                      <input  name="memberID" placeholder="아이디"  value={memberID} onChange={this._InputHandler}/>
                      <input  name="memberPassword" placeholder="비밀번호"  value={memberPassword} onChange={this._InputHandler}/>
                      <input  name="membername" placeholder="이름"  value={membername} onChange={this._InputHandler}/>
                      <input  type="submit" value="회원가입"/>
                </form>

                <form onSubmit={this.insertinfor} >
                       <h4>로그인</h4>
                       <input  name="ID" placeholder="아이디"  value={ID} onChange={this._InputHandler}/>
                       <input  name="Password" placeholder="비밀번호"  value={Password} onChange={this._InputHandler} />
                       <input  type="submit" value="로그인"/>
                </form>
                 
            </div>
        );
    }
}

export default Auth;