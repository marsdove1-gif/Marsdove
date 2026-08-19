import Text from "../ui/Text.js";
import { formatPrice } from "../../helpers/formaters/formatPrice.js";

export default function Price(
  tag = "span",
  { amount = 0, className = "", ...props } = {},
  ...children
) {
  return Text(
    tag,
    {
      ...props,
      className: ["price", className].filter(Boolean).join(" ")
    },
    formatPrice(amount),
    ...children
  );
}

export { Price };
