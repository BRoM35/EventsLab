import React, { Component } from 'react';
import './Users.css';
import { Button, Layout, Modal, Table } from 'antd';
import {Link} from "react-router-dom";
import moment from "moment";
const { Content } = Layout;

class BrowseUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    const response = await fetch(`http://localhost:3001/users/admin`);
    const users = await response.json();

    this.setState({users})
  }

  renderTable = () => {
    const {users} = this.state;
    const data = [];

    const sortData = [];

    users.forEach((item, i) => {
      if (item.status === 'conf_mail') {
        sortData.push(item);
      } else {
        data.push(item);
      }
    })

    const finalData = sortData.concat(data)

    console.log(users)

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
        title: 'Статус',
        dataIndex: 'status',
        align: 'center',
        render: (text, record) => {
          return (
            <>
              {
                text === 'conf_mail' ?
                  <Button onClick={() => this.confirmUser(record.key)} type="primary">Подтвердить</Button> : null
              }
              <Button onClick={() => this.deleteUser(record.key)} style={{marginLeft: '15px'}} type="danger">Удалить</Button>
            </>
          )
        }
      },
    ];

    const dataSource = [];

    finalData.length && finalData.forEach((item, i) => {
      dataSource.push({
        key: item.id,
        fio: [item.firstName, item.lastName],
        status: item.status
      })
    }
  )

    return <Table className="tableUsers" columns={columns} dataSource={dataSource} size="middle" />
  }

  confirmUser = async (id) => {
    const response = await fetch(`http://localhost:3001/users/admin/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    const users = await response.json();

    this.setState({users});
  }

  deleteUser = async (id) => {
    const response = await fetch(`http://localhost:3001/users/admin/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    const users = await response.json();

    this.setState({users});
  }


  render() {

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {this.renderTable()}
        </div>
      </Content>
    )
  }
}
export default BrowseUser;
