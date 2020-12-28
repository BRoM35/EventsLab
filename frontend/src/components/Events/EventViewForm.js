import React, { Component } from 'react';
import './EventForm.css';
import { Layout, Button } from 'antd';
const { Content } = Layout;


class EventViewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {
      eventId,
      startDate,
      endDate,
      name,
      participants,
      roleId
    } = this.props;

    return (
      <div className="eventContainer">
        <div className="eventRow">
          <span className="eventTitle">Название ивента: </span>
          <span className="eventValue">{name}</span>
        </div>
        <div className="eventRow">
          <span className="eventTitle">Начало ивента: </span>
          <span className="eventValue">{startDate}</span>
        </div>
        <div className="eventRow">
          <span className="eventTitle">Окончание ивента: </span>
          <span className="eventValue">{endDate}</span>
        </div>
        <div className="eventRow">
          <span className="eventTitle">Количество участников: </span>
          <span className="eventValue">
            {participants}
            {roleId === 1 ? <Button onClick={this.props.assignEvent} type="primary">Добавить</Button> : null}
          </span>
        </div>
        <div className="eventRowRead">
          {roleId === 1 ?
            <Button
              onClick={() => this.props.changeModeView(false)}
              className="eventReadButton"
              type="primary">
                Редактировать
            </Button> : null
          }
        </div>
      </div>
    )
  }
}
export default EventViewForm;
