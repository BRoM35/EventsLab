import React, { Component } from 'react';
import './Events.css';
import './EventForm.css'
import {Button, Cascader, Form, Input, Layout, Modal, Table} from 'antd';
import EventViewForm from "./EventViewForm";
import EventReadForm from "./EventReadForm";
import {Link} from "react-router-dom";
import CreateDocument from "../Documents/CreateDocument";
const { Content } = Layout;

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

class BrowseEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modeView: true,
      eventId: 0,
      startDate: '',
      endDate: '',
      name: 'Первое событие',
      participants: '0',
      documents: [],
      participantsList: [],
      role: '',
      isShowModal: false,
      signDocId: 0,
      docId: 0,
      userPin: ''
    }
  }

  componentDidMount() {
    this.getEvent();
    this.getDocuments();
    this.getPin();
  }

  getPin = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userPin = user.pin;

    this.setState({userPin});
  }

  getParticipants = async (id) => {
    const response = await fetch(`http://localhost:3001/participants/${id}`);
    const participantsList = await response.json();

    const userId = JSON.parse(localStorage.getItem('currentUser')).id;
    const roleUserParticipants =
      participantsList.filter(part => part.userId === userId);
    let role = '';

    if (roleUserParticipants.length) {
      role = roleUserParticipants[0]['role'];
    }

    this.setState({participantsList, role })
  }

  getDocuments = async () => {
    const path = document.location.pathname;
    const id = +path.replace('/events/browse/','')
    const response = await fetch(`http://localhost:3001/documents/${id}`);
    const documents = await response.json();

    this.setState({
      documents
    })
  }

  getEvent = async () => {
    const path = document.location.pathname;
    const id = +path.replace('/events/browse/','')
    const response = await fetch(`http://localhost:3001/event/${id}`);
    const event = await response.json();

    const eventId = event[0].id;
    const startDate = event[0].startDate;
    const endDate = event[0].endDate;
    const name = event[0].name;
    const participants = event[0].part;

    this.setState({
      eventId, startDate, endDate, name, participants
    })
    this.getParticipants(eventId);
  }

  saveEvent = async (params) => {
    const id = this.state.eventId;
    const response = await fetch(`http://localhost:3001/events/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const event = await response.json();

    const startDate = event[0].startDate;
    const endDate = event[0].endDate;
    const name = event[0].name;

    this.setState({
      startDate, endDate, name, modeView: true
    })
  }

  assignEvent = () => {
    const id = this.state.eventId;
    document.location.href = `/events/parts/${id}`;
  }

  changeModeView = (mode) => {
    this.setState({
      modeView: mode
    })
  }

  signDocument = async (id) => {
    const {docId} = this.state;
    const userId = JSON.parse(localStorage.getItem('currentUser')).id;
    console.log(docId, 'Типо подписан')
    const response = await fetch(`http://localhost:3001/document/sign/${docId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId})
    });
    //
    const documents = await response.json();
    //
    this.showModal(false);
    this.setState({
      documents
    })
  }

  renderTable = () => {
    const {documents, role} = this.state;
    const {roleId} = this.props;
    const data = [];
    const filterDoc = documents.filter(doc => doc.forWhom === role || roleId === 1);

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
        title: 'Состояние',
        dataIndex: 'status',
        align: 'center',
        render: (text, record) => {
          if (text === 'not signed') {
            if (record.forWhom === role) {
              return <Button onClick={() => this.showModalSign(record.key)} className="buttonEventsAdd"
                             type="primary">
                Подписать
              </Button>
            } else {
              return <p>Не подписан</p>
            }

          } else {
            return <p>Подписан</p>
          }
        }
      }
    ];

    if (filterDoc.length) {
      filterDoc.forEach((item, i) => {
          const id = item.id;
          const name = item.name;
          data.push({
            key: id,
            name: [name, id],
            status: item.status,
            forWhom: item.forWhom
          })
        }
      )
      return <Table className="tableEvents" columns={columns} dataSource={data} size="middle" />
    }
  }

  showModalSign = (id) => {
    this.setState({docId: id});
    this.showModal(true);
  }

  showModal = (isOpen) => {
    this.setState({isShowModal: isOpen})
  };

  render() {
    const {
      modeView,
      eventId,
      startDate,
      endDate,
      name,
      participants,
      userPin,
      isShowModal
    } = this.state;
    const {
      roleId
    } = this.props;

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="event">
          {modeView ?
            <EventViewForm
              eventId={eventId}
              startDate={startDate}
              endDate={endDate}
              name={name}
              participants={participants}
              assignEvent={this.assignEvent}
              changeModeView={this.changeModeView}
              roleId={roleId}
            /> :
            <EventReadForm
              eventId={eventId}
              startDate={startDate}
              endDate={endDate}
              name={name}
              participants={participants}
              changeModeView={this.changeModeView}
              roleId={roleId}
              saveEvent={this.saveEvent}
            />
          }

        </div>
        {modeView ?
          this.renderTable() : null
        }

        <Modal
          title="Подписать документ"
          visible={isShowModal}
          footer={null}
          onCancel={() => this.showModal(false)}
        >
          <Form
            {...formItemLayout}
            style = {{width: '470px', margin: '20px 0'}}
            layout={'horizontal'}
            onFinish={this.signDocument}
          >
            <Form.Item rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  const val = value === undefined ? '' : `${value}`;
                  console.log(val,userPin);
                  if (userPin === val) {
                    return Promise.resolve();
                  }

                  return Promise.reject('Ввёден неправильный ПИН');
                },
              }),
            ]} name="name" label="Введите пин">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item style={{justifyContent: 'center'}}>
              <Button className="buttonOkFormEvents" htmlType='submit' type="primary">Ок</Button>
              <Button onClick={() => this.showModal(false)} type="secondary">Отмена</Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    )
  }
}
export default BrowseEvent;
