import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import '../InfoForm.css'

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

class EditForm extends React.Component {
  formRef = React.createRef();

  onFinish = (fieldsValue) => {
    if (fieldsValue.newPassword !== fieldsValue.repeatNewPassword) {
      return;
    }
    this.props.saveNewInfo(fieldsValue);
  }

  render() {
    const {
      firstName,
      lastName,
      country,
      about,
      email,
      password,
      pin,
      closeEditNode,
    } = this.props;
    return (
      <>
        <Form
        initialValues={{ firstName, lastName, country, about, email, pin }}
        {...formItemLayout}
        style = {{width: '450px'}}
        layout={'horizontal'}
        onFinish={this.onFinish}
      >
        <Form.Item name="firstName" label="Имя">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name="lastName" label="Фамилия">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name="country" label="Страна">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name="about" label="О себе">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name="email" label="E-mail">
          <span>{email}</span>
        </Form.Item>
        <Form.Item
          hasFeedback
          name="newPassword"
          label="Новый пароль">
            <Input.Password placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
          hasFeedback
          dependencies={['password']}
          name="repeatNewPassword"
          label="Повторите пароль">
            <Input.Password placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name="pin" label="PIN">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item >
          <Button style={{marginRight: '15px'}} htmlType='submit' type="primary">Применить</Button>
          <Button onClick={closeEditNode} type="secondary">Выйти</Button>
        </Form.Item>
      </Form>
      </>
    );
  }
};

export default EditForm;
