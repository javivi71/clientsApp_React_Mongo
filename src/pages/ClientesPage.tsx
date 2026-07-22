import {
  IonPage,
  IonContent,
  useIonViewDidEnter,
  IonButton,
} from "@ionic/react";

import { useState } from "react";
import { ClientService } from "../services/clientService";

import "./ClientesPage.scss";

import { useHistory } from "react-router";

export default function ClientesPage() {
  const [clients, setClients] = useState<any[]>([]);
  const history = useHistory();

  const loadClients = async () => {
    const datos = await ClientService.getClients();
    setClients(datos);
  };

  useIonViewDidEnter(() => {
    loadClients();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const confirmarDelete = async (id: number) => {
    const confirm = window.confirm("¿Deseas elimitar el cliente?");
    if (confirm) {
      await ClientService.deleteClient(id);
      loadClients();
    }
  };

  return (
    <IonPage>
      <IonContent>
        <h2 className="text-5xl font-bold text-blue-600 text-center mt-5" >
          Tabla clientes
        </h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Facturación</th>
              <th>Borrado</th>
              <th>Navegación</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((cliente) => (
              <tr key={cliente._id}>
                <td>{cliente._id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.ciudad}</td>
                <td className="text-end">
                  {formatCurrency(cliente.facturacion)}
                </td>
                <td>
                  <IonButton
                    /* onClick={() => handleDelete(cliente._id, cliente.nombre)} */
                    onClick={() => {
                      confirmarDelete(cliente._id);
                    }}
                  >
                    🗑️ Eliminar
                  </IonButton>
                </td>

                <td>
                  <IonButton
                    onClick={() => {
                      history.push("/editar", cliente);
                    }}
                  >
                    {" "}
                    Editar
                  </IonButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </IonContent>
    </IonPage>
  );
}
