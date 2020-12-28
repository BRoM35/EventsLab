import React, { Component } from 'react';
import './Users.css';
import { Layout } from 'antd';
const { Content } = Layout;


class ConfirmUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: ''
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const path = document.location.pathname;
    const id = +path.replace('/conf/','')
    const response = await fetch(`http://localhost:3001/conf/${id}`);
    const user = await response.json();
    const msg = user.msg

    console.log(user)

    this.setState({msg})
  }

  render() {
    const {msg} = this.state;

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {msg}
        </div>
      </Content>
    )
  }
}
export default ConfirmUser;
