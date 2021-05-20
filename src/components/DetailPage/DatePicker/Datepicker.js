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
            startDate: moment(),
            endDate: moment(),
            userCount: '1',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onDateSelect = this.onDateSelect.bind(this)
    }

    onDateSelect(dateString) {
        if (dateString !== null) {
            this.setState({ startDate: dateString[0] })
            this.setState({ endDate: dateString[1] })
        } else {
            this.setState({ startDate: moment() })
            this.setState({ endDate: moment() })
        }
    }

    handleSubmit(event) {
        this.props.bookingClick(this.state)
        event.preventDefault();
    }

    render() {
        console.log('loading', this.props.booking)
        return (
            <aside className="widget-container" id="widget-container">
                <div className="picker_padding">
                    <h5 className="picker_text">{this.props.fees.split('.')[0]}$</h5>
                    <span>per night</span>
                </div>
                <div className="picker_padding picker_border datepicker">
                    <RangePicker
                        onChange={this.onDateSelect}
                        appearance="default"
                        placeholder={["Check In", 'Check Out']}
                        disabledDate={(current) =>
                            current && current < moment().startOf('day')
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
                <div className="form-group picker_border">
                    <button className="button"
                        onClick={this.handleSubmit}
                        disabled={this.state.startDate.isSame(this.state.endDate) || this.props.booking}>
                        {this.props.booking && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Request to book</span>
                    </button>
                    {/* <input className="button"
                        type="submit"
                        value="Request to book"
                        onClick={this.handleSubmit}
                        disabled={this.state.startDate.isSame(this.state.endDate)}>
                      
                    </input> */}
                </div>
            </aside>
        );
    }
}

export default Datepicker