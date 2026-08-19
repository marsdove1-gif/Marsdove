export default function update(current, next) {

  if (!(current instanceof Node)) {
    throw new TypeError(
      "Update: current must be a DOM Node."
    );
  }

  if (!(next instanceof Node)) {
    throw new TypeError(
      "Update: next must be a DOM Node."
    );
  }

  current.replaceWith(next);

  return next;

}