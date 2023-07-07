import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';
import { AiOutlineUser, AiFillLock } from 'react-icons/ai';
// import { useSelector, useDispatch } from 'react-redux';
import { useLanguage } from '@/hooks/useLanguage';
import { IAuth } from '@/lib/types/auth';
// import { RootState } from '@/redux/reducers/rootReducer';
import { Notification } from '@/components/UI/Notification';
import { loginAccount } from '@/services/user.service';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [form] = Form.useForm();
  // const dispatch = useDispatch();
  // const { data, message } = useSelector((state: RootState) => state?.auth);
  // const [data, setdata] = useState<boolean>(a || false);

  // console.log('data', data);
  // useEffect(() => {
  //   if (data) {
  //     Cookies.set('data', JSON.stringify(data));
  //     router.push('/admin/dashboard');
  //   }
  // }, [data, router, message]);

  const handleSubmit = async (values: IAuth) => {
    let res: any;
    try {
      res = await loginAccount(values);
      router.push('/admin/dashboard');
    } catch (err) {
      res = err;
      console.log('err', err);
    } finally {
      const { message, success } = res?.data || '';
      Notification(message || 'Lỗi', success || false);
    }
    // dispatch({
    //   type: 'auth/login',
    //   payload: values,
    // });
    // if (message !== '') {
    //   console.log('message ', message);
    //   Notification(message, false);
    // } else {
    //   console.log('data handle', data);
    //   console.log('message ', message);
    //   Notification(message, true);
    // }
  };

  // useEffect(() => {
  //   console.log(Cookies.get('accessToken'));

  //   if (Cookies.get('accessToken')) {
  //     router.push('/admin/dashboard');
  //   }
  // }, [router]);
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
