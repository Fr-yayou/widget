import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Pause from "../images/pause.png"
import Play from "../images/play.png"


const StopWatch = () => {

    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(true)

    useEffect(() => {
        if (isRunning) {
            const id = window.setInterval(() => {
                setSeconds(seconds => seconds + 1)
            }, 1000)
            return () => window.clearInterval(id)
        } else {
        }
    }, [isRunning])


    const convert = (seconds) => {
        var hours = Math.floor(seconds / 60);
        var minutes = seconds % 60;
        return hours + ":" + minutes;
    }

    return (
        <Container className="watch">
            <div className="time-circle">
                <div className="time">
                    {convert(seconds)}
                </div>
            </div>
            <div className="container-btn-message">
                {/* {
                        seconds === 50 ?(
                            "Hello"
                        ):(
                            "Bye"
                        )
                } */}
                {
                    isRunning ? (
                        <button className="btn-Pause" disabled={!isRunning} onClick={() => { setIsRunning(false) }}><img src={Pause} alt="Pause icon" /></button>
                    ) : (
                            <button className="btn-Play" onClick={() => { setIsRunning(true) }}><img src={Play} alt="Play icon" /></button>
                        )

                }
            </div>
            <div>
                <button className="btn-Reset" disabled={isRunning} onClick={() => { setIsRunning(false); setSeconds(0) }}>Reset</button>
            </div>
        </Container>
    )

}

const Container = styled.div`
padding-top:30px;
display: flex;
flex-direction: column;
align-items: center;
width: 300px;
background-color: white;
border-radius: 50px;
`

export default StopWatch

