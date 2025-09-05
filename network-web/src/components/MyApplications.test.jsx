import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MyApplications from './MyApplications';
import { getSincheongJeongbo } from '../utils/api';
import { message } from 'antd';

jest.mock('../utils/api');
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    error: jest.fn(),
  },
}));


describe('MyApplications Component', () => {
  it('renders loading state while fetching data', () => {
    render(<MyApplications />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Assuming Ant Design Spin uses a progressbar role
  });

  it('fetches and displays 신청 정보', async () => {
    const mockData = {
      total: 20,
      applications: [
        { id: 1, userId: 1, region: '서울', career: '개발자', createdAt: '2024-01-01', updatedAt: '2024-01-02' },
        { id: 2, userId: 2, region: '부산', career: '디자이너', createdAt: '2024-01-03', updatedAt: '2024-01-04' },
      ],
    };
    getSincheongJeongbo.mockResolvedValue(mockData);

    render(<MyApplications />);

    await waitFor(() => expect(screen.getByText('서울')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('부산')).toBeInTheDocument());
    expect(screen.getByText('개발자')).toBeInTheDocument();
    expect(screen.getByText('디자이너')).toBeInTheDocument();


  });


  it('handles errors gracefully', async () => {
    const errorMessage = 'Network error';
    getSincheongJeongbo.mockRejectedValue(new Error(errorMessage));


    render(<MyApplications />);

    await waitFor(() => expect(message.error).toHaveBeenCalledWith('신청 정보를 가져오는 데 실패했습니다. 나중에 다시 시도하십시오.'));


  });
});

---[END_OF_FILES]---