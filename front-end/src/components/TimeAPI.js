import React, { Component } from 'react'
import './../time.css';
import Switch from '@material-ui/core/Switch';

export default class TimeAPI extends Component {
    constructor() {
        super();
        this.state = {
            time: [],
            date: [],
            format: true,
            interval_id: null,
            city: null,
        }
    }

    editFormat() {
        if (this.state.format === true) {
            clearInterval(this.state.interval_id);
            this.setState({
                interval_id: setInterval(() => this.formatAMPM(new Date()), 1000)
            })
        }
        else {
            clearInterval(this.state.interval_id);
            this.setState({
                interval_id: setInterval(() => this.setTime(), 1000)
            })
        }
    }

    formatAMPM() {
        var cd = new Date();
        var hours = cd.getHours();
        var minutes = cd.getMinutes();
        var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        this.setState({
            time: [strTime],
            date: [this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()]]
        })
    }

    setTime() {
        var cd = new Date();
        var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        this.setState({
            time: [this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)],
            date: [this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()]]
        })
    }

    zeroPadding(num, digit) {
        var zero = '';
        for (var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }

    componentDidMount() {
        fetch("http://ip-api.com/json/?fields=61439")
            .then(response => response.json())
            .then(body => (this.setState({ city: body.city })
            ));
        this.setTime();
        this.setState({
            interval_id: setInterval(() => this.setTime(), 1000)
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
        this.editFormat();
    };

    render() {
        return (
            <div id="clock">
                {this.state.date.map((el, index) => {
                    return (<p className="date" key={index}> {el} <Switch
                        checked={this.state.format}
                        onChange={this.handleChange}
                        name="format"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    /></p>)
                })}
                {this.state.time.map((el, index) => {
                    return (<p className="time" key={index}> {el}</p>)
                })}
                <p className="text">TIME ZONE: {this.state.city}</p>
            </div>
        )
    }
}