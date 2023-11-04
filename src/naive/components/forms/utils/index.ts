import type { PropType } from 'vue';
import { defineComponent, h } from 'vue';
import { NRadio, NRadioButton } from 'naive-ui';
import { isString } from '@/utils';

export declare type OptionProp = {
  disabled?: boolean;
  label?: string;
  value: string;
  [index: string]: any;
};

export const RenderRadio = defineComponent({
  props: {
    options: {
      type: Array as PropType<OptionProp[]>,
      default: () => []
    },
    button: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const options = props.options as OptionProp[];
    const comp = props.button ? NRadioButton : NRadio;
    return () =>
      options.map((option: OptionProp) => {
        if (isString(option.label)) {
          return h(comp, option);
        }
        const label = option.label;
        delete option.label;
        return h(comp, option, {
          default: label
        });
      });
  }
});
