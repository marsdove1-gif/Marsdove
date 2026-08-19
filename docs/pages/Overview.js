import * as MD from "../../src/index.js";
import { page } from "./shared.js";
const { Header, Logo, Nav, Container, Stack, Grid, Cluster, Section, Heading, Text, Badge, PrimaryButton, SecondaryButton, GhostButton, Card, Input, Checkbox, Radio, Select, NativeSelect, Option, ImageUploader, Field, SearchField, Icon, Avatar, List, ListItem, Divider, Link, Spinner, Modal, Alert, Skeleton, EmptyState, Pagination, Table, Tabs, Drawer, Hero, ButtonGroup, ProductCard, ProductGrid, QuantityControl, Price, Footer, PrimaryText, SecondaryText, MutedText, AccentText } = MD;

function Overview() {
  return page("Marsdove Framework", "One framework. One visual language. Configurable identities. Reusable systems.",
    Hero("section", { eyebrow: "V5.2 MVP", title: "Build products, not framework glue.", description: "The framework is configuration-first, browser-native and built around reusable composition.", actions: [PrimaryButton("button", {}, "Explore components"), SecondaryButton("button", {}, "Open systems")] }),
    Card("section", {},
      Stack("div", { gap: "md" },
        Heading("h2", {}, "Design language"),
        Cluster("div", {}, Badge("span", { variant: "primary" }, "Primary"), Badge("span", { variant: "accent" }, "Featured"), Badge("span", { variant: "success" }, "Available"), Badge("span", { variant: "danger" }, "Unavailable")),
        Cluster("div", {}, PrimaryText("span", {}, "Primary"), SecondaryText("span", {}, "Secondary"), MutedText("span", {}, "Muted"), AccentText("span", {}, "Accent"))
      )
    ),
    Card("section", {},
      Stack("div", { gap: "md" },
        Heading("h2", {}, "Store-connected controls"),
        QuantityControl("div", { storePath: "form.quantity", min: 1, max: 20 }),
        Tabs("div", { storePath: "ui.tab", items: [
          { value: "overview", label: "Overview", content: Text("p", {}, "This tab is persisted in the application Store.") },
          { value: "state", label: "State", content: Text("p", {}, "Components can bind to shared state without owning global variables.") }
        ] })
      )
    )
  );
}

export default Overview;
