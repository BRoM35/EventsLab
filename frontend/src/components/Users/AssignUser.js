import React, { Component } from 'react';
import './Users.css';
import { Layout } from 'antd';
const { Content } = Layout;


class AssignUser extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        AssignUser
        </div>
      </Content>
    )
  }
}
export default AssignUser;
