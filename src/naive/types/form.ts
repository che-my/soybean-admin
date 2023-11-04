import type { FormInst, FormProps } from 'naive-ui';

export type FormEmitType = 'beforeSubmit' | 'submit' | 'success' | 'error';
export type FormEmitProp = (event: FormEmitType, ...args: any[]) => void;

export interface FormInject {
  formRef: FormInst | undefined;
  formKey: string;
  showFooter?: boolean;
  class: string;
  props: FormProps;
  data: object;
  updateFormRef(formRef: FormInst | undefined): void;
  onReset(): Promise<void>;
  onSubmit(e: Event): Promise<void>;
}

export interface BaseFormProps {
  apiUrl?: string;
  async?: boolean;
  type?: string;
  modalKey?: string;
  drawerKey?: string;
  modalProps?: object;
  drawerProps?: object;
  showFooter?: boolean;
}
