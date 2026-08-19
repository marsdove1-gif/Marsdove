import Box from "../ui/Box.js";
import Button from "../ui/Button.js";
import { resolveStore } from "../../core/store/resolveStore.js";
import styleCom from "../../helpers/styleCom.js";
styleCom("/styles/components/overlay.css");
export default function Drawer(tag="aside",{open=false,side="right",store,storePath,onClose,className="",title="",...props}={},...children){
 const root=Box(tag,{...props,hidden:!open,role:"dialog","aria-modal":"true",className:["drawer",`drawer-${side}`,className].filter(Boolean).join(" ")});
 const storeRef=resolveStore(store); let visible=Boolean(open);
 const set=(next)=>{visible=Boolean(next);root.hidden=!visible; if(storeRef&&storePath)storeRef.set(storePath,visible); if(!visible)onClose?.();};
 root.append(Box("header",{className:"drawer-header"},title?Box("h2",{className:"drawer-title"},title):null,Button("button",{type:"button",variant:"ghost","aria-label":"Close",onClick:()=>set(false)},"×")),Box("div",{className:"drawer-body"},...children));
 if(storeRef&&storePath){const v=storeRef.get(storePath);if(v!=null)set(v);storeRef.subscribe(storePath,set);}
 return root;
}
export { Drawer };
