import React, { Component } from 'react';
import '../Events/Events.css';
import {Button, Layout, Modal, Table} from 'antd';
import CreateDocument from "./CreateDocument";
import {Link} from "react-router-dom";
const { Content } = Layout;


class BrowseDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      roleId: this.props.roleId,
      isShowModalCreate: false,
      events: []
    }
  }

  componentDidMount() {
    this.getDocuments()
    this.getEvents();
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

  getDocuments = async () => {
    const response = await fetch(`http://localhost:3001/documents`);
    const documents = await response.json();

    this.setState({documents})
  }

  createDocument = async (params) => {
    const response = await fetch(`http://localhost:3001/documents`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const documents = await response.json();

    this.setState({documents, isShowModalCreate: false});
  }

  deleteDocument = async (id) => {
    const response = await fetch(`http://localhost:3001/document/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const documents = await response.json();

    this.setState({documents});
  }

  renderTable = () => {
    const {documents} = this.state;
    const data = [];

    const columns = [
      {
        title: 'Документ',
        dataIndex: 'name',
        align: 'center',
        render: text => {
          const linkTo = `/documents/browse/${text[1]}`;
          return <Link to={linkTo}>{text[0]}</Link>
        }
      },
      {
        title: 'Для кого',
        dataIndex: 'whom',
        align: 'center'
      },
      {
        title: '',
        dataIndex: 'part',
        align: 'center',
        render: (text, record) => {
          if (this.state.roleId === 1) {
            return <Button onClick={() => this.deleteDocument(record.key)} className="buttonEventsAdd"
                           type="danger">
              Удалить
            </Button>
          }
        }
      }
    ];

    documents.length && documents.forEach((item, i) => {
        const id = item.id;
        const name = item.name;
        const forWhom = item.forWhom;
        data.push({
          key: id,
          name: [name, id],
          whom: forWhom,
        })
      }
    )

    return <Table className="tableEvents" columns={columns} dataSource={data} size="middle" />
  }

  showModal = (isOpen) => {
    this.setState({isShowModalCreate: isOpen})
  };

  render() {
    const {roleId} = this.props;
    const {isShowModalCreate, events} = this.state;
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
          title="Добавить документ"
          visible={isShowModalCreate}
          footer={null}
          onCancel={() => this.showModal(false)}
        >
          <CreateDocument
            events={events}
            isClose={this.showModal}
            createDocument={this.createDocument}/>
        </Modal>
      </Content>
    )
  }
}
export default BrowseDocuments;
