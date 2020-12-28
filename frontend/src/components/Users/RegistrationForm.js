import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import 'antd/dist/antd.css';
import { Form, Input, Button, Radio } from 'antd';
import '../Profile/InfoForm.css'

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

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      message: '',
      country: '', region: ''
    }

  }

  selectCountry (val) {
    this.setState({ country: val });
  }

  selectRegion (val) {
    this.setState({ region: val });
  }

  async reg(params) {
    const response = await fetch(`http://localhost:3001/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const res = await response.json();

    if (res.status) {
      document.location.href = '/auth';
    } else {
      this.setState({
        isShow: true,
        message: res.msg
      })
    }
  }

  onFinish = (fieldsValue) => {
    delete fieldsValue.repeatPassword;

    const user = {
      about: '',
      role: 'user',
      file: '',
      pin: '',
      ...fieldsValue
    };
    this.reg(user);
  }

  render() {
    const {isShow, message, country, region} = this.state;

    return (
      <>
        <Form
          {...formItemLayout}
          style = {{width: '500px', margin: '20px 0'}}
          layout={'horizontal'}
          onFinish={this.onFinish}
        >
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите имя!',
            },
          ]} name="firstName" label="Имя">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите фамилию!',
            },
          ]} name="lastName" label="Фамилия">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите страну!',
            },
          ]} name="country" label="Страна">
            <CountryDropdown
              classes="selectRegistration"
              value={country}
              onChange={(val) => this.selectCountry(val)} />
          </Form.Item>
          {country === 'Russian Federation' ?
            <Form.Item rules={[
              {
                required: true,
                message: 'Введите город!',
              },
            ]} name="city" label="Город">
              <RegionDropdown
                classes="selectRegistration"
                country={country}
                value={region}
                onChange={(val) => this.selectRegion(val)} />
            </Form.Item> : null
          }
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите почту!',
            },
          ]} name="email" label="E-mail">
            <Input placeholder="input placeholder" />
          </Form.Item>
          {isShow ? <p style={{color: 'red'}}>{message}</p> : null}
          <Form.Item rules={[
            {
              required: true,
              message: 'Введите пароль!',
            },
          ]} name="password" label="Пароль">
            <Input.Password placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Пожалуйста подтвердите пароль!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('Два введённых пароля не совпадают!');
                },
              }),
            ]}
            dependencies={['password']}
            name="repeatPassword" label="Повторите пароль">
            <Input.Password placeholder="input placeholder" />
          </Form.Item>
          <Form.Item style={{justifyContent: 'center'}}>
            <Button htmlType='submit' type="primary">Зарегистрироваться</Button>
          </Form.Item>
        </Form>
      </>
    );
  }
};

export default RegistrationForm;
