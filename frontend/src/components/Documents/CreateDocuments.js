import React, { Component } from 'react';
import './Profile.css';
import { Layout } from 'antd';
const { Content } = Layout;


class CreateDocuments extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        CreateDocuments
        </div>
      </Content>
    )
  }
}
export default CreateDocuments;