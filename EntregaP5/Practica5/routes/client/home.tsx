import {  deleteCookie, getCookies, setCookie} from "$std/http/cookie.ts"
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Mail } from "../../types.ts";



export const handler:Handlers = {
    GET: (req:Request,ctx:FreshContext<unknown,Mail[]>) => {
        const cookies = getCookies(req.headers)

      
        const auth = cookies["auth"]
        const mail = cookies["mail"]
        if(!auth) {
            const headers = new Headers()
            headers.set("location", "/auth")
            return new Response("", {
                status: 302,
                headers
            })
        }
   
        const data:Mail[]= JSON.parse(mail);
        console.log("data from handler",data);
        return(
        ctx.render(data)
        );
    }
}


const Page = (props:PageProps<Mail[]>) => {

    const data = props.data; 
    console.log("data from props",data);
    
    return (
        <>
        <div class ="center">
          <h1>Correos</h1>
          <p>{data}</p>
        
            <header>
              <h1>Nebrija</h1>
              <a href="/auth">Cerrar sesión</a>
            </header>
      
            </div>
        </>
      );
    }

    

export default Page; 