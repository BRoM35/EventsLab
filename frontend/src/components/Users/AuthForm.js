import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button, Radio } from 'antd';

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

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowTitle: false,
      title: ''
    }
  }

  async auth(params) {
    const response = await fetch(`http://localhost:3001/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const res = await response.json();

    if (!res.hasOwnProperty('user')) {
      this.setState({
        isShow: true,
        title: res.msg
      })
    } else {
      if (res.msg === 'ok') {
        localStorage.setItem('login', 'true');
        localStorage.setItem('userId', res.user.id)
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        document.location.href = '/profile'
      } else {
        this.setState({
          isShow: true,
          title: res.msg
        })
      }
    }
  }

  onFinish = (fieldsValue) => {
    const password = fieldsValue.password;
    const email = fieldsValue.email;

    this.auth({email, password});
  }

  redirectSignUp = () => {
    document.location.href = '/registration'
  }

  render() {
    const {isShow, title} = this.state;

    return (
      <>
        <Form
          {...formItemLayout}
          style = {{width: '500px', margin: '20px 0'}}
          layout={'horizontal'}
          onFinish={this.onFinish}
        >
          <Form.Item name="email" label="E-Mail">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password placeholder="" />
          </Form.Item>
          {isShow ?
            <p style={{'color': 'red'}}>
              {title}
            </p> : null
          }

          <Form.Item style={{justifyContent: 'center'}}>
            <Button style={{marginRight: '20px'}} htmlType='submit' type="primary">Sing In</Button>
            <Button onClick={this.redirectSignUp} type="primary">Sing Up</Button>
          </Form.Item>
        </Form>
      </>
    );
  }
};

export default AuthForm;
