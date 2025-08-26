```typescript
import React, { useState, useEffect } from 'react';
import { getApplicationAPI } from '../api/application';
import { Table, Pagination, Input, Button, Select } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

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
      const res = await getApplicationAPI({
        page: pagination.current,
        limit: pagination.pageSize,
        region: filter.region,
        career: filter.career,
        search: filter.search,
        sortBy: sort.sortBy,
        sortOrder: sort.sortOrder,
      });
      setApplications(res.data);
      setPagination({ ...pagination, total: res.meta.totalItems });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, filter, sort]);

  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination({ ...pagination, current: newPagination.current, pageSize: newPagination.pageSize });
    setSort({ sortBy: sorter.field, sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc' });
  };

  const handleSearch = (value) => {
    setFilter({ ...filter, search: value });
    setPagination({ ...pagination, current: 1 }); // Reset to first page when searching
  };

  const handleFilterChange = (field, value) => {
    setFilter({ ...filter, [field]: value });
    setPagination({ ...pagination, current: 1 }); // Reset to first page when filtering
  };

  const handleExport = async (format) => {
    // Implement export logic here, e.g., using a separate API endpoint
    console.log(`Exporting data in ${format} format with filters:`, filter);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Region', dataIndex: 'region', key: 'region', filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Select
          value={selectedKeys[0]}
          onChange={(value) => setSelectedKeys(value ? [value] : [])}
          style={{ width: 120 }}
          onSelect={confirm}
          onBlur={confirm}
        >
          <Option value="">All</Option>
          <Option value="서울">서울</Option>
          <Option value="경기">경기</Option>
          {/* Add more region options as needed */}
        </Select>
      ),
      onFilter: (value, record) => record.region.startsWith(value),
      filterSearch: true,
    },
    { title: 'Career', dataIndex: 'career', key: 'career', sorter: true },
    { title: 'Self Introduction', dataIndex: 'selfIntroduction', key: 'selfIntroduction' },
    { title: 'Portfolio URL', dataIndex: 'portfolioUrl', key: 'portfolioUrl' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  return (
    <div>
      <Search placeholder="Search applications" onSearch={handleSearch} style={{ width: 300, marginBottom: 16 }} />
      <Select placeholder="Filter by region" style={{ width: 120, marginRight: 8 }} onChange={(value) => handleFilterChange('region', value)}>
          <Option value="">All</Option>
          <Option value="서울">서울</Option>
          <Option value="경기">경기</Option>
      </Select>
       <Select placeholder="Filter by Career" style={{ width: 120, marginRight: 8 }} onChange={(value) => handleFilterChange('career', value)}>
          <Option value="">All</Option>
          <Option value="1년">1년</Option>
          <Option value="2년">2년</Option>
      </Select>
      <Button type="primary" icon={<ExportOutlined />} onClick={() => handleExport('csv')} style={{ marginBottom: 16 }}>Export CSV</Button>
      <Table
        columns={columns}
        dataSource={applications}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />
    </div>
  );
};

export default Applications;

```