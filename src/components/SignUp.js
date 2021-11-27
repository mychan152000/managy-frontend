import { Component } from 'react'

export default class SignUp extends Component {

    state = {
        email: '',
        password: ''
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up Form</h1>
                    <label>Email:</label>
                    <input name='email' value={this.state.email} onChange={this.handleChange}/>
                    <label>Password :</label>
                    <input type="password" name='password' value={this.state.password} onChange={this.handleChange}/>
                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null}
                    <input type="submit" value="Authenticate"/>
                </form>
            </div>
        )
    }
}
