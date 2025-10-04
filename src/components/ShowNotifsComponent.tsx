import { Toast } from "primereact/toast";
import { useEffectEvent } from "react-dom";


export default function ShowNotifsComponent(result: { status: string; message: string }, toast){
    return(
    useEffectEvent((result: { status: string; message: string }, toast)=>{
        if (result.status == "success"){
            toast.current?.show({
              severity: 'success',
              summary: 'Success',
              detail : 'Item updated successfully ! ',
              life: 3000
          })
        }
        else if (result.status == "failed"){
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete items',
                life: 3000
          });
        }
    })
        
)}


