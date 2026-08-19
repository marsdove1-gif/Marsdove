import * as MD from "../../src/index.js";
import { page } from "./shared.js";
const { Header, Logo, Nav, Container, Stack, Grid, Cluster, Section, Heading, Text, Badge, PrimaryButton, SecondaryButton, GhostButton, Card, Input, Checkbox, Radio, Select, NativeSelect, Option, ImageUploader, Field, SearchField, Icon, Avatar, List, ListItem, Divider, Link, Spinner, Modal, Alert, Skeleton, EmptyState, Pagination, Table, Tabs, Drawer, Hero, ButtonGroup, ProductCard, ProductGrid, QuantityControl, Price, Footer, PrimaryText, SecondaryText, MutedText, AccentText } = MD;

function Components() {
  return page("Components", "Real components rendered from the public Marsdove API.",
    Card("section", {}, Stack("div", { gap: "md" },
      Heading("h2", {}, "Actions"),
      ButtonGroup("div", {}, PrimaryButton("button", {}, "Primary"), SecondaryButton("button", {}, "Secondary"), GhostButton("button", {}, "Ghost"))
    )),
    Card("section", {}, Stack("div", { gap: "md" },
      Heading("h2", {}, "UI primitives"),
      Cluster("div", {},
        Logo("a", { showName: true }),
        Icon("span", { name: "search", label: "Search" }),
        Avatar("span", { src: "https://i.pravatar.cc/80?img=12", alt: "Example avatar" }),
        Spinner("span", {}),
        Link("a", { href: "#" }, "Reusable link")
      ),
      Divider("hr", {}),
      List("ul", {}, ListItem("li", {}, "First item"), ListItem("li", {}, "Second item")),
      NativeSelect("select", {}, Option("option", { value: "a" }, "Option A"), Option("option", { value: "b" }, "Option B")),
      Modal("dialog", { open: true, className: "docs-modal" }, Text("p", {}, "Modal is a reusable UI primitive."))
    )),
    Card("section", {}, Stack("div", { gap: "md" },
      Heading("h2", {}, "Forms"),
      Field("div", { label: "Email", htmlFor: "email", hint: "Reusable Field composes Label + control + hint." }, Input("input", { id: "email", type: "email", placeholder: "you@example.com" })),
      SearchField("div", { placeholder: "Search components" }),
      Select("div", { options: ["Chair", "Table", "Sofa"], placeholder: "Choose a category" }),
      Cluster("div", {}, Checkbox("input", { name: "terms", type: "checkbox" }), Radio("input", { name: "kind", value: "a" }), Text("span", {}, "Checkbox and Radio reuse Input.")),
      ImageUploader("div", { storePath: "form.images" })
    )),
    Card("section", {}, ProductGrid("div", { products: sampleProducts }))
  );
}

export default Components;
