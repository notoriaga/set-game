import { h } from 'hyperapp';

const vnode = name => {
  return (attributes, children) => {
    return typeof attributes === 'object' && !Array.isArray(attributes)
      ? h(name, attributes, children)
      : h(name, {}, attributes);
  };
};

export const div = (attributes, children) => {
  return vnode('div')(attributes, children);
};

export const span = (attributes, children) => {
  return vnode('span')(attributes, children);
};

export const button = (attributes, children) => {
  return vnode('button')(attributes, children);
};

export const svg = (attributes, children) => {
  return vnode('svg')(attributes, children);
};

export const path = (attributes, children) => {
  return vnode('path')(attributes, children);
};

export const line = (attributes, children) => {
  return vnode('line')(attributes, children);
};

export const defs = (attributes, children) => {
  return vnode('defs')(attributes, children);
};

export const pattern = (attributes, children) => {
  return vnode('pattern')(attributes, children);
};
