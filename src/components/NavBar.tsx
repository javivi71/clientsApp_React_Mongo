import { IonButton, IonPage } from "@ionic/react";
import { useHistory } from "react-router";

export default function NavBar() {
  const history = useHistory();

  function login() {
    history.push("/login");
  }

  function logout() {
    localStorage.removeItem("token");
  }

  function altacliente() {
    history.push("/altacliente");
  }

  return (

      <IonPage>
      <IonButton onClick={login}>Login</IonButton>
      <IonButton onClick={logout}>Logout</IonButton>
      <IonButton  routerLink = "/registro">Registro</IonButton>
      </IonPage>

  );
}
