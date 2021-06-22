/* eslint-disable react/display-name */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { FormContextProps } from './type';

export const FormContext = React.createContext<FormContextProps>({
  name: '',
  colon: true,
  validateTrigger: 'onChange',
  onCollect: () => {},
  onError: () => {},
  onSubmit: () => {},
  errors: {},
  values: {},
  isValidating: false,
  labelAlign: 'right',
});

export const { Consumer: FormConsumer, Provider: FormProvider } = FormContext;
