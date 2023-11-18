<script lang="ts">
import type { PropType, VNode } from 'vue';
import { useAttrs, defineComponent, ref, h, unref } from 'vue';
import type { AnchorInst } from 'naive-ui';
import { NAnchor, NAnchorLink } from 'naive-ui';

interface PropOption {
  title: string;
  href?: string;
  onClick?: (e: Event) => void;
  children?: PropOption[];
}

export default defineComponent({
  name: 'AppAnchor',
  inheritAttrs: true,
  props: {
    options: {
      type: Array as PropType<PropOption[]>,
      default: () => []
    }
  },
  setup(props) {
    const attrs = useAttrs();
    const nAnchorRef = ref<AnchorInst | null>(null);
    const scrollTo = (href: any) => {
      unref(nAnchorRef)?.scrollTo(href);
    };
    const renderAnchorLink = (options: PropOption[]): VNode[] => {
      return options.map((option: PropOption) => {
        const href = option?.href || '';
        const children = option?.children || [];
        const props: PropOption = { title: option.title, href };
        if (href) {
          props.onClick = (e: Event) => {
            e.preventDefault();
            scrollTo(href);
          };
        }
        if (children.length > 0) {
          return h(NAnchorLink, props, { default: () => renderAnchorLink(children) });
        }
        return h(NAnchorLink, props);
      });
    };
    return () =>
      h(
        NAnchor,
        { ...attrs, ref: nAnchorRef },
        {
          default: () => renderAnchorLink(props.options)
        }
      );
  }
});
</script>
