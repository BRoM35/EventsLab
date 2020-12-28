import React, { Component } from 'react';
import './Profile.css';
import { Layout, Image, Button} from 'antd';
import InfoForm from './InfoForm';
import EditForm from './Forms/EditForm';

const { Content } = Layout;

const fakeInfo = {
  firstName: 'Роман',
  lastName: 'Болвин',
  country: 'Тюмень',
  about: 'Лучший тестеровщик в мире и по совместительству программист',
  email: 'roman@mail.ru',
  password: '123qwe',
  pin: '123321123',
  file: '',
  id: 1,
  role: [],
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: fakeInfo.id,
      role: fakeInfo.role,
      file: fakeInfo.file,
      blockView: 'view',
      firstName: fakeInfo.firstName,
      lastName: fakeInfo.lastName,
      country: fakeInfo.country,
      about: fakeInfo.about,
      email: fakeInfo.email,
      password: fakeInfo.password,
      pin: fakeInfo.pin,
      roleId: 3
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userId = +localStorage.getItem('userId');
    const response = await fetch(`http://localhost:3001/user/${userId}`);
    const user = await response.json();
    this.setState({
      ...user[0], id: userId
    })
  }

  saveInfo = async (params) => {
    const {id} = this.state;

    const response = await fetch(`http://localhost:3001/user/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const user = await response.json();
    this.setState({...user[0]});
    this.closeEditNode();
  }

  saveUserInfo = async (info) => {
    const newPassword = {};
    if (info.newPassword && info.newPassword.length) {
      newPassword['password'] = info.newPassword;
      delete info.repeatPassword;
    } else {
      newPassword['password'] = this.state.password;
    }

    const newParams = {
      firstName: info.firstName,
      lastName: info.lastName,
      country: info.country,
      about: info.about,
      email: info.email,
      pin: info.pin,
      file: this.state.file,
      ...newPassword
    }

    this.saveInfo(newParams)
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  deletePhoto = () => {
    this.setState({
      file: ''
    })
  }

  setEditMode = () => {
    this.setState({
      blockView: 'edit'
    })
  }

  closeEditNode = () => {
    this.setState({
      blockView: 'view'
    })
  }

  render() {
    const {
      file,
      blockView,
      firstName,
      lastName,
      country,
      about,
      email,
      password,
      pin,
    } = this.state;

    let hidePassword = '';
    for (let i = 0; i < password.length; i++) hidePassword += '*';


    return (
      <Content
        style={{
          display: "flex",
          justifyContent: 'center',
          padding: '150px'
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: 'column'
          }}
        >
          <Image
            width={300}
            height={300}
            src={file !== '' ? file :
              'data:image/png;base64,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'
            }
          />
          {blockView === 'edit' ?
            <>
              <input onChange={this.handleChange} type="file" name="file" id="file" className="inputfile" />
              <label for="file">Upload</label>
              <Button onClick={this.deletePhoto} type="primary">Delete</Button>
            </> :
            null
          }

        </div>
        <div
          style={{
            display: "flex",
            flexDirection: 'column',
            marginLeft: '150px'
          }}
        >
          {
            blockView === 'view' ?
              <InfoForm
                firstName={firstName}
                lastName={lastName}
                country={country}
                about={about}
                email={email}
                password={hidePassword}
                pin={pin}
                setEditMode={this.setEditMode}
              /> :
              <EditForm
                firstName={firstName}
                lastName={lastName}
                country={country}
                about={about}
                email={email}
                password={hidePassword}
                pin={pin}
                setEditMode={this.setEditMode}
                saveNewInfo={this.saveUserInfo}
                closeEditNode={this.closeEditNode}
              />
          }

        </div>


      </Content>
    )
  }
}
export default Profile;
