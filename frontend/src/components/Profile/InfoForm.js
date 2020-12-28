import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Button } from 'antd';
import './InfoForm.css'

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

class InfoForm extends React.Component {
  render() {
    const {
      firstName,
      lastName,
      country,
      about,
      email,
      pin,
      setEditMode
    } = this.props;
    return (
      <>
        <div className='infoForm'>
          <div className='infoRow'>
            <span className='infoTitle'>Имя:</span>
            <span className='infoValue'>{firstName}</span>
          </div>
          <div className='infoRow'>
            <span className='infoTitle'>Фамилия:</span>
            <span className='infoValue'>{lastName}</span>
          </div>
          <div className='infoRow'>
            <span className='infoTitle'>Страна:</span>
            <span className='infoValue'>{country}</span>
          </div>
          <div className='infoRow'>
            <span className='infoTitle'>О себе:</span>
            <span className='infoValue'>{about}</span>
          </div>
          <div className='infoRow'>
            <span className='infoTitle'>E-mail:</span>
            <span className='infoValue'>{email}</span>
          </div>
          <div className='infoRow'>
            <span className='infoTitle'>PIN:</span>
            <span className='infoValue'>{pin}</span>
          </div>
          <Button onClick={setEditMode} type="primary">Редактировать</Button>
        </div>
      </>
    );
  }
};

export default InfoForm;
