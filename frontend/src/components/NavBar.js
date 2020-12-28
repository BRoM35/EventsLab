import React from 'react';
import './NavBar.css';
import 'antd/dist/antd.css';
import { Menu, Button, Layout } from 'antd';
import {
  Link,
} from "react-router-dom";

import {
  UserOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;
const login = localStorage.getItem('login');

class NavBar extends React.Component {
  state = {
    collapsed: false
  };

  render() {
    const {logged, roleId} = this.props;
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo">
          <span>Events</span>
        </div>
        { logged ?
          <Menu
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
              <Menu.Item key="1">
                <Link to="/profile">Profile</Link>
              </Menu.Item>
            </SubMenu>
            {roleId === 1 ?
              <SubMenu key="sub2" icon={<UsergroupAddOutlined />} title="Users">
                <Menu.Item key="3">
                  <Link to="/users/browse">Browse</Link>
                </Menu.Item>
              </SubMenu> : null
            }

            <SubMenu key="sub3" icon={<CalendarOutlined />} title="Events">
              <Menu.Item key="6">
                <Link to="/events/browse">Browse</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<FileOutlined />} title="Documents">
              <Menu.Item key="9">
                <Link to="/documents/browse">Browse</Link>
              </Menu.Item>
            </SubMenu>
          </Menu> : null
        }

      </Sider>
    );
  }
}

export default NavBar;
