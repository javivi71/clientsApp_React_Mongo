import { useState } from "react";
import { register } from "../services/AuthService";
import { IonPage } from "@ionic/react";

export default function UsersAddPage(){

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: ""
  });

   const save = async () => {
    await register(user.email, user.password,user.role );
  };

    return (
    <IonPage>
       <div>
          <input
            placeholder="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            placeholder="role"
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          />
          
          <button onClick={save}>Guardar</button>

       </div>
       </IonPage>
    );
}