/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';

interface FormItemErrorProps {
  error: string | string[] | React.ReactNode [];
  simpleMode?: boolean;
}

const FormItemError: React.FC<FormItemErrorProps> = ({ error = '', simpleMode = true }) => {
  const containerCls = classnames('form-item-error', {
    // ['form-item-error-modal']: !simpleMode,
  });
  return (
    <div className={containerCls}>
      {
        error.length > 0 && simpleMode && (
          <div className="form-item-error-explain">
            <div role="alert">{error}</div>
          </div>
        )
      }
      {
        !simpleMode && error.length > 0 && (
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
