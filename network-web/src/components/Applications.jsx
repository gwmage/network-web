import React, { useState, useEffect } from 'react';
import { fetchData as fetchAppData } from '../utils/api';
import { Table, Pagination, Input, Button, Select, Form, message, Spin } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import ApplicationForm from './ApplicationForm';

const { Search } = Input;
const { Option } = Select;

const Applications: React.FC = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [filter, setFilter] = useState({ region: '', career: '', search: '' });
  const [sort, setSort] = useState({ sortBy: '', sortOrder: 'asc' });


  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.current,
        limit: pagination.pageSize,
        ...filter,
        ...sort,
      });

      const data = await fetchAppData(`/applications?${params.toString()}`);
      setApplications(data.applications);
      setPagination({ ...pagination, total: data.total });
    } catch (error) {
      console.error('Error fetching applications:', error);
      message.error('Failed to fetch applications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, filter, sort]);

  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
    setFilter(filters);
    setSort({ sortBy: sorter.field, sortOrder: sorter.order });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Region', dataIndex: 'region', key: 'region' },
    { title: 'Career', dataIndex: 'career', key: 'career' },
    { title: 'Self Introduction', dataIndex: 'selfIntroduction', key: 'selfIntroduction', ellipsis: true },
    { title: 'Portfolio URL', dataIndex: 'portfolioUrl', key: 'portfolioUrl', render: (text) => <a href={text} target=\"_blank\" rel=\"noopener noreferrer\">{text}</a> },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];


  return (
    <div>
      <ApplicationForm refreshData={fetchData} />

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={applications}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey=\"id\"
        />
      </Spin>
    </div>
  );
};

export default Applications;