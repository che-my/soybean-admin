import { defineComponent, h, markRaw } from 'vue';
import type { Asset } from '@alilc/lowcode-types';
import { AssetLoader, buildComponents } from '@knxcloud/lowcode-utils';
import type { EntryOptions, Records } from '@/naive/types';
import DefaultMaps from './DefaultMaps';

interface HtmlProp {
  tag: string;
  class: string | string[];
  value: string | number;
}

export const createHtmlComponent = () => {
  return markRaw(
    defineComponent({
      componentName: 'Html',
      props: {
        tag: {
          type: String,
          default: 'div'
        },
        class: {
          type: [String, Array<string>],
          default: ''
        },
        value: {
          type: [String, Number],
          default: ''
        }
      },
      setup(props: HtmlProp, { attrs, slots }: any) {
        const content = props.value ? props.value : slots;
        return () =>
          h(
            props.tag,
            {
              class: props.class,
              ...attrs
            },
            content
          );
      }
    })
  );
};

export const handleMaps = (maps: Records[] | undefined) => {
  const data: Records = DefaultMaps;
  data.Html = createHtmlComponent();
  if (maps && maps.length > 0) {
    maps.forEach((item: any) => {
      if (item.type === 'package') {
        data[item.componentName] = markRaw(defineComponent(item));
      }
    });
  }
  return data;
};

export const handleRender = async (options: EntryOptions) => {
  const packages: Records = {};
  const assets: Asset[] = [];
  const maps: Records = handleMaps(options.maps);
  options.packages?.forEach(({ package: _package, library, urls, renderUrls, maps: _maps }: Records) => {
    packages[_package] = library;
    if (renderUrls) {
      assets.push(renderUrls);
    } else if (urls) {
      assets.push(urls);
    }
    Object.assign(maps, handleMaps(_maps));
  });
  if (packages) {
    await new AssetLoader().load(assets);
  }
  Object.assign(maps, options.maps);
  const components: Records = await buildComponents(packages, maps);
  return {
    components
  };
};
