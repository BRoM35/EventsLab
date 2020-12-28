import React, { Component } from 'react';
import './EventForm.css';
import {Layout, Button, Form, Input, DatePicker} from 'antd';
import moment from "moment";
const { Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

class EventReadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.startDate
    }
  }


  changeStartDate = (date, dateString) => {
    this.setState({startDate: dateString})
  }

  changeEndDate = (date, dateString) => {
    this.setState({endDate: dateString})
  }

  onFinish = (params) => {
    params.startDate = this.state.startDate;
    params.endDate = this.state.endDate;
    this.props.saveEvent(params);
  }

  render() {
    const {
      eventId,
      startDate,
      endDate,
      name,
      participants,
      roleId
    } = this.props;
    const dateFormat = 'DD.MM.YYYY';

    return (
      <div >
        <Form
          className="eventContainer"
          initialValues={{ name }}
          {...formItemLayout}
          style = {{width: '400px'}}
          layout={'horizontal'}
          onFinish={this.onFinish}
        >
          <Form.Item name="name" label="Название события">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item name="startDate" label="Дата начала">
            <DatePicker format={dateFormat} defaultValue={moment(startDate, dateFormat)} onChange={this.changeEndDate} />
          </Form.Item>
          <Form.Item name="endDate" label="Дата окончания">
            <DatePicker format={dateFormat} defaultValue={moment(endDate, dateFormat)} onChange={this.changeEndDate} />
          </Form.Item>
          <Form.Item className="eventRowRead">
            <Button style={{marginRight: '15px'}} htmlType='submit' type="primary">Применить</Button>
            <Button onClick={() => this.props.changeModeView(true)} type="secondary">Отменить</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default EventReadForm;
