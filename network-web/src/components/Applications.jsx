"import React, { useState, useEffect } from 'react';
import { getApplicationAPI } from '../api/application';
import { Table, Pagination, Input, Button, Select, Form, message, Spin } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { createApplication } from '../utils/api';

const { Search } = Input;
const { Option } = Select;

const Applications: React.FC = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [filter, setFilter] = useState({ region: '', career: '', search: '' });
  const [sort, setSort] = useState({ sortBy: '', sortOrder: 'asc' });
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // ... (Existing fetchData and related functions)

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const response = await createApplication(values);
      message.success(`Application submitted successfully! ID: ${response.id}`);
      form.resetFields();
      fetchData(); // Refresh the application list
    } catch (error) {
      console.error('Error submitting application:', error);
      message.error('Failed to submit application. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* ... (Existing search, filters, export button) */}

      <Form form={form} onFinish={onFinish} layout=\"vertical\">
        <Form.Item label=\"User ID\" name=\"userId\" rules={[{ required: true, message: 'Please input User ID!' }]}><Input type=\"number\" /></Form.Item>
        <Form.Item label=\"Region\" name=\"region\" rules={[{ required: true, message: 'Please input region!' }]}><Input /></Form.Item>
        <Form.Item label=\"Career\" name=\"career\" rules={[{ required: true, message: 'Please input career!' }]}><Input /></Form.Item>
        <Form.Item label=\"Self Introduction\" name=\"selfIntroduction\" rules={[{ required: true, message: 'Please input self introduction!' }]}><Input.TextArea /></Form.Item>
        <Form.Item label=\"Portfolio URL\" name=\"portfolioUrl\"><Input /></Form.Item>
        <Form.Item>
          <Button type=\"primary\" htmlType=\"submit\" loading={submitting}>Submit Application</Button>
        </Form.Item>
      </Form>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={applications}
          loading={loading} // Use the loading state here
          pagination={pagination}
          onChange={handleTableChange}
          rowKey=\"id\"
        />
      </Spin>
    </div>
  );
};

export default Applications;"