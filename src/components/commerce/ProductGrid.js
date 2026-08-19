import Grid from "../ui/Grid.js";
import ProductCard from "./ProductCard.js";
export default function ProductGrid(tag="div",{products=[],columns,className="",...props}={},...children){return Grid(tag,{...props,columns,className:["product-grid",className].filter(Boolean).join(" ")},...products.map((p,i)=>ProductCard("article",{product:p,key:p.id||i})),...children)}
export { ProductGrid };
