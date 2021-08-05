import React, { useRef } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Cascader,
  AutoComplete,
  Checkbox,
  InputNumber,
  Radio,
  Rate,
  Slider,
  Upload,
  DatePicker,
  Switch,
  TreeSelect,
} from '../index';
import '../grid/styles/index';
import '../button/styles/index';
import '../input/styles/index';
import '../select/styles/index';
import './styles/index';

const { Item: FormItem } = Form;
export default () => {
  const formRef = useRef(null);
  console.log('formRef', formRef);
  const onSubmit = (values: unknown) => {
    console.log('onSubmit values is', values);
  };

  const onFinishFailed = (failedData: unknown) => {
    console.log('failed data', failedData);
  };

  const data = [
    {
      key: '0',
      title: 'node-0',
      value: '0',
      children: [
        {
          key: '0-1',
          title: 'node-0-1',
          value: '0-1',
        },
        {
          key: '0-2',
          title: 'node-0-2',
          value: '0-2',
        },
      ],
    },
    {
      key: '1',
      title: 'node-1',
      value: '1',
      children: [
        {
          key: '1-1',
          title: 'node-1-1',
          value: '1-1',
          children: [
            {
              key: '1-1-1',
              title: 'node-1-1-1',
              value: '1-1-1',
            },
            {
              key: '1-1-2',
              title: 'node-1-1-2',
              value: '1-1-2',
            },
          ],
        },
        {
          key: '1-2',
          title: 'node-1-2',
          value: '1-2',
          children: [
            {
              key: '1-2-1',
              title: 'node-1-2-1',
              children: [
                {
                  key: '1-1-3',
                  title: 'node-1-1-3',
                },
                {
                  key: '1-1-4',
                  title: 'node-1-1-4',
                },
              ],
            },
          ],
        },
      ],
    },

  ];

  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

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
  return (
    <div>
      <div className="form-demo">
        <Form
          {...layout}
          name="test"
          initialValues={{
            username: 'zhansgan',
            password: 'lisi',
          }}
          ref={formRef}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          style={{ padding: 20 }}
        >
          <FormItem
            name="username"
            label="用户名"
            validateFirst
            rules={[
              { required: true, message: '请输入用户名' },
              {
                validator: (rule, value) => {
                  if (!value || value.length < 2) {
                    return Promise.reject(new Error('长度必须大于2'));
                  }
                  return null;
                },
              },
            ]}
          >
            <Input placeholder="请输入" onChange={(e: any, v: any) => console.log('change', e, v)} />
          </FormItem>
          <FormItem
            name="password"
            label="密码"
            required
            validateFirst
            rules={[
              {
                validator: (rule, value) => {
                  if (!value || value.length < 2) {
                    return Promise.reject(new Error('长度必须大于2'));
                  }
                  return null;
                },
              },
            ]}
          >
            <Input type="password" placeholder="请输入" style={{ width: '100%' }} onChange={(e, v) => console.log('change', e, v)} />
          </FormItem>
          <FormItem
            name={['address', 'province']}
            label="省份"
            required
          >
            <Input placeholder="请输入省份" style={{ width: '100%' }} />
          </FormItem>
          <FormItem
            name={['address', 'city']}
            label={<span>地址</span>}
            colon={false}
            required
          >
            <Input placeholder="请输入城市" style={{ width: '100%' }} />
          </FormItem>
          <FormItem
            name="sex"
            label="性别"
            validateFirst
            rules={[
              { required: true, message: '请选择性别' },
            ]}
          >
            <Select style={{ width: '100%' }} placeholder="请选择">
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
            </Select>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>提交</Button>
            <Button
              htmlType="reset"
              onClick={() => {
                console.log('formRef', formRef);
                formRef.current.reset();
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
