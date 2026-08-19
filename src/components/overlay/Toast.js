import Box from "../ui/Box.js";
import Button from "../ui/Button.js";
import Text from "../ui/Text.js";
import { resolveStore } from "../../core/store/resolveStore.js";
export default function Toast(tag="div",{message="",title,type="info",duration=4000,store,storePath,onClose,className="",...props}={},...children){
 const root=Box(tag,{...props,role:"status",className:["toast",`toast-${type}`,className].filter(Boolean).join(" ")},title?Text("strong",{className:"toast-title"},title):null,Text("span",{className:"toast-message"},message),Button("button",{type:"button",variant:"ghost","aria-label":"Close notification",onClick:close},"×"),...children);
 const storeRef=resolveStore(store); function close(){root.remove();onClose?.();if(storeRef&&storePath)storeRef.set(storePath,null);} if(duration>0)setTimeout(close,duration); return root;
}
export { Toast };
