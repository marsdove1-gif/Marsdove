import Title from "./Title.js";

export default function ProfileName(
  tag = "h3",
  { className = "", ...props } = {},
  ...children
) {
  return Title(
    tag,
    { ...props, className: ["profile-name", className].filter(Boolean).join(" ") },
    ...children
  );
}

export { ProfileName };
