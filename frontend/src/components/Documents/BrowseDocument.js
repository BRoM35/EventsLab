import React, { Component } from 'react';
import '../Events/Events.css';
import { Layout } from 'antd';
import DocumentReadForm from "./DocumentReadForm";
import DocumentViewForm from "./DocumentViewForm";
const { Content } = Layout;


class BrowseDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modeView: true,
      documentId: 0,
      content: '',
      forWhom: '',
      eventId: 0,
      name: 'Первое событие',
      events: [],
      eventName: ''
    }

  }

  componentDidMount() {
    this.getDocument();
    this.getEvents();
  }

  getDocument = async () => {
    const path = document.location.pathname;
    const id = +path.replace('/documents/browse/','')
    const response = await fetch(`http://localhost:3001/document/${id}`);
    const doc = await response.json();

    const documentId = doc[0].id;
    const content = doc[0].content;
    const forWhom = doc[0].forWhom;
    const name = doc[0].name;
    const eventId = doc[0].eventId;
    const eventName = doc[0].event.name;

    this.setState({
      eventId, documentId, content, name, forWhom, eventName
    })
  }

  getEvents = async () => {
    const response = await fetch(`http://localhost:3001/events`);
    const events = await response.json();

    const eventObj = [];
    events.forEach(event => {
      eventObj.push({
        id: event.id, name: event.name
      })
    })

    this.setState({events: eventObj})
  }

  saveDocument = async (params) => {
    const id = this.state.documentId;
    const response = await fetch(`http://localhost:3001/document/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const document = await response.json();

    const content = document[0].content;
    const forWhom = document[0].forWhom;
    const name = document[0].name;
    const eventId = document[0].eventId;
    const eventName = document[0].event.name;

    this.setState({
      eventId, content, name, forWhom, eventName, modeView: true
    })
  }

  changeModeView = (mode) => {
    this.setState({
      modeView: mode
    })
  }

  render() {
    const {
      modeView,
      documentId,
      content,
      forWhom,
      eventId,
      name,
      events,
      eventName,
    } = this.state;
    const {roleId} = this.props;

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {modeView ?
            <DocumentViewForm
              documentId={documentId}
              content={content}
              forWhom={forWhom}
              eventId={eventId}
              name={name}
              events={events}
              eventName={eventName}
              changeModeView={this.changeModeView}
              roleId={roleId}
            /> :
            <DocumentReadForm
              documentId={documentId}
              content={content}
              forWhom={forWhom}
              eventId={eventId}
              name={name}
              events={events}
              saveDocument={this.saveDocument}
              changeModeView={this.changeModeView}
              eventName={eventName}
            />
          }
        </div>
      </Content>
    )
  }
}
export default BrowseDocument;
