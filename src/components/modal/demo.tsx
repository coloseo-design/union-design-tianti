import React, { useState } from 'react';
import {
  Modal, Button, Select, TreeSelect, Form, Input,
} from '../index';
import './styles/index';
import '../button/styles/index';
import '../select/styles/index';
import '../tree-select/styles/index';

const { Option } = Select;
const { TreeNode } = TreeSelect;

const { Item: FormItem } = Form;

const ModalDemo: React.FC<unknown> = () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [confirmLoading, setconfirmLoading] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisible1(false);
  };

  const handleOk = () => {
    setconfirmLoading(true);
    setTimeout(() => {
      setVisible1(false);
      setconfirmLoading(false);
    }, 2000);
  };

  const handleClick1 = () => {
    setVisible1(true);
  };
  const handleWarning = () => {
    Modal.warning({
      title: 'Warning弹窗',
      content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
      centered: true,
      maskClosable: true,
    });
  };

  const handleSuccess = () => {
    Modal.success({
      title: 'Success弹窗',
      content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
      maskClosable: true,
    });
  };
  const handleError = () => {
    Modal.error({
      title: 'Error弹出窗',
      content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
    });
  };

  const handleConfirm = () => {
    Modal.confirm({
      title: '弹出窗confirm',
      content: `一系列的信息描述，可能会很长。也可以是很短同样也可以带标点
      一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。
      一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。`,
      onOk: () => {
        console.log('--ok');
      },
      onCancel: () => {
        console.log('--cancel');
      },
    });
  };

  const handleInfo = () => {
    Modal.info({
      title: '弹出窗Info',
      content:
  <div>
    <p>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。</p>
    <p>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</p>
  </div>,
    });
  };
  return (
    <div style={{ padding: 32 }}>
      <div>
        <h2>基本的Modal(destroyOnClose为true，关闭时会销毁子元素)</h2>
        <Button onClick={handleClick}>open</Button>
      </div>
      <div>
        <h2>异步关闭的Modal</h2>
        <Button onClick={handleClick1}>异步关闭</Button>
      </div>
      <div style={{ marginTop: 32 }}>
        <h2>Modal 消息提示</h2>
        <Button onClick={handleInfo}>info</Button>
        <Button onClick={handleWarning} style={{ margin: '0px 24px' }}>warning</Button>
        <Button onClick={handleSuccess} style={{ margin: '0px 24px' }}>success</Button>
        <Button onClick={handleError} style={{ margin: '0px 24px' }}>error</Button>
        <Button onClick={handleConfirm}>confirm</Button>
      </div>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        onOk={() => setVisible(false)}
        title="对话框"
        bodyStyle={{ height: 500, overflow: 'auto' }}
        cancelText="取消"
        centered
        destroyOnClose
      >
        <Form name="modelForm">
          <FormItem>
            <Input />
          </FormItem>
          {/* <FormItem>
            <Select style={{ marginBottom: 32, width: 200 }}>
              <Option key="1" value="1">选项111swdewdw是我的我的午饭人反而更</Option>
              <Option key="2" value="2">选项1222</Option>
              <Option disabled key="3" value="3">选项33333</Option>
            </Select>
          </FormItem> */}
        </Form>
        <div>modal基本样式</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
        <div>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</div>
      </Modal>
      <Modal
        visible={visible1}
        onCancel={handleCancel}
        onOk={handleOk}
        title="对话框"
        bodyStyle={{ height: 500 }}
        confirmLoading={confirmLoading}
        centered
      >
        <div>
          <Select style={{ marginBottom: 32, width: 200 }}>
            <Option key="1" value="1">选项111swdewdw是我的我的午饭人反而更</Option>
            <Option key="2" value="2">选项1222</Option>
            <Option disabled key="3" value="3">选项33333</Option>
          </Select>
          <TreeSelect
            value="1"
          >
            <TreeNode title="顶级" key="a" value="a">
              <TreeNode title="哈哈哈" key="1" value="1">
                <TreeNode title="快看看" key="2" value="2">
                  <TreeNode title="what" key="5" value="5" />
                </TreeNode>
              </TreeNode>
              <TreeNode title="呵呵呵1" key="3" value="3">
                <TreeNode title="滚滚滚" key="4" value="4" />
              </TreeNode>
            </TreeNode>
          </TreeSelect>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDemo;
