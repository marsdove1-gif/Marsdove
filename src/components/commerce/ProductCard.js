import Card from "../ui/Card.js";
import Image from "../ui/Image.js";
import Stack from "../ui/Stack.js";
import Text from "../ui/Text.js";
import Price from "../typography/Price.js";
import Badge from "../ui/Badge.js";
import Button from "../ui/Button.js";
import styleCom from "../../helpers/styleCom.js";
styleCom("/styles/components/commerce.css");
export default function ProductCard(tag="article", { product={}, onAction, actionLabel="View product", className="", ...props }={}, ...children){
  const image=product.image||product.images?.[0];
  return Card(tag,{...props,className:["product-card",className].filter(Boolean).join(" ")},
    image?Image("img",{src:typeof image==="string"?image:image?.url,alt:product.name||"Product",className:"product-card-image"}):null,
    Stack("div",{gap:"xs",className:"product-card-content"},
      product.badge?Badge("span",{variant:product.badgeVariant||"accent"},product.badge):null,
      Text("h3",{className:"product-card-name"},product.name||"Untitled product"),
      product.description?Text("p",{tone:"secondary",size:"sm"},product.description):null,
      product.price!=null?Price("span",{amount:product.price,currency:product.currency||"NGN"}):null,
      Button("button",{variant:"primary",onClick:()=>onAction?.(product)},actionLabel),
      ...children
    )
  );
}
export { ProductCard };
