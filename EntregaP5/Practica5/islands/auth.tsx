import { useState,useEffect } from 'preact/hooks';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    useEffect(() => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        setIsValidEmail(emailRegex.test(email));
    },[email]);

    
    function handleSubmit (e:any) {
        e.preventDefault();
        if (isValidEmail && isValidPassword) {
            document.cookie = `auth=${JSON.stringify({email,password})}`;
            document.location.href = "/client/home" 
        } else {
            alert('La contraseña o el correo no son válidos');
        }
    };

    function handlePassword (e:any){
        setPassword(e.currentTarget.value); 
        setIsValidPassword(e.target.value.length >= 6);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type ="text" name="email"id="email" value={email} placeholder={"Introduce un correo"} onInput={(e)=>setEmail(e.currentTarget.value)}></input>
                    <input type ="password" name="email"id="password"placeholder={"Introduce un contraseña"} required minLength={6}onInput={handlePassword}></input><br/>
                    <button class="boton2"type="submit">Acceder</button>
                </div>
                
            </form>
        </div>
    );
};

export default AuthPage;