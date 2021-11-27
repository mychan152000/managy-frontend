import './App.css';
import { Component } from 'react';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

class App extends Component {

  state = {
    user: {}, 
    error: "",
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      fetch("http://localhost:3000/private/test", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else if (res.status == "401") {
            throw new Error("Unauthorized Request. Must be signed in.");
          }
        })
        .then((json) => console.dir(json))
        .catch((err) => console.error(err));
    }
  }

  signUp = user => {
    fetch("http://localhost:3000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: user.email,
          password: user.password
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res.headers.get("Authorization"));
          localStorage.setItem("token", res.headers.get("Authorization"));
          return res.json();
        } else {
          throw new Error(res);
        }
      })
      .then((json) => console.dir(json))
      .catch((err) => console.error(err));
  }

  signIn = (user) => {
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                email: user.email,
                password: user.password
            }
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.token){
        localStorage.setItem('token', result.token)
        this.setState({
            user: result.user
            })
        }
        else {
            this.setState({
                error: result.error
            })
        }
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.user.email ? <h2>Welcome {this.state.user.first_name}</h2> : (
          <>
          <SignIn signIn={this.signIn} error={this.state.error} />
          <SignUp signUp={this.signUp} />
          </>)
        }
      </div>
    );
  } 
}

export default App;