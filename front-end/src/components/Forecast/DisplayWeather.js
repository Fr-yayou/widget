import React from "react"
import styled from "styled-components"


const DisplayWeather = ({ data }) => {
    return (
        <ContainerDisplay>
            <div className="d-flex justify-content-around weather-title">
                <h5>{data.location.country}</h5> |
                <h5> {data.location.name}</h5>
            </div>
            <p className="region">{data.location.region}</p>
            {/* <h5>{data.location.localtime}</h5> */}
            <Cloud className="d-flex cloud justify-content-around">
                <img src={data.current.condition.icon} alt="icon"></img>
                <span>{data.current.cloud}%</span>
                <p className="condition">{data.current.condition.text}</p>
            </Cloud>
        </ContainerDisplay>
    )
}

const ContainerDisplay = styled.div`
display:flex;
flex-direction:column;
align-items: center;
`

const Cloud = styled.div`
display: flex;
align-items: center;
`



export default DisplayWeather
