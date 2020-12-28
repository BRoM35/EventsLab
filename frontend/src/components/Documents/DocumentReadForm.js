import React, { Component } from 'react';
import '../Events/EventForm.css';
import {Layout, Button, Form, Input, DatePicker, Cascader} from 'antd';
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

class DocumentReadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forWhom: this.props.forWhom,
      eventId: this.props.eventId
    }
  }


  onFinish = (params) => {
    params.forWhom = this.state.forWhom;
    params.eventId = this.state.eventId;
    this.props.saveDocument(params);
  }

  changeFor = (value) => {
    this.setState({forWhom: value[0]})
  }

  changeEvent = (value) => {
    this.setState({eventId: value[0]})
  }

  render() {
    const {
      content,
      forWhom,
      name,
      roleId,
      eventName
    } = this.props;

    return (
      <div >
        <Form
          className="eventContainer"
          initialValues={{ name, content  }}
          {...formItemLayout}
          style = {{width: '450px'}}
          layout={'horizontal'}
          onFinish={this.onFinish}
        >
          <Form.Item name="name" label="Название документа">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item name="content" label="Контент">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item name="forWhom" label="Для кого">
            <Cascader fieldNames={{ label: 'name', value: 'code'}} options={roleValues} onChange={this.changeFor} />
          </Form.Item>
          <Form.Item name="eventId" label="Для какого события">
            <Cascader fieldNames={{ label: 'name', value: 'id'}} options={this.props.events} onChange={this.changeEvent} />
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
export default DocumentReadForm;
