import * as MD from "../../src/index.js";
import { page } from "./shared.js";
const { Header, Logo, Nav, Container, Stack, Grid, Cluster, Section, Heading, Text, Badge, PrimaryButton, SecondaryButton, GhostButton, Card, Input, Checkbox, Radio, Select, NativeSelect, Option, ImageUploader, Field, SearchField, Icon, Avatar, List, ListItem, Divider, Link, Spinner, Modal, Alert, Skeleton, EmptyState, Pagination, Table, Tabs, Drawer, Hero, ButtonGroup, ProductCard, ProductGrid, QuantityControl, Price, Footer, PrimaryText, SecondaryText, MutedText, AccentText } = MD;

function Systems() {
  return page("Systems", "Router, Store, overlays, data and feedback are exercised here.",
    Card("section", {}, Stack("div", { gap: "md" },
      Alert("div", { variant: "success", title: "Router active" }, Text("span", {}, "This page was resolved by Marsdove Router.")),
      Pagination("nav", { page: 1, pages: 3, onChange: page => console.log("page", page) }),
      Table("table", { columns: [{ key: "system", label: "System" }, { key: "status", label: "Status" }], rows: [{ system: "Store", status: "Ready" }, { system: "Router", status: "Ready" }, { system: "Theme", status: "Configurable" }] }),
      Skeleton("span", { width: "60%", height: "1rem" }),
      EmptyState("section", { title: "No records", description: "Reusable empty state." }),
      Cluster("div", {}, PrimaryButton("button", { onClick: () => { app.setState("ui.drawer", true); } }, "Open drawer"), Price("span", { amount: 125000 }))
    )),
    Drawer("aside", { storePath: "ui.drawer", title: "Marsdove Drawer" }, Text("p", {}, "This overlay is connected to the application Store."))
  );
}

export default Systems;
