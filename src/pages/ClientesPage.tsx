import { IonPage, IonContent, useIonViewDidEnter } from "@ionic/react";
import { useState } from "react";
import { ClientService } from "../services/clientService";

export default function ClientesPage(){

    const [clients,setClients] = useState<any[]>([]);
    
    const loadClients = async() => {
       const datos = await ClientService.getClients();
       setClients(datos);
    };

    useIonViewDidEnter(() => {
      loadClients();
    },[]);


    return (
      <IonPage>
        <IonContent>
          <h2>Tabla clientes</h2>
          
          <table>
            <thead>
            <tr>
             <th>Nombre&nbsp;</th>
             <th>Ciudad&nbsp;</th>
             <th>facturación&nbsp;</th>
             </tr>
            </thead>

            <tbody>
               
               {clients.map((cliente) => (
                <tr key={cliente._id}>
               <td>{cliente.nombre}</td>
               <td>{cliente.ciudad}</td>
               <td>{cliente.facturacion}</td>
               </tr>
               ))}

            </tbody>
           </table>
        </IonContent>
      </IonPage>
    );
}
