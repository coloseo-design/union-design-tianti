/* eslint-disable max-len */
import React, { createRef } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
} from '../index';
import '../grid/styles/index';
import '../button/styles/index';
import '../input/styles/index';
import '../select/styles/index';
import './styles/index';
import { FormInstance, FormValues } from './type';

const { Item: FormItem } = Form;
const FormDemo = () => {
  const formRef = createRef<FormInstance>();
  const onSubmit = (values: unknown) => {
    console.log('onSubmit values is', values);
  };

  const onFinishFailed = (failedData: unknown) => {
    console.log('failed data', failedData);
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [open, setOpen] = React.useState(false);
  const onValuesChange = (changedValues: FormValues, allValues: FormValues) => {
    console.log('==?changedValues>', changedValues, allValues);
  };

  React.useEffect(() => {
    const { current } = formRef;
    const fileds = current?.getFieldsValue(['username', 'password', 'sex']);
    console.log('==fileds', fileds);
  }, []);
  return (
    <div>
      {/* <div>
        <span
          style={{ padding: '0px 32px', cursor: 'pointer', color: open ? 'red' : undefined }}
          onClick={() => {
            setOpen(true);
          }}
        >
          短信

        </span>
        <span
          style={{ cursor: 'pointer', color: !open ? 'red' : undefined }}
          onClick={() => {
            setOpen(false);
          }}
        >
          手机号

        </span>

        <Form
          name="test1"
          ref={formRef}
          onFinish={(values) => {
            console.log('==values', values);
          }}
          labelAlign="right"
          labelStyle={{ marginBottom: 8 }}
        >
          {open ? (
            <FormItem label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input style={{ width: 256 }} placeholder="请输入用户名" />
            </FormItem>
          )
            : (
              <FormItem label="手机号" name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
                <Input style={{ width: 256 }} placeholder="请输入手机号" />
              </FormItem>
            )}
          <FormItem label="密码" rules={[{ required: true, message: '请输入密码' }]} name="password">
            <Input style={{ width: 256 }} placeholder="请输入" />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>提交</Button>
            <Button
              htmlType="reset"
              onClick={() => {
                formRef.current?.reset();
              }}
            >
              重置
            </Button>
          </FormItem>
        </Form>
      </div> */}
      <div className="form-demo">
        <Button onClick={() => setOpen(!open)}>操作</Button>
        <Form
          {...layout}
          name="test"
          initialValues={{
            username: 'zhansgan',
            // password: 'lisi',
            // address: {
            //   province: 'sichuan',
            //   city: 'chengdu',
            // },
            sex: '男',
          }}
          onValuesChange={onValuesChange}
          ref={formRef}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          style={{ padding: 20 }}
          labelAlign="right"
          labelStyle={{ marginBottom: 8 }}
        >
          <FormItem
            name="username"
            validateFirst
            label="用户名"
            labelAlign="right"
            // initialValue="zhangsan"
            labelStyle={{ marginBottom: 10 }}
            rules={[
              { required: true, message: '请输入用户名' },
              {
                validator: (_, value) => {
                  if (!value || value.length < 2) {
                    return Promise.reject(new Error('长度必须大于2'));
                  }
                  return null;
                },
              },
            ]}
          >
            <Input placeholder="请输入" />
          </FormItem>
          <FormItem
            name="password"
            label="密码"
            required
            validateFirst
            // initialValue="lisi"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value.length < 2) {
                    return Promise.reject(new Error('长度必须大于2'));
                  }
                  return null;
                },
              },
            ]}
          >
            <Input type="password" placeholder="请输入" style={{ width: '100%' }} />
          </FormItem>
          <FormItem
            name="address.province"
            label="省份"
            required
          >
            <Input placeholder="请输入省份" style={{ width: '100%' }} />
          </FormItem>
          {open && (
          <div>
            <FormItem
              name="address.city"
              label={<span>地址</span>}
              colon={false}
              required
            >
              <Input placeholder="请输入城市" style={{ width: '100%' }} />
            </FormItem>
            <FormItem
              name="sex"
              label="性别"
              // initialValue="男"
              validateFirst
              rules={[
                { required: true, message: '请选择性别' },
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value="男">男</Select.Option>
                <Select.Option value="女">女</Select.Option>
              </Select>
            </FormItem>
          </div>
          )}
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>提交</Button>
            <Button
              htmlType="reset"
              onClick={() => {
                formRef.current?.reset();
              }}
            >
              重置
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default FormDemo;
