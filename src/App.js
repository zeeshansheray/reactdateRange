import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            Value: 10,
            endvalue: 90,
            selectedstartDate: '',
            selectedendDate: '',
            enddate: '2020-31-01',
            startdate: '2020-01-01',
        }
        this.valueChange = this.valueChange.bind(this);
        this.valuetext = this.valuetext.bind(this);
    }

    async valueChange(event, value) {
        //For checking the value of the slider
        if (this.state.Value === 10 && this.state.endvalue === 90) {
            if (this.state.Value == value[0]) {
                await this.setState({
                    enddateCheck: true,
                    startdateCheck: false,
                    endvalue: value[1],
                })

                console.log('Start is static1 ' + this.enddateCheck + this.startdateCheck + this.state.endvalue)
            }
            else if (this.state.endvalue == value[1]) {
                await this.setState({
                    enddateCheck: false,
                    startdateCheck: true,
                    Value: value[0],
                })
                console.log('End is static')
            }
            console.log('start value: ' + this.state.Value);
            console.log('end value: ' + this.state.endvalue);
        }
        else if (this.state.Value == value[0]) {
            await this.setState({
                enddateCheck: true,
                startdateCheck: false,
                endvalue: value[1],
            })
            console.log('start is static')
        }
        else {
            await this.setState({
                enddateCheck: false,
                startdateCheck: true,
                Value: value[0],
            })
            this.enddateCheck = false;
            this.startdateCheck = true;
            console.log('End is static')
        }
    }

    async valuetext(value) {
        var returnValue = '';
        if (this.state.startdateCheck) {
            console.log('if is working' + value);
            var startDay = Math.round((value * 365) / 100);
            var result = new Date('2020-07-14');
            result.setDate(result.getDate() + startDay);
            this.setState({
                selectedstartDate: result.toDateString(),
            })
            returnValue = result.toDateString();
            this.state.startdateCheck = false;
        }
        else if (this.state.enddateCheck) {
            console.log('else is working' + this.state.endvalue);
            var endDay = Math.round((this.state.endvalue * 365) / 100);
            var resultenday = new Date('2020-11-03');
            resultenday.setDate(resultenday.getDate() + endDay);
            this.setState({
                selectedendDate: resultenday.toDateString(),
            })
            returnValue = resultenday.toDateString();
            this.state.enddateCheck = false;
        }
        console.log('return value ' + returnValue);
        return returnValue;
    }
    render() {
        return (
            <div style={{ position: 'absolute', top: '10%', left: '30%', width: '400px' }}>
                <Typography id="discrete-slider" gutterBottom style={{ float: 'left' }}>
                    Start Date: {this.state.startdate}
                </Typography>
                <Typography id="discrete-slider" gutterBottom style={{ position: 'absolute', top: '0%', left: '59%' }}>
                    End Date: {this.state.enddate}
                </Typography>
                <Slider
                    value={[this.state.Value, this.state.endvalue]}
                    getAriaValueText={this.valuetext}
                    step={100 / 365}
                    marks
                    min={0}
                    max={100}
                    style={{ marginLeft: '0%' }}
                    onChange={this.valueChange}
                />
                <h3 style={{ width: '600px', float: 'left' }}>Selected Start date is: {this.state.selectedstartDate}</h3>
                <h3 style={{ width: '600px' }}>Selected End date is: {this.state.selectedendDate}</h3>
            </div>
        );
    }
}