import React, { Component } from 'react';
import './Events.css';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from "moment";

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

class CreateEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: ''
    }
  }

  componentDidMount() {
  }

  changeStartDate = (date, dateString) => {
    console.log(dateString)
    this.setState({startDate: dateString})
  }

  changeEndDate = (date, dateString) => {
    this.setState({endDate: dateString})
  }

  disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  onFinish = (params) => {
    params.startDate = this.state.startDate;
    params.endDate = this.state.endDate;
    this.props.createEvent(params);
  }

  render() {
    const {isClose} = this.props;
    const dateFormat = 'DD.MM.YYYY';

    return (
      <>
        <Form
          {...formItemLayout}
          style = {{width: '470px', margin: '20px 0'}}
          layout={'horizontal'}
          onFinish={this.onFinish}
        >
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите название!',
            },
          ]} name="name" label="Название события">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите дату начала!',
            },
          ]} name="startDate" label="Дата начала">
            <DatePicker disabledDate={this.disabledDate} format={dateFormat} onChange={this.changeStartDate} />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите дату окончания!',
            },
          ]} name="endDate" label="Дата окончания">
            <DatePicker disabledDate={this.disabledDate} format={dateFormat} onChange={this.changeEndDate} />
          </Form.Item>
          <Form.Item style={{justifyContent: 'center'}}>
            <Button className="buttonOkFormEvents" htmlType='submit' type="primary">Создать</Button>
            <Button onClick={() => isClose(false)} type="secondary">Отмена</Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}
export default CreateEvents;
