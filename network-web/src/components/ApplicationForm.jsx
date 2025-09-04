import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { createApplication } from '../utils/api';

const { Item } = Form;
const { TextArea } = Input;

const ApplicationForm = ({ refreshData }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const response = await createApplication(values);
      message.success(`Application submitted successfully! ID: ${response.id}`);
      form.resetFields();
      refreshData();
    } catch (error) {
      console.error('Error submitting application:', error);
      message.error('Failed to submit application. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Item label="User ID" name="userId" rules={[{ required: true, message: 'Please input User ID!' }]}><Input type="number" /></Item>
      <Item label="Region" name="region" rules={[{ required: true, message: 'Please input region!' }]}><Input /></Item>
      <Item label="Career" name="career" rules={[{ required: true, message: 'Please input career!' }]}><Input /></Item>
      <Item label="Self Introduction" name="selfIntroduction" rules={[{ required: true, message: 'Please input self introduction!' }]}><TextArea /></Item>
      <Item label="Portfolio URL" name="portfolioUrl"><Input /></Item>
      <Item>
        <Button type="primary" htmlType="submit" loading={submitting}>Submit Application</Button>
      </Item>
    </Form>
  );
};

export default ApplicationForm;