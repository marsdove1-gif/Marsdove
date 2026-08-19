import Box from "../ui/Box.js";
import Button from "../ui/Button.js";
import Input from "../ui/Input.js";
import { resolveStore } from "../../core/store/resolveStore.js";
import styleCom from "../../helpers/styleCom.js";
styleCom("/styles/components/commerce.css");
export default function QuantityControl(tag="div", { value=1, min=1, max=Infinity, step=1, store, storePath, onChange, className="", ...props }={}, ...children) {
  const root=Box(tag,{...props,className:["quantity-control",className].filter(Boolean).join(" ")});
  const input=Input("input",{type:"number",min,max,step,value, className:"quantity-input", inputMode:"numeric"});
  const storeRef=resolveStore(store); let current=Number(value)||min;
  function set(next){ current=Math.min(max,Math.max(min,next)); input.value=current; onChange?.(current); if(storeRef&&storePath) storeRef.set(storePath,current); }
  root.append(Button("button",{type:"button",variant:"ghost","aria-label":"Decrease quantity",onClick:()=>set(current-step)},"−"),input,Button("button",{type:"button",variant:"ghost","aria-label":"Increase quantity",onClick:()=>set(current+step)},"+"),...children);
  input.addEventListener("input",()=>set(Number(input.value)||min));
  if(storeRef&&storePath){ const stored=storeRef.get(storePath); if(stored!=null)set(Number(stored)); storeRef.subscribe(storePath,v=>{if(v!=null&&Number(v)!==current){current=Number(v);input.value=current;}}); }
  return root;
}
export { QuantityControl };
