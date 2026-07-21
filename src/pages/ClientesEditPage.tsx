import { useState } from "react";
import { ClientService } from "../services/clientService";
import { useParams } from "react-router-dom";
import { useIonViewWillEnter } from "@ionic/react";

export default function ClientesEditPage(){

  const [client, setClient] = useState({
    _id:"",
    nombre: "",
    ciudad: "",
    facturacion: 0
  });
   const save = async () => {
    await ClientService.updateClient(client);

    // const navigate = useNavigate(); <- React Router 6
    // history.push("/clients");
  }; // Fin save()

    return (

       <div>
          <input
            placeholder="id"
            onChange={(e) => setClient({ ...client, _id: e.target.value })}
          />
          <input
            placeholder="nombre"
            onChange={(e) => setClient({ ...client, nombre: e.target.value })}
          />
          <input
            placeholder="ciudad"
            onChange={(e) => setClient({ ...client, ciudad: e.target.value })}
          />
          <input
            placeholder="facturación"
            onChange={(e) => setClient({ ...client, facturacion: Number(e.target.value) })}
          />
          
          <button onClick={save}>Guardar</button>

       </div>
    );
}


