import React, { Component } from 'react'
import DisplayWeather from "./DisplayWeather"
import styled from "styled-components"
import ChoiceLocation from "./ChoiceLocation"


export default class Weather extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fetch: false,
            data: [],
        }

    }

    componentDidMount() {
        fetch("http://ip-api.com/json/?fields=61439")
            .then(response => response.json())
            .then(body => {
                fetch(`http://api.weatherapi.com/v1/current.json?key=57f905012e19481b93c152835210101&q=${body.city}`,
                    {
                        headers: {
                            mode: "no-cors"
                        }
                    })
                    .then(response => response.json())
                    .then(body => {
                        this.setState({ data: body })
                    })
            })
    }


    fetchCityWeather = (city) => {
        if (city === "") {
            return
        } else {
            fetch(`http://api.weatherapi.com/v1/current.json?key=57f905012e19481b93c152835210101&q=${city}`, {
                headers: {
                    mode: "no-cors"
                }
            })
                .then(response => response.json())
                .then(body => {
                    this.setState({ data: body })
                })
                .catch(err => {
                    console.log(err)
                })
        }


    }


    showCity = (city) => {
        this.fetchCityWeather(city)
    }
    render() {
        return (
            <Wrapper>
                <Card>
                    <ChoiceLocation showCity={this.showCity} />
                    {this.state.data.length !== 0 ? (
                        <div className="weather-title">
                            <DisplayWeather data={this.state.data} />
                        </div>
                    ) : (
                            <h1>Loading...</h1>
                        )}
                </Card>
            </Wrapper>
        )
    }

}
const Wrapper = styled.div`
    padding-top:70px;
    margin-left:25px;
    margin-right:25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:white;
    border-radius:20px;
    width: 300px;
`
