export function on(target, event, callback, options) {

  if (!(target instanceof EventTarget)) return;

  target.addEventListener(
    event,
    callback,
    options
  );

}

export function off(target, event, callback, options) {

  if (!(target instanceof EventTarget)) return;

  target.removeEventListener(
    event,
    callback,
    options
  );

}

export function once(target, event, callback) {

  on(
    target,
    event,
    callback,
    { once: true }
  );

}