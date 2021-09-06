/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';

interface FormItemErrorProps {
  error?: string[] | React.ReactNode [];
}

const FormItemError: React.FC<FormItemErrorProps> = ({ error }) => {
  const containerCls = classnames('form-item-error');
  let simpleMode = false;
  if (error && error.length) {
    simpleMode = error.every((item) => !React.isValidElement(item));
  }
  return (
    <div className={containerCls}>
      {
        error && simpleMode && (
          <div className="form-item-error-explain">
            <div role="alert">{error}</div>
          </div>
        )
      }
      {
        !simpleMode && error && (
          <div className="form-item-error-modal">
            <div className="error-box">
              <div className="error-box-content">
                {error}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default FormItemError;
