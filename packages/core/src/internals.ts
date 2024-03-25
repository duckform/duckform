import { each, isPlainObj } from "@duckform/shared";
import { globalThisPolyfill } from "@duckform/shared";

export const lowerSnake = (str: string) => {
  return String(str).replace(/\s+/g, "_").toLocaleLowerCase();
};

export const mergeLocales = (target: any, source: any) => {
  if (isPlainObj(target) && isPlainObj(source)) {
    each(source, (value, key) => {
      const token = lowerSnake(key);
      const t = target as any;
      const messages = mergeLocales(t[key] || t[token], value);
      t[token] = messages;
    });
    return target;
  } else if (isPlainObj(source)) {
    const result = Array.isArray(source) ? [] : ({} as any);
    each(source, (value, key) => {
      const messages = mergeLocales(undefined, value);
      result[lowerSnake(key)] = messages;
    });
    return result;
  }
  return source;
};

export const getBrowserLanguage = () => {
  /* istanbul ignore next */
  if (!globalThisPolyfill.navigator) {
    return "en";
  }
  return (
    /** @ts-ignore */
    globalThisPolyfill.navigator.browserlanguage ||
    globalThisPolyfill.navigator?.language ||
    "en"
  );
};
