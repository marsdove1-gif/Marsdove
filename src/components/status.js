import Badge from "./ui/Badge.js";

function statusBadge(variant, tag, props, children, fallback) {
  return Badge(tag, {
    ...props,
    variant: props.variant ?? variant,
    className: [fallback, props.className].filter(Boolean).join(" ")
  }, ...children);
}

export function SuccessBadge(tag = "span", props = {}, ...children) {
  return statusBadge("success", tag, props, children, "success-badge");
}

export function WarningBadge(tag = "span", props = {}, ...children) {
  return statusBadge("warning", tag, props, children, "warning-badge");
}

export function DangerBadge(tag = "span", props = {}, ...children) {
  return statusBadge("danger", tag, props, children, "danger-badge");
}

export function InfoBadge(tag = "span", props = {}, ...children) {
  return statusBadge("info", tag, props, children, "info-badge");
}

export function AccentBadge(tag = "span", props = {}, ...children) {
  return statusBadge("accent", tag, props, children, "accent-badge");
}
