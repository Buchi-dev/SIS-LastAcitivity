import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Card, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import useModal from '../hooks/useModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { isModalVisible, editingItem: editingUser, showModal, hideModal } = useModal(form);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { 
      title: 'User ID', 
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a, b) => a.userId.localeCompare(b.userId)
    },
    { 
      title: 'Full Name', 
      key: 'fullName',
      render: (record) => {
        const middleName = record.middleName ? ` ${record.middleName} ` : ' ';
        return `${record.firstName}${middleName}${record.lastName}`;
      },
      sorter: (a, b) => {
        const fullNameA = `${a.firstName} ${a.middleName || ''} ${a.lastName}`;
        const fullNameB = `${b.firstName} ${b.middleName || ''} ${b.lastName}`;
        return fullNameA.localeCompare(fullNameB);
      }
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)}
            size="small"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (user) => {
    showModal(user);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Error deleting user');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      if (editingUser) {
        await axios.patch(`http://localhost:5000/api/users/${editingUser._id}`, values);
        message.success('User updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/users', values);
        message.success('User added successfully');
      }
      
      hideModal();
      fetchUsers();
    } catch (error) {
      if (error.isAxiosError) {
        message.error(error.response?.data?.message || 'Error saving user');
      }
    } finally {
      setLoading(false);
    }
  };

  const addUser = () => {
    showModal();
  };

  return (
    <Card 
      title={<h2 style={{ margin: 0 }}>User Management</h2>}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addUser}
        >
          Add User
        </Button>
      }
      bordered={false}
    >
      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
        }}
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        open={isModalVisible}
        onCancel={hideModal}
        footer={[
          <Button key="cancel" onClick={hideModal}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleSubmit}
            loading={loading}
          >
            {editingUser ? 'Update' : 'Add'}
          </Button>
        ]}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ middleName: '' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="userId"
              label="User ID"
              rules={[
                {
                  required: !editingUser,
                  message: 'Please input the user ID!'
                }
              ]}
            >
              <Input 
                disabled={!!editingUser} 
                placeholder="Enter user ID"
                maxLength={20}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input the email!'
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email!'
                }
              ]}
            >
              <Input placeholder="Enter email" maxLength={50} />
            </Form.Item>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: 'Please input the first name!'
                }
              ]}
            >
              <Input placeholder="Enter first name" maxLength={30} />
            </Form.Item>

            <Form.Item
              name="middleName"
              label="Middle Name"
            >
              <Input placeholder="Enter middle name" maxLength={30} />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: 'Please input the last name!'
                }
              ]}
            >
              <Input placeholder="Enter last name" maxLength={30} />
            </Form.Item>
          </div>

          {!editingUser && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input the password!'
                }
              ]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Card>
  );
};

export default Users;