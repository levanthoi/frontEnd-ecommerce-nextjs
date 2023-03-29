import { Form, Input, Button } from 'antd';
import React from 'react';
import { AiOutlineUser, AiFillLock } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useLanguage } from '@/hooks/useLanguage';
import { IAuth } from '@/lib/types/auth';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleSubmit = (values: IAuth) => {
    console.log('values', values);
    dispatch({
      type: 'user/login',
      payload: values,
    });
  };
  return (
    <div className="bg-white max-w-6xl flex items-center justify-center mx-auto text-slate-900">
      <div className="w-1/2">
        <img src="/images/login/730_generated.jpg" alt="login" />
      </div>
      <div className="">
        <h2 className="text-3xl">E-Commerce</h2>
        <p className="text-xl">Hi</p>
        <Form form={form} name="login" layout="vertical" autoComplete="off" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            label={t.email}
            rules={[
              { required: true, message: t.emptyEmail },
              {
                type: 'email',
                message: t.requiredEmail,
              },
            ]}
          >
            <Input
              prefix={<AiOutlineUser className="site-form-item-icon" />}
              placeholder={t.email}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={t.password}
            rules={[{ required: true, message: t.requiredPassword }]}
            hasFeedback
          >
            <Input.Password
              prefix={<AiFillLock className="site-form-item-icon" />}
              placeholder={t.password}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t.login}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
