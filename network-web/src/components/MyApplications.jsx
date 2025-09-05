import React, { useState, useEffect } from 'react';
import { getSincheongJeongbo } from '../utils/api';
import { Table, Pagination, Input, Select, message, Spin } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import './MyApplications.css';

const { Search } = Input;
const { Option } = Select;

const MyApplications = () => {
  const [sincheongJeongboData, setSincheongJeongboData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [filter, setFilter] = useState({ searchTerm: '' });
  const [sort, setSort] = useState({ sortBy: '', sortOrder: 'asc' });
  const userId = 1; // Replace with actual user ID retrieval method


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getSincheongJeongbo(
          userId,
          pagination.current,
          pagination.pageSize,
          sort.sortBy,
          sort.sortOrder,
          filter.searchTerm
        );
        setSincheongJeongboData(data.applications || data.sincheongJeongbo || []); // Handle different possible response keys
        setPagination({ ...pagination, total: data.total });
      } catch (error) {
        console.error('Error fetching 신청 정보:', error);
        message.error('신청 정보를 가져오는 데 실패했습니다. 나중에 다시 시도하십시오.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pagination.current, pagination.pageSize, sort, filter]);

  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
    setSort({ sortBy: sorter.field, sortOrder: sorter.order });
  };


  const handleSearchChange = (e) => {
      setFilter({ ...filter, searchTerm: e.target.value });
  }


  const columns = [
    // Define columns based on the actual data structure of sincheongJeongbo
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: true },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Region', dataIndex: 'region', key: 'region', sorter: true },
    { title: 'Career', dataIndex: 'career', key: 'career', sorter: true },
    { title: 'Self Introduction', dataIndex: 'selfIntroduction', key: 'selfIntroduction', ellipsis: true },
    { title: 'Portfolio URL', dataIndex: 'portfolioUrl', key: 'portfolioUrl', render: (text) => text && <a href={text} target="_blank" rel="noopener noreferrer">{text}</a> },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', sorter: true },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt', sorter: true },

  ];



  return (
    <div>
      <Search placeholder="Search..." allowClear onChange={handleSearchChange} value={filter.searchTerm} style={{ width: 300, marginBottom: 16 }} />
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={sincheongJeongboData}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
        />
      </Spin>
    </div>
  );
};

export default MyApplications;