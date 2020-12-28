import React, { Component } from 'react';
import '../Events/Events.css';
import {Form, Input, Button, DatePicker, Cascader} from 'antd';

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

const roleValues = [
  {
    code: 'Expert',
    name: 'Expert'
  },
  {
    code: 'Competitor',
    name: 'Competitor'
  }
];

class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedValue: '',
      event: 0
    }
  }

  onFinish = (params) => {
    params.forWhom = this.state.pickedValue;
    params.eventId = this.state.event;
    this.props.createDocument(params);
  }

  changeFor = (value) => {
    this.setState({pickedValue: value[0]})
  }

  changeEvent = (value) => {
    this.setState({event: value[0]})
  }

  render() {
    const {isClose} = this.props;

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
          ]} name="name" label="Название документа">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите контент!',
            },
          ]} name="content" label="Контент документа">
            <Input.TextArea placeholder="input placeholder" />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: 'Для кого документ?!',
            },
          ]} name="forWhom" label="Для кого">
            <Cascader fieldNames={{ label: 'name', value: 'code'}} options={roleValues} onChange={this.changeFor} />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: 'Для какого события?!',
            },
          ]} name="eventId" label="Для какого события">
            <Cascader fieldNames={{ label: 'name', value: 'id'}} options={this.props.events} onChange={this.changeEvent} />
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
export default CreateDocument;
