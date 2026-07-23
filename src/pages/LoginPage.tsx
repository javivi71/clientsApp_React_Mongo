import { IonButton, IonInput, IonPage } from "@ionic/react";
import { useState } from "react";
import { login } from "../services/AuthService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login2() {
    const token = await login(email, password);
    console.log(token);
    localStorage.setItem("token", token.token);
  }

  return (
    <IonPage>
      <div className="container mt-4">
        <h2>Página de Login</h2>

        <IonInput
          placeholder="Mete tu correo"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value || "")}
        />
        <IonInput
          placeholder="Mete tu contraseña"
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value || "")}
        />
        <IonButton onClick={login2}>Login</IonButton>
      </div>
    </IonPage>
  );
}
