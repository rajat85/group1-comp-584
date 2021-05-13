// import React from 'react';
import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './Datepicker.css';

class Datepicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Number of guests are: ' + this.state.value);
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
                    <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    />
                </div>
                <div className="picker_padding picker_border">
                    <form onSubmit={this.handleSubmit}>
                        <label className="camp_label">
                            Guests:
                        </label>
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="1guest">1 guest</option>
                            <option value="2guest">2 guests</option>
                            <option value="3guest">3 guests</option>
                            <option value="4guest">4 guests</option>
                            <option value="5guest">5 guests</option>
                            <option value="6guest">6 guests</option>
                            <option value="7guest">7 guests</option>
                            <option value="8guest">8 guests</option>
                        </select>
                    </form>
                </div>
                <div className="picker_border">
                    <input className="button" type="submit" value="Request to book" />
                </div>
            </aside>
        );
    }
}

export default Datepicker