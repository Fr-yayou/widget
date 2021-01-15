import React, { Component } from 'react'

export default class ChoiceLocation extends Component {

    constructor(props) {
        super(props)

        this.state = {

            city: "",
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.props.showCity(this.state.city)
        this.setState({ city: "" })
    }


    render() {
        return (
            <div className="d-flex flex-column align-items-center">
                <div>
                    <h4 className="mt-4">Weather</h4>
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input className="form-control" type="text" name="city" value={this.state.city} onChange={this.onChange}></input>
                    </form>
                </div>
            </div>
        )
    }
}
