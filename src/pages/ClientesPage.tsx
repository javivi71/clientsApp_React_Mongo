import { IonPage, IonContent, useIonViewDidEnter } from "@ionic/react";
import { useState } from "react";
import { ClientService } from "../services/clientService";
import "./ClientesPage.scss"

export default function ClientesPage(){

    const [clients,setClients] = useState<any[]>([]);
    
    const loadClients = async() => {
       const datos = await ClientService.getClients();
       setClients(datos);
    };

    useIonViewDidEnter(() => {
      loadClients();
    },[]);

// 🆕 Función para eliminar un cliente
  const handleDelete = async (id: string, nombre: string) => {
    // Confirmación antes de eliminar
    if (window.confirm(`¿Estás seguro de que quieres eliminar a "${nombre}"?`)) {
      try {
        await ClientService.deleteClient(id);
        // Recargamos la lista después de eliminar
        await loadClients();
        alert("Cliente eliminado correctamente");
      } catch (error) {
        alert("Error al eliminar el cliente");
        console.error(error);
      }
    }
  };

  return (
    <IonPage>
      <IonContent>
        <h2>Tabla clientes</h2>

        <table>
          <thead>
            <tr>
              <th>Nombre&nbsp;</th>
              <th>Ciudad&nbsp;</th>
              <th>Facturación&nbsp;</th>
              <th>Acciones&nbsp;</th> {/* 🆕 Nueva columna */}
            </tr>
          </thead>

          <tbody>
            {clients.map((cliente) => (
              <tr key={cliente._id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.ciudad}</td>
                <td>{cliente.facturacion}</td>
                <td>
                  {/* 🆕 Botón de eliminar */}
                  <button
                    onClick={() => handleDelete(cliente._id, cliente.nombre)}
                    
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </IonContent>
    </IonPage>
  );
}
