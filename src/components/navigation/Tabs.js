import Box from "../ui/Box.js";
import Button from "../ui/Button.js";
import { resolveStore } from "../../core/store/resolveStore.js";
export default function Tabs(tag="div",{items=[],value,store,storePath,onChange,className="",...props}={},...children){
 const root=Box(tag,{...props,className:["tabs",className].filter(Boolean).join(" ")});const storeRef=resolveStore(store);let current=value??items[0]?.value??"";
 const tabs=Box("div",{className:"tabs-list",role:"tablist"});const panel=Box("div",{className:"tabs-panel"});
 function render(){tabs.replaceChildren();const item=items.find(x=>String(x.value)===String(current));items.forEach(x=>tabs.append(Button("button",{type:"button",variant:String(x.value)===String(current)?"primary":"ghost",role:"tab","aria-selected":String(x.value)===String(current),onClick:()=>set(x.value)},x.label)));panel.replaceChildren(item?.content??"");}
 function set(v){current=v;render();onChange?.(v);if(storeRef&&storePath)storeRef.set(storePath,v);}
 if(storeRef&&storePath){const v=storeRef.get(storePath);if(v!=null)current=v;storeRef.subscribe(storePath,v=>{if(v!=null&&v!==current){current=v;render();}});}
 root.append(tabs,panel,...children);render();return root;
}
export { Tabs };
