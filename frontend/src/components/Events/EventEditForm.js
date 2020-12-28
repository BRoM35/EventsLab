import React, { Component } from 'react';
import './Events.css';
import { Layout } from 'antd';
const { Content } = Layout;


class AssignEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    this.getEvent();
  }

  getEvent = async () => {
    const path = document.location.pathname;
    const id = +path.replace('/events/browse/','')
    const response = await fetch(`http://localhost:3001/event/${id}`);
    const event = await response.json();

    console.log(event)

    // this.setState({events})
  }

  render() {

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        AssignEvents
        </div>
      </Content>
    )
  }
}
export default AssignEvents;
