import React, { Component } from 'react';

const styles = {
    Form : {
        margin : 55,
        paddingLeft : 5
    },
    Input : { 
            margin : 5,
            display:'flex'
    }
}
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
                <form onSubmit={this.insertMember} style={styles.Form}>
                <h3>회원 가입</h3>
                      <input style={styles.Input}  name="memberID" placeholder="아이디"  value={memberID} onChange={this._InputHandler}/>
                      <input style={styles.Input} name="memberPassword" placeholder="비밀번호"  value={memberPassword} onChange={this._InputHandler}/>
                      <input style={styles.Input} name="membername" placeholder="이름"  value={membername} onChange={this._InputHandler}/>
                      <input style={styles.Input} type="submit" value="회원가입"/>
                </form>

                <form onSubmit={this.insertinfor} style={styles.Form}>
                       <h4>로그인</h4>
                       <input style={styles.Input}  name="ID" placeholder="아이디"  value={ID} onChange={this._InputHandler}/>
                       <input style={styles.Input} name="Password" placeholder="비밀번호"  value={Password} onChange={this._InputHandler} />
                       <input style={styles.Input} type="submit" value="로그인"/>
                </form>
                 
            </div>
        );
    }
}

export default Auth;