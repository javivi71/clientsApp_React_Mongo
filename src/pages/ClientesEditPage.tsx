import { useEffect, useState } from "react";
import { ClientService } from "../services/clientService";
import { useHistory, useLocation, useParams } from "react-router";
import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonToast,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";

export default function ClientesEditPage() {
  // 🆕 Obtenemos el ID de la URL
  const { _id } = useParams<{ _id: string }>();

  const [client, setClient] = useState({
    _id: "",
    nombre: "",
    ciudad: "",
    facturacion: 0,
  });

  // location + state
  const location = useLocation();
  const cliente: any = location.state;
  const history = useHistory();

  // Toast
  const [showToast, setShowToast] = useState(false);

  console.log(cliente);

  // save()
  const save = async () => {
    await ClientService.updateClient(client);

    // Toast
    setShowToast(true);
    history.push("/clients");
    // const navigate = useNavigate(); <- React Router 6
  };
  // Fin save()

  useEffect(() => {
    if (cliente) {
      setClient(cliente);
    }
  }, []);

  return (
    <IonPage>
      <IonContent>
        
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={`Modificando cliente con ID: ${client._id}`}
          duration={3000}
          color="warning"
        />

        <IonInput
          readonly
          placeholder="id"
          value={client._id}
          disabled
          onIonInput={(e) =>
            setClient({ ...client, _id: e.detail.value || "" })
          }
        />
        <IonInput
          value={client.nombre}
          placeholder="nombre"
          onIonInput={(e) =>
            setClient({ ...client, nombre: e.detail.value || "" })
          }
        />
        <IonInput
          value={client.ciudad}
          placeholder="ciudad"
          onIonInput={(e) =>
            setClient({ ...client, ciudad: e.detail.value || "" })
          }
        />
        <IonInput
          value={client.facturacion}
          placeholder="facturación"
          onIonInput={(e) =>
            setClient({ ...client, facturacion: Number(e.detail.value) || 0 })
          }
        />

        <IonButton onClick={save}>Actualizar</IonButton>
      </IonContent>
    </IonPage>
  );
}
