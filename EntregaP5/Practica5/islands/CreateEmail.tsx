import {useState} from "preact/hooks"; 
import { Mail } from "../types.ts";


export default function CreateEmail(){

    const [receiver,setReceiver] = useState<string>(""); 
    const [subject,setSubject] = useState<string>(""); 
    const [body,setBody] = useState<string>(""); 
    const [id,setID] = useState<number>(1); 
    const [newEmail,setNewEmail] = useState<Mail>(); 
    const [Display,setDisplay] = useState(false); 
    
    function setMail(receiver:string,subject:string,body:string,id:number){
        const mail:Mail = {id,subject,body,receiver}; 
        setNewEmail(mail);
    }
    function validateReceiver() {
        let isValid = true; 
    
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(receiver)){
           isValid = false; 
        }
        setReceiver(receiver);  
    }

    function handleSubmit(e:any) {
        e.preventDefault();     // Al evento le impidemos su comportamiento por defecto
        
        const cookies = document.cookie.split("; "); 
        const MailCookie = cookies.find((cookie) => cookie.startsWith("mail="));

        if(!MailCookie){
            document.cookie= `mail=${JSON.stringify({newEmail})}; path=/;`;
            document.location.href = "/client/new";
        }else{
            const email:Mail[] = JSON.parse(MailCookie.split("=")[1]);
        }

            document.cookie= `mail=${JSON.stringify({newEmail})}; path=/;`;
            document.location.href = "/client/new";
    }
    
    return(
        <>
        <div class="center">
        <button class ="boton2"onClick = {() =>setDisplay(true)}>New Mail</button>
        </div>
        {
        Display && 
        <form class="form" onSubmit = {handleSubmit}>
        <input type = "text" placeholder="To:" onInput={(e)=>setReceiver(e.currentTarget.value)}></input>
        <input type = "text" placeholder="Subject:" onInput={(e)=>setSubject(e.currentTarget.value)}></input><br/>
        <input type = "text" placeholder="Write something:" onInput={(e)=>setBody(e.currentTarget.value)}></input>
        <button class ="boton1" onClick ={()=>{validateReceiver();setID(id+1);setMail(receiver,subject,body,id);}}>Enviar</button>
        <button class="boton2"onClick = {() =>setDisplay(false)}>Cerrar</button>
        </form>
        }
        

        </>
    )

}