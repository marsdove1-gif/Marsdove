import Box from "../ui/Box.js";
import Label from "../ui/Label.js";
import Paragraph from "../ui/Paragraph.js";

export default function Field(
  tag = "div",
  {
    label,
    htmlFor,
    hint,
    error,
    required = false,
    className = "",
    control,
    ...props
  } = {},
  ...children
) {
  const message = error ?? hint;

  return Box(tag, {
    ...props,
    className: ["field", error && "has-error", className]
      .filter(Boolean).join(" ")
  },
    label
      ? Label("label", {
          htmlFor,
          required,
          className: "field-label"
        }, label)
      : null,
    control,
    ...children,
    message
      ? Paragraph("p", {
          className: ["field-message", error && "field-error"]
            .filter(Boolean).join(" ")
        }, message)
      : null
  );
}

export { Field };
