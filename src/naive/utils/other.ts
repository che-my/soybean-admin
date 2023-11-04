export function uuid(len: number, radix?: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid: Record<number, string>[] = [];
  let i: number;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

export const checkNumberPx = (field: string | number, key: string) => {
  return field.toString().indexOf(key) !== -1;
};

export function calcNumberPx(field: string | number | undefined) {
  if (field === undefined) {
    return field;
  }
  if (
    checkNumberPx(field, 'px') ||
    checkNumberPx(field, 'rem') ||
    checkNumberPx(field, 'vh') ||
    checkNumberPx(field, 'vw') ||
    checkNumberPx(field, 'pt') ||
    checkNumberPx(field, '%')
  ) {
    return field;
  }
  return `${field}px`;
}
