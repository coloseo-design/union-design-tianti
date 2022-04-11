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
import { FormInstance } from './type';

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
  return (
    <div>
      <div className="form-demo">
        <Button onClick={() => setOpen(!open)}>操作</Button>
        <Form
          {...layout}
          name="test"
          initialValues={{
            // username: 'zhansgan',
            // password: 'lisi',
          }}
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
            initialValue="zhangsan"
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
            initialValue="lisi"
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
              initialValue="男"
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
