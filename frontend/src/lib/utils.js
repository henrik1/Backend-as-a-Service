import {prop, uniqBy} from 'ramda';

export const toggleBoolean = (prev) => !prev;

const isValidArrayIndex = (arr, idx) => {
  return !(idx < 0 || idx >= arr.length);
};

export function add(arr, record) {
  return uniqBy(prop('_id'), [...arr, record]);
}

export function replace(arr, record) {
  const idx = getIndex(arr, record);
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot replace value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), record, ...arr.slice(idx + 1)];
}

export function update(arr, record) {
  const idx = getIndex(arr, record);
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot update value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), record, ...arr.slice(idx + 1)];
}

export function remove(arr, _id) {
  const idx = getIndex(arr, { _id });
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot remove value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

export const isSame = (a, b) =>
  String(a?._id) === String(b?._id);

export const getIndex = (list, target) => {
  const idx = list.findIndex((t) => isSame(t, target));
  return idx >= 0 ? idx : null;
};
