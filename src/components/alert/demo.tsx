import React from 'react';
import { Alert } from '../index';
import './styles/index';

const handleclose = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
  console.log('00000', e);
};

const AlertDemo = () => (
  <div>
    <div style={{ margin: 24 }}>
      <Alert
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
        description="你所提交的信息已经审核通过，请及时跟进申请状况。如有问题，请联系审核人员或在线客服。"
        closable
        showIcon
        onClose={handleclose}
      />
    </div>
    <div style={{ margin: 24 }}>
      <Alert
        type="info"
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
        description="你所提交的信息已经审核通过，请及时跟进申请状况。如有问题，请联系审核人员或在线客服。"
        closable
        showIcon
      />
    </div>
    <div style={{ margin: 24 }}>
      <Alert
        type="warning"
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
        description="你所提交的信息已经审核通过，请及时跟进申请状况。如有问题，请联系审核人员或在线客服。"
        closable
        showIcon
      />
    </div>
    <div style={{ margin: 24 }}>
      <Alert
        type="error"
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
        description="你所提交的信息已经审核通过，请及时跟进申请状况。如有问题，请联系审核人员或在线客服。"
        closable
        showIcon
      />
    </div>
    <div style={{ margin: 24 }}>
      <Alert
        type="info"
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
        description="你所提交的信息已经审核通过，请及时跟进申请状况。如有问题，请联系审核人员或在线客服。"
        closeText="查看详情"
        onClose={(evt) => { console.log('dd', evt); }}
      />
    </div>
    <div style={{ margin: 24 }}>
      <Alert
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
        showIcon
      />
    </div>
    <div style={{ margin: 24 }}>
      <Alert
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
        type="error"
        showIcon
      />
    </div>
    <div style={{ margin: 24 }}>
      <Alert
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
        type="warning"
        showIcon
        banner
      />
    </div>
    <div style={{ margin: 24 }}>
      <Alert
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
        type="error"
        showIcon
        banner
        closable
        onClose={(evt) => { console.log('dd', evt); }}
      />
    </div>
  </div>

);

export default AlertDemo;
