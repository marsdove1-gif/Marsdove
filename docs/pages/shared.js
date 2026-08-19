import { Header, Container, Stack, Section, Heading, Text, Footer } from "../../src/index.js";

function page(title, description, ...children) {
  return Section("main", { contained: true },
    Stack("div", { gap: "lg" },
      Header("header", { items: [
        { label: "Overview", href: "/docs/" },
        { label: "Components", href: "/docs/components" },
        { label: "Systems", href: "/docs/systems" }
      ] }),
      Heading("h1", {}, title),
      Text("p", { size: "lg", tone: "secondary" }, description),
      ...children,
      Footer("footer", { copyright: "Marsdove Framework" })
    )
  );
}


export { page };
