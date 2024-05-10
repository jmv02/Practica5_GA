import { FreshContext, Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { Mail } from "../../types.ts";


export const handler:Handlers = {
    GET: (req:Request,ctx:FreshContext) => {
        const cookies = getCookies(req.headers)

        const auth = cookies["auth"]
        const mail =cookies["mail"]
        if(!auth) {
            const headers = new Headers()
            headers.set("location", "/auth")
            return new Response("", {
                status: 302,
                headers
            })
        }
        if(!mail){
            const headers = new Headers()
            headers.set("location", "/client/home")
            return new Response("", {
                status: 302,
                headers
            })
        }

        const data:Mail[]= JSON.parse(mail);
        console.log("data from handler",data);
        return(
        ctx.render(data)); 
        }
        
    }