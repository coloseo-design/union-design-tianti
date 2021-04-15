/* eslint-disable consistent-return */
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
    labelCol: { span: 8 },
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
                    // callback('长度必须大于2');
                  }
                },
              },
            ]}
          >
            <Input placeholder="请输入" onChange={(e, v) => console.log('change', e, v)} />
          </FormItem>
          <FormItem
            name="textarea"
            label="多行输入"
            validateFirst
            initialValue="哈哈哈哈哈哈哈"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                validator: (rule, value) => {
                  if (!value || value.length < 2) {
                    return Promise.reject(new Error('长度必须大于2'));
                    // callback('长度必须大于2');
                  }
                },
              },
            ]}
          >
            <Input.TextArea placeholder="请输入" style={{ width: '100%' }} onChange={(e, v) => console.log('change', e, v)} />
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

          <FormItem
            name="address"
            label="地址"
            validateFirst={false}
            rules={[
              { required: true, message: '请选择地址' },
            ]}
          >
            <Cascader options={options} style={{ width: '100%' }} />
          </FormItem>
          <FormItem
            name="age"
            label="年龄"
            validateFirst
            rules={[
              { required: true, message: '请填写年龄' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </FormItem>
          <FormItem
            name="birthday"
            label="生日"
            validateFirst
            rules={[
              { required: true, message: '请填写年龄' },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </FormItem>
          <FormItem
            name="email"
            label="邮箱"
            validateFirst
            rules={[
              { required: true, message: '请填写年龄' },
            ]}
          >
            <AutoComplete style={{ width: '100%' }} placeholder="请输入邮箱地址" dataSource={['Burns Bay Road', 'Downing Street', 'Wall Street']} />
          </FormItem>
          <FormItem
            name="read"
            label="是否关联"
            validateFirst
            initialValue
            valuePropName="checked"
            rules={[
              { required: true, message: '请填写年龄' },
            ]}
          >
            <Switch type="default" />
          </FormItem>
          <FormItem
            name="avatar"
            label="头像"
            validateFirst
            valuePropName="fileList"
            rules={[
              { required: true, message: '请填写年龄' },
            ]}
          >
            <Upload.Card
              listType="picture-card"
              btnDesc="支持扩展名.jpg"
            />
          </FormItem>
          <FormItem
            name="test"
            label="头像"
            rules={[
              { required: true, message: '请填写年龄' },
            ]}
          >
            <TreeSelect treeData={data} onChange={(...args) => console.log('args', args)} />
          </FormItem>
          <FormItem
            name="test1"
            label="是否满意"
            rules={[
              { required: true, message: '请选择' },
            ]}
          >
            <Checkbox.Group>
              <Checkbox>hello</Checkbox>
              <Checkbox>hello2</Checkbox>
            </Checkbox.Group>
          </FormItem>
          <FormItem
            name="radio"
            label="单选框"
            rules={[
              { required: true, message: '请填写年龄' },
            ]}
            initialValue="B"
          >
            <Radio.Group>
              <Radio value="A">A</Radio>
              <Radio value="B">B</Radio>
              <Radio value="C">C</Radio>
              <Radio value="D">D</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem
            name="test3"
            label="评分"
            initialValue={3}
          >
            <Rate onChange={(e) => console.log('e', e)} />
          </FormItem>
          <FormItem
            name="test4"
            label="评分"
          >
            <Slider />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>提交</Button>
            <Button
              htmlType="reset"
              onClick={() => {
                console.log('formRef', formRef);
                formRef.current.resetFields();
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
