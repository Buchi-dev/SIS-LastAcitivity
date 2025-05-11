import React from 'react'
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import { UserOutlined, TeamOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.png'

const { Header, Footer, Sider, Content } = Layout

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const layoutStyle = {
    minHeight: '100vh',
  }

  const siderStyle = {
    background: '#001529',
    boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
  }

  const logoContainerStyle = {
    padding: '24px',
    textAlign: 'center',
    transition: 'all 0.3s',
  }

  const logoStyle = {
    height: '64px',
    margin: '0 auto',
    display: 'block',
  }

  const headerStyle = {
    padding: '0 24px',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 1,
  }

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '4px 12px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      background: '#f5f5f5',
    }
  }

  const contentStyle = {
    margin: '24px',
    padding: '24px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  }

  const footerStyle = {
    textAlign: 'center',
    background: 'transparent',
  }

  const menuItems = [
    {
      key: '/students',
      icon: <TeamOutlined />,
      label: 'Students',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Users',
    },
  ]

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ]

  return (
    <Layout style={layoutStyle}>
      <Sider width={250} style={siderStyle}>
        <div style={logoContainerStyle}>
          <img src={Logo} alt="SIS Logo" style={logoStyle} />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          theme="dark"
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <h1 style={{ margin: 0, fontSize: '20px', color: '#1890ff' }}>
            Student Information System
          </h1>
          <Dropdown
            menu={{ items: userMenuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <div style={userInfoStyle}>
              <Avatar 
                style={{ 
                  backgroundColor: '#1890ff',
                  verticalAlign: 'middle' 
                }} 
                icon={<UserOutlined />} 
              />
              <div style={{ lineHeight: '1.2' }}>
                <div style={{ 
                  fontWeight: 500, 
                  color: '#262626',
                  fontSize: '14px' 
                }}>
                  {user.firstName} {user.lastName}
                </div>
                <div style={{ 
                  color: '#8c8c8c',
                  fontSize: '12px' 
                }}>
                  {user.email}
                </div>
              </div>
              <DownOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
            </div>
          </Dropdown>
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>
          <div style={{ color: '#888' }}>
            Student Information System ©{new Date().getFullYear()}
          </div>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout