import { Component } from 'react'

export default class SignUp extends Component {

    state = {
        username: '',
        password: '',
        name: '',
        nickName: '',
        dob: '',
        active: true,
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.signUp(this.state) 
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Sign Up Form</h1>
                <label>Username :</label>
                <input name='username' value={this.state.username} onChange={this.handleChange}/>
                <label>Password :</label>
                <input name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
                <label>Full Name: </label>
                <input name='name'  value={this.state.name} onChange={this.handleChange}/>
                <label>Nick Name: </label>
                <input name='nickName'  value={this.state.nickName} onChange={this.handleChange}/>
                <label>Date of birth :</label>
                <input name='dob' value={this.state.dob} onChange={this.handleChange}/>
                <label hidden>Active or not:</label>
                <input hidden name='active' value={this.state.active} onChange={this.handleChange}/>
                <input type='submit' value='Register'/> 
            </form>
        )
    }
}

