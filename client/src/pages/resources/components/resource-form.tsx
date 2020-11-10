import React from 'react'
import { Form, Input, InputNumber, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default function ResourceForm() {
  return (
    <div className="flex-1 px-12 py-8 space-x-6 bg-gray-50">
      <div className="flex items-start w-full max-w-screen-md mx-auto space-x-8">
        <div className="flex-1 p-4 overflow-hidden bg-white rounded-md shadow">
          <Form
            layout="horizontal"
            initialValues={{ port: 5432 }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
          >
            <img
              src={require('images/resources/postgres-logo.png')}
              className="w-5 h-5 mb-4"
            />
            <div className="font-medium text-gray-800">Connect to Postgres</div>
            <div className="mb-6 text-xs">
              Connect your Postgres database to run queries and create dashboard
            </div>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: 'Please enter the resource name' },
              ]}
            >
              <Input placeholder='i.e. "Production DB (readonly)"' />
            </Form.Item>

            <div className="mb-6 border-b" />

            <div>
              <div className="font-medium text-gray-800">
                Database Configuration
              </div>
              <div className="mb-6 text-xs">
                This configuration would be used to connect with your Postgres
                database
              </div>
            </div>
            <Form.Item
              name="host"
              label="Host"
              rules={[
                {
                  required: true,
                  message: 'Please enter the database host url',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="port"
              label="Port"
              rules={[
                { required: true, message: 'Please enter the database port' },
              ]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              name="database"
              label="Database"
              rules={[
                { required: true, message: 'Please enter the database name' },
              ]}
            >
              <Input placeholder="hn_api_production" />
            </Form.Item>
            <Form.Item
              name="username"
              label="Database Username"
              rules={[
                {
                  required: true,
                  message: 'Please enter the database user name',
                },
              ]}
            >
              <Input placeholder="postgres" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Database Password"
              rules={[
                {
                  required: true,
                  message: 'Please enter the database password',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className="flex p-4 -mx-4 -mb-4 space-x-4 bg-gray-50">
              <Link to="/resources">
                <Button
                  htmlType="button"
                  className="mr-2"
                  icon={<ArrowLeftOutlined />}
                >
                  Back
                </Button>
              </Link>
              <div className="flex-1" />
              <Button htmlType="button" className="mr-2">
                Test Connection
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}