import React, { Component } from 'react';
import './Events.css';
import {Button, Layout, Modal, Table} from 'antd';
import CreateForm from './CreateEvents';
import { Link } from "react-router-dom";
import moment from 'moment';
const { Content } = Layout;

moment.locale('ru');

class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      roleId: this.props.roleId,
      isShowModalCreate: false
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    const response = await fetch(`http://localhost:3001/events`);
    const events = await response.json();

    this.setState({events})
  }

  saveEvent = async (params) => {
    const response = await fetch(`http://localhost:3001/events`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const events = await response.json();

    this.setState({events, isShowModalCreate: false});
  }

  showModal = (isOpen) => {
    this.setState({isShowModalCreate: isOpen})
  };


  createEvent = (params) => {
    this.saveEvent(params);
  }

  deleteEvent = async (id) => {
    const response = await fetch(`http://localhost:3001/event/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    this.getEvents();
  }

  renderTable = () => {
    const {events} = this.state;
    const data = [];

    const columns = [
      {
        title: 'Событие',
        dataIndex: 'name',
        align: 'center',
        render: text => {
          const linkTo = `/events/browse/${text[1]}`;
          return <Link to={linkTo}>{text[0]}</Link>
        }
      },
      {
        title: 'Даты проведения',
        dataIndex: 'date',
        align: 'center'
      },
      {
        title: 'Участники',
        dataIndex: 'part',
        align: 'center'
      },
      {
        title: '',
        dataIndex: 'part',
        align: 'center',
        render: (text, record) => {
          if (this.state.roleId === 1) {
            return <Button onClick={() => this.deleteEvent(record.key)} className="buttonEventsAdd"
              type="danger">
              Удалить
            </Button>
          }
        }
      }
    ];

    events.sort((a,b) => a.id - b.id);

    events.length && events.forEach((item, i) => {
      const id = item.id;
      const name = item.name;
      const startDate = item.startDate;
      const endDate = item.endDate;
      data.push({
        key: id,
        name: [name, id],
        date: `${startDate} - ${endDate}`,
        part: item.part
      })
      }
    )

    return <Table className="tableEvents" columns={columns} dataSource={data} size="middle" />
  }

  render() {
    const {
      roleId,
      isShowModalCreate
    } = this.state;

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="contentEvents" style={{ padding: 24, minHeight: 360 }}>
          {roleId === 1 ?
            <Button
              onClick={() => this.showModal(true)}
              className="buttonEventsAdd"
              type="primary">
              Добавить
            </Button> : null
          }
          {this.renderTable()}
        </div>
        <Modal
          title="Добавить событие"
          visible={isShowModalCreate}
          footer={null}
          onCancel={() => this.showModal(false)}
        >
          <CreateForm
            isClose={this.showModal}
            createEvent={this.createEvent}/>
        </Modal>
      </Content>
    )
  }
}
export default BrowseEvents;
