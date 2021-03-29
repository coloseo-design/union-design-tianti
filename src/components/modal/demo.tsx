/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import Modal from './index';
import Button from '../button';

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
    });
  };

  const handleInfo = () => {
    Modal.info({
      title: '弹出窗Info',
      content: <div>
        <p>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。</p>
        <p>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点</p>
      </div>,
    });
  };
  return (
    <div style={{ padding: 32 }}>
      <div>
        <h2>基本的Modal</h2>
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
        // centered
      >
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
        // centered
      >
        <div>modal基本样式</div>
      </Modal>
    </div>
  );
};

export default ModalDemo;
