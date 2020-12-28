import React, { Component } from 'react';
import './Events.css';
import './EventForm.css'
import {Button, Layout, Table, Cascader} from 'antd';
const { Content } = Layout;

class EventParticipants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      participants: [],
      name: '',
      id: 0,
      title: '',
      initUser: 0,
      initEvent: 0,
      initPart: 0
    }
  }

  componentDidMount() {
    this.getUsers();
    this.getEvent();
    this.getParticipants();
  }

  getUsers = async () => {
    const response = await fetch(`http://localhost:3001/users/admin`);
    const users = await response.json();
    this.setState({users, initUser: 1})
  }

  getEvent = async () => {
    const path = document.location.pathname;
    const id = +path.replace('/events/parts/','')
    const response = await fetch(`http://localhost:3001/event/${id}`);
    const event = await response.json();
    const name = event[0].name;

    this.setState({
      name, id, initEvent: 1
    })
  }

  getParticipants = async () => {
    const path = document.location.pathname;
    const id = +path.replace('/events/parts/','')
    const response = await fetch(`http://localhost:3001/participants/${id}`);
    const participants = await response.json();
    this.setState({participants, initPart: 1})
  }

  saveParticipants = async (params) => {
    const role = this.state.users.filter(user => user.id === params.userId)[0].rolePart;

    const data = {
      userId: params.userId,
      status: 'asigned',
      eventId: this.state.id,
      role: role === undefined ? 'Expert' : role
    }

    const response = await fetch(`http://localhost:3001/participants/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    this.getParticipants();
  }

  deleteParticipant = async (id) => {
    const response = await fetch(`http://localhost:3001/participant/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.getParticipants();
    this.getUsers();
  }

  changeRole = (value, params) => {
    const {users} = this.state;
    const newUsers = [];

    users.forEach(user => {
      const newUser = user;

      if (params.userId === user.id) {
        newUser.rolePart = value[0];
      }

      newUsers.push(newUser);
    })

    this.setState({users: newUsers})
  }

  prepareData = () => {
    const {users, participants} = this.state;
    const data = [];

    users.map(user => {
      const part = participants.filter(part => user.id === part.userId);

      if (part.length) {
        user.statusPart = part[0].status;
        user.rolePart = part[0].role;
        user.partId = part[0].id;
      }

      data.push(user);
    })

    return data;
  }

  renderTable = () => {
    const data = this.prepareData();
    const {initUser, initEvent, initPart} = this.state;

    const roleValues = [
      {
        value: 'Expert',
        label: 'Expert'
      },
      {
        value: 'Competitor',
        label: 'Competitor'
      }
    ]

    const columns = [
      {
        title: 'Фио',
        dataIndex: 'fio',
        align: 'center',
        render: text => {
          return <p>{text[0]} {text[1]}</p>
        }
      },
      {
        title: 'Название ивента',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: 'Роль',
        dataIndex: 'role',
        align: 'center',
        render: (text, record) => {
          const defVal = text && text.length ? [text] : ['Expert'];
          return <Cascader defaultValue={defVal} options={roleValues} onChange={(value) => this.changeRole(value, record)} />
        }
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        align: 'center',
        render: (text, record) => {
          return (
            <>
              {
                text === 'asigned' ?
                  <Button onClick={() => this.deleteParticipant(record.partId)}  type="danger">Удалить</Button> :
                  <Button onClick={() => this.saveParticipants(record)} type="primary">Добавить</Button>
              }
            </>
          )
        }
      },
    ];

    const dataSource = [];

    if (initUser && initEvent && initPart) {
      data.length && data.forEach((item, i) => {
        dataSource.push({
          key: item.id,
          fio: [item.firstName, item.lastName],
          name: this.state.name,
          role: item.rolePart,
          status: item.statusPart,
          userId: item.id,
          partId: item.partId
        })
      })
    }

    return <Table className="tableUsers" columns={columns} dataSource={dataSource} size="middle" />
  }

  render() {
    return (
      <Content style={{ margin: '24px 16px 0' }}>
        {this.renderTable()}
      </Content>
    )
  }
}
export default EventParticipants;
