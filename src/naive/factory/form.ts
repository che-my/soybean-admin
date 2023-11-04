import { mergeProps, onBeforeMount, reactive, unref, useAttrs, watch } from 'vue';
import type { FormProps, FormInst } from 'naive-ui';
import { uuid } from '@/naive/utils';
import type { FormEmitProp, FormInject } from '@/naive/types';
import { request } from '@/naive/api';
import { useStore } from '@/naive/hook';

export class FormFactory {
  private readonly props: any = {};

  private readonly apiUrl: string = '';

  private readonly $emit: FormEmitProp;

  private state: FormInject = reactive<any>({
    formKey: undefined,
    data: {},
    updateFormRef(formRef: FormInst | undefined) {
      this.state.formRef = formRef;
    }
  });

  constructor(props: any, emit: FormEmitProp) {
    this.props = props;
    this.apiUrl = props.apiUrl;
    this.$emit = emit;
    this.init();
  }

  /**
   * 初始化
   * @private
   */
  private init() {
    const randomClass = `app-form-${uuid(8)}`;
    this.state.formKey = randomClass;
    this.state.class = randomClass;
    this.state.showFooter = this.props.showFooter || false;
    const attrs = useAttrs();
    this.state.props = mergeProps(this.props, attrs) as FormProps;
    let oldModel = {};
    if (unref(attrs).model) {
      oldModel = JSON.parse(JSON.stringify(unref(attrs).model));
    }
    this.state.onSubmit = async (e: Event | null = null) => {
      e?.preventDefault();
      this.submitRequest();
    };
    this.state.onReset = async () => {
      Object.assign(this.state.data, oldModel);
      this.state.formRef?.restoreValidation();
    };
    this.state.updateFormRef = (formRef: FormInst | undefined) => {
      this.state.formRef = formRef;
    };
    onBeforeMount(() => {
      if (this.state.props.model) {
        this.state.data = this.state.props.model;
      }
      delete this.state.props.model;
    });
    watch(
      () => this.state.data,
      () => {
        console.log(this.state.data);
      },
      { deep: true }
    );
  }

  private submitRequest() {
    let isBool = true;
    this.$emit('beforeSubmit', this.state, (bool: boolean) => (isBool = bool));
    if (!isBool) return false;
    this.state.formRef
      ?.validate()
      .then(() => this.saveForm())
      .catch((error: any) => {
        console.log(error);
        this.$emit('error', error);
      });
  }

  private getData() {
    return this.state.data;
  }

  /**
   * 提交表单请求
   * @private
   */
  private saveForm() {
    if (this.apiUrl) {
      request
        .post(this.apiUrl, this.getData())
        .then((ret: any) => {
          this.$emit('success', ret);
        })
        .catch(error => {
          this.$emit('error', error);
        });
    } else {
      this.$emit('submit', this.state);
    }
  }

  public getInject(): FormInject {
    const { useProvide, useInject } = useStore<FormInject>(this.state.formKey);
    useProvide(this.state);
    return useInject();
  }
}

export const FormEmitTypes = ['beforeSubmit', 'submit', 'success', 'error'];

export const formProps = {
  apiUrl: '',
  type: 'page',
  async: false,
  modalKey: '',
  drawerKey: '',
  modalProps: undefined,
  drawerProps: undefined,
  showFooter: false
};

export const useForm = (props: any, emit: FormEmitProp): FormInject => {
  const factory = new FormFactory(props, emit);
  return factory.getInject();
};

export const injectForm = (formKey: string): FormInject => {
  const { useInject } = useStore<FormInject>(formKey);
  return useInject();
};
