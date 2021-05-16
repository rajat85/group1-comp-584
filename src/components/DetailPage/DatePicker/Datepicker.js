import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './Datepicker.css';
import { DatePicker } from "antd";

import "antd/dist/antd.css"
import moment from 'moment';
const { RangePicker } = DatePicker;
const format = "MM.DD.YYYY";
const disabledDates = [
    {
        start: moment("23.02.2022", format),
        end: moment("25.02.2022", format)
    },

    {
        start: moment("15.03.2022", format),
        end: moment("20.03.2022", format)
    }
];
class Datepicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            userCount: '1',
            disabledDates: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onDateSelect = this.onDateSelect.bind(this)

    }

    onDateSelect(date, dateString) {
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
                    {/* <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        disabledDates={["06/24/2021", "06/28/2021", "06/02/2021", "06/23/2021"]}
                    /> */}
                    <RangePicker
                        onChange={this.onDateSelect}
                        defaultValue={[moment(), moment()]}
                        disabledDate={(current) =>
                            disabledDates.some(
                                (date) =>
                                    current &&
                                    current < moment().endOf("day") ||
                                    current.isBetween(
                                        moment(date["start"], format),
                                        moment(date["end"], format),
                                        "day"
                                    )
                            )
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
                    <input className="button" type="submit" value="Request to book" onClick={this.handleSubmit} />
                </div>
            </aside>
        );
    }
}

export default Datepicker