import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Card, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import useModal from '../hooks/useModal';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [form] = Form.useForm();
  const { isModalVisible, editingItem: editingStudent, showModal, hideModal } = useModal(form);

  // Define course options
  const courseOptions = [
    { value: 'BS Information Technology', label: 'BS Information Technology' },
    { value: 'BS Computer Science', label: 'BS Computer Science' },
    { value: 'BS Information Systems', label: 'BS Information Systems' },
    { value: 'BS Civil Engineering', label: 'BS Civil Engineering' },
    { value: 'BS Mechanical Engineering', label: 'BS Mechanical Engineering' },
    { value: 'BS Electrical Engineering', label: 'BS Electrical Engineering' },
    { value: 'BS Electronics Engineering', label: 'BS Electronics Engineering' },
    { value: 'BS Chemical Engineering', label: 'BS Chemical Engineering' },
    { value: 'BS Architecture', label: 'BS Architecture' },
    { value: 'BS Business Administration', label: 'BS Business Administration' },
    { value: 'BS Accountancy', label: 'BS Accountancy' },
    { value: 'BS Psychology', label: 'BS Psychology' },
    { value: 'BS Mathematics', label: 'BS Mathematics' },
    { value: 'BS Biology', label: 'BS Biology' },
    { value: 'BS Nursing', label: 'BS Nursing' },
    { value: 'BS Tourism Management', label: 'BS Tourism Management' }
  ];

  // Define year options
  const yearOptions = [
    { value: '1st Year', label: '1st Year' },
    { value: '2nd Year', label: '2nd Year' },
    { value: '3rd Year', label: '3rd Year' },
    { value: '4th Year', label: '4th Year' },
    { value: '5th Year', label: '5th Year' },
  ];

  // Define course colors for tags with custom hex colors
  const courseColors = {
    'BS Information Technology': '#2f54eb', // Bright blue
    'BS Computer Science': '#13c2c2', // Cyan
    'BS Information Systems': '#1d39c4', // Deep blue
    'BS Civil Engineering': '#fa8c16', // Orange
    'BS Mechanical Engineering': '#fa541c', // Volcano
    'BS Electrical Engineering': '#fadb14', // Gold
    'BS Electronics Engineering': '#a0d911', // Lime
    'BS Chemical Engineering': '#52c41a', // Green
    'BS Architecture': '#722ed1', // Purple
    'BS Business Administration': '#eb2f96', // Magenta
    'BS Accountancy': '#f5222d', // Red
    'BS Psychology': '#ffa39e', // Soft pink
    'BS Mathematics': '#40a9ff', // Light blue
    'BS Biology': '#389e0d', // Forest green
    'BS Nursing': '#08979c', // Teal
    'BS Tourism Management': '#531dab' // Deep purple
  };

  // Define year colors with gradients
  const yearColors = {
    '1st Year': { color: '#BAE7FF', textColor: '#0050B3' }, // Light blue with dark blue text
    '2nd Year': { color: '#B7EB8F', textColor: '#135200' }, // Light green with dark green text
    '3rd Year': { color: '#FFD591', textColor: '#873800' }, // Light orange with dark orange text
    '4th Year': { color: '#FFCCC7', textColor: '#820014' }  // Light red with dark red text
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      message.error('Error fetching students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const columns = [
    { 
      title: 'ID Number', 
      dataIndex: 'idNumber', 
      key: 'idNumber',
      sorter: (a, b) => a.idNumber.localeCompare(b.idNumber)
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
      title: 'Course', 
      dataIndex: 'course', 
      key: 'course',
      sorter: (a, b) => a.course.localeCompare(b.course),
      render: (course) => (
        <Tag 
          color={courseColors[course] || 'default'} 
          style={{ 
            minWidth: '150px', 
            textAlign: 'center',
            padding: '4px 8px',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          {course}
        </Tag>
      )
    },
    { 
      title: 'Year', 
      dataIndex: 'year', 
      key: 'year',
      sorter: (a, b) => a.year.localeCompare(b.year),
      render: (year) => {
        const yearStyle = yearColors[year] || { color: '#d9d9d9', textColor: '#000000' };
        return (
          <Tag 
            style={{ 
              minWidth: '80px', 
              textAlign: 'center',
              padding: '4px 8px',
              backgroundColor: yearStyle.color,
              color: yearStyle.textColor,
              border: `1px solid ${yearStyle.textColor}`,
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            {year}
          </Tag>
        )
      }
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

  const handleEdit = (student) => {
    showModal(student);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      message.error('Error deleting student');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingStudent) {
        await axios.patch(`http://localhost:5000/api/students/${editingStudent._id}`, values);
        message.success('Student updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/students', values);
        message.success('Student added successfully');
      }
      hideModal();
      form.resetFields();
      fetchStudents();
    } catch (error) {
      message.error('Error saving student');
    }
  };

  return (
    <Card 
      title={<h2 style={{ margin: 0 }}>Student Management</h2>}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add Student
        </Button>
      }
      bordered={false}
    >
      <Table 
        columns={columns} 
        dataSource={students} 
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} students`,
        }}
      />

      <Modal
        title={editingStudent ? 'Edit Student' : 'Add Student'}
        open={isModalVisible}
        onCancel={hideModal}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="idNumber"
              label="ID Number"
              rules={[{ required: true, message: 'Please input the ID number!' }]}
            >
              <Input placeholder="Enter ID number" maxLength={20} />
            </Form.Item>

            <Form.Item
              name="course"
              label="Course"
              rules={[{ required: true, message: 'Please select a course!' }]}
            >
              <Select
                placeholder="Select course"
                options={courseOptions}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please input the first name!' }]}
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
              rules={[{ required: true, message: 'Please input the last name!' }]}
            >
              <Input placeholder="Enter last name" maxLength={30} />
            </Form.Item>
          </div>

          <Form.Item
            name="year"
            label="Year Level"
            rules={[{ required: true, message: 'Please select a year!' }]}
          >
            <Select
              placeholder="Select year level"
              options={yearOptions}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={hideModal}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingStudent ? 'Update' : 'Add'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Students;