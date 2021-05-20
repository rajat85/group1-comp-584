import React, { Component } from 'react';
import moment from 'moment';
import { DatePicker } from "antd";

import './Datepicker.css';
import "antd/dist/antd.css"

const { RangePicker } = DatePicker;

class Datepicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            userCount: '1',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onDateSelect = this.onDateSelect.bind(this)
    }

    onDateSelect(dateString) {
        console.log(dateString);
        this.setState({ startDate: dateString[0] })
        this.setState({ endDate: dateString[1] })
    }

    handleSubmit(event) {
        this.props.bookingClick(this.state)
        event.preventDefault();
    }

    render() {
        return (
            <aside className="widget-container" id="widget-container">
                <div className="picker_padding">
                    <h5 className="picker_text">{this.props.fees.split('.')[0]}$</h5>
                    <span>per night</span>
                </div>
                <div className="picker_padding picker_border datepicker">
                    <RangePicker
                        onChange={this.onDateSelect}
                        defaultValue={[moment(), moment()]}
                        disabledDate={(current) =>
                            current && current < moment().endOf('day')
                        }
                    />
                </div>
                <div className="picker_padding picker_border">
                    <form>
                        <label className="camp_label">
                            Guests:
                        </label>
                        <select value={this.state.value} onChange={event => this.setState({ userCount: event.target.value })}>
                            <option value="1">1 guest</option>
                            <option value="2">2 guests</option>
                            <option value="3">3 guests</option>
                            <option value="4">4 guests</option>
                            <option value="5">5 guests</option>
                            <option value="6">6 guests</option>
                            <option value="7">7 guests</option>
                            <option value="8">8 guests</option>
                        </select>
                    </form>
                </div>
                <div className="picker_border">
                    <input className="button"
                        type="submit"
                        value="Request to book"
                        onClick={this.handleSubmit}
                        disabled={this.state.startDate === this.state.endDate}
                    />
                </div>
            </aside>
        );
    }
}

export default Datepicker