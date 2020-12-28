import React, { Component } from 'react';
import './Events.css';
import { Form, Input, Button } from 'antd';


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

class EditEvents extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  onFinish = (params) => {
    this.props.createEvent(params);
  }

  render() {

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
          ]} name="title" label="Название события">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите дату начала!',
            },
          ]} name="startDate" label="Дата начала">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите дату окончания!',
            },
          ]} name="endDate" label="Дата окончания">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item style={{justifyContent: 'center'}}>
            <Button className="buttonOkFormEvents" htmlType='submit' type="primary">Создать</Button>
            <Button type="secondary">Отмена</Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}
export default EditEvents;
