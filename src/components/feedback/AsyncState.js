import Box from "../ui/Box.js";
import Spinner from "../ui/Spinner.js";
import EmptyState from "../data/EmptyState.js";
import Alert from "./Alert.js";
import Skeleton from "./Skeleton.js";
import styleCom from "../../helpers/styleCom.js";

styleCom("/styles/components/feedback.css");

/**
 * Standard loading/error/empty/content boundary for async UI.
 * It deliberately accepts nodes/functions so applications control their data.
 */
export default function AsyncState(
  tag = "div",
  {
    loading = false,
    error = null,
    empty = false,
    loadingView = null,
    errorTitle = "Something went wrong",
    emptyTitle = "Nothing here yet",
    errorDescription = "Please try again.",
    emptyDescription = "There is nothing to display yet.",
    className = "",
    ...props
  } = {},
  ...children
) {
  const root = Box(tag, {
    ...props,
    className: ["async-state", className].filter(Boolean).join(" ")
  });

  const view = typeof loadingView === "function" ? loadingView() : loadingView;

  if (loading) {
    root.append(view || Box("div", { className: "async-state-loading" }, Spinner("span"), Skeleton("span", { height: "12px" })));
    return root;
  }

  if (error) {
    root.append(Alert("div", {
      variant: "danger",
      title: errorTitle,
      message: error?.message || errorDescription
    }));
    return root;
  }

  if (empty) {
    root.append(EmptyState("section", {
      title: emptyTitle,
      description: emptyDescription
    }));
    return root;
  }

  root.append(...children);
  return root;
}

export { AsyncState };
