export default function unmount(node) {

  if (!(node instanceof Node)) {
    return;
  }

  node.remove();

}