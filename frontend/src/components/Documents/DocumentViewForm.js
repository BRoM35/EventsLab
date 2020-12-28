import React, { Component } from 'react';
import '../Events/EventForm.css';
import { Layout, Button } from 'antd';
const { Content } = Layout;


class EventViewForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      content,
      forWhom,
      name,
      roleId,
      eventName
    } = this.props;

    return (
      <div className="eventContainer">
        <div className="eventRow">
          <span className="eventTitle">Название документа: </span>
          <span className="eventValue">{name}</span>
        </div>
        <div className="eventRow">
          <span className="eventTitle">Конент: </span>
          <span className="eventValue">{content}</span>
        </div>
        <div className="eventRow">
          <span className="eventTitle">Для кого: </span>
          <span className="eventValue">{forWhom}</span>
        </div>
        <div className="eventRow">
          <span className="eventTitle">Для какого события: </span>
          <span className="eventValue">
            {eventName}
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
