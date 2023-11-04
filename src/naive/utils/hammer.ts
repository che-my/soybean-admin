import Hammer from 'hammerjs';

declare interface OffsetData {
  left: number;
  top: number;
}

/**
 * 获取当前元素相对于指定元素的相对位置
 * @param {*} current 当前dom
 * @param {*} stop 查找结束dom
 * @param {*} data 数据 无需传入
 * @return
 */
export const getOffset = (current: any, stop = document, data: OffsetData = { left: 0, top: 0 }): OffsetData => {
  if (!current || current === stop) {
    return data;
  }
  data.left += current.offsetLeft;
  data.top += current.offsetTop;
  return getOffset(current.offsetParent, stop, data);
};

/**
 * element 移动
 * @param fDom {*} 父级元素
 * @param sDom {*} 选择元素
 */
export const elementMove = (fDom: string, sDom: string): any => {
  const pos = { start: { x: 0, y: 0 }, move: { x: 0, y: 0 } };
  const modal = document.querySelector(fDom);
  const head = document.querySelector(sDom);
  if (!head) {
    return;
  }
  const mc = new Hammer.Manager(head);
  mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
  const current = { x: 0, y: 0 };
  const func = (e: any): void => {
    switch (e.type) {
      case 'panstart':
        // @ts-ignore
        if (modal.style.transform) {
          // @ts-ignore
          const [x, y] = modal.style.transform.match(/\d{1,}px|-\d{1,}px/g).map((item: any) => item.split('px')[0] | 0);
          current.x = x;
          current.y = y;
        }
        pos.start = e.center;
        pos.move = e.center;
        break;
      case 'pan':
        pos.move = e.center;
        break;
      case 'panend':
        pos.move = e.center;
        break;
      default:
        break;
    }
    const { top } = getOffset(modal);
    // @ts-ignore
    modal.style.transform = `translate3d(${current.x + pos.move.x - pos.start.x}px, ${Math.max(
      current.y + pos.move.y - pos.start.y,
      -top
    )}px, 0)`;
  };
  mc.on('pan panstart panend', func);
  return (): void => {
    mc.off('pan panstart panend', func);
  };
};
