import { useState } from "react";
import { ClientService } from "../services/clientService";
import { useParams } from "react-router-dom";
import { useIonViewWillEnter } from "@ionic/react";

export default function ClientesEditPage() {

  // 🆕 Obtenemos el ID de la URL
  const { _id } = useParams<{ _id: string }>();

  const [client, setClient] = useState({
    _id: "",
    nombre: "",
    ciudad: "",
    facturacion: 0
  });

  // 🆕 Cargamos los datos del cliente al entrar
  useIonViewWillEnter(async () => {
    if (_id) {
      // Buscamos el cliente por ID (usamos getClients y filtramos)
      const clients = await ClientService.getClients();
      const found = clients.find((c: any) => c._id === _id);
      if (found) {
        setClient(found);
      }
    }
  }, []);

  const save = async () => {
    await ClientService.updateClient(client);

    // const navigate = useNavigate(); <- React Router 6
    // history.push("/clients");
  }; // Fin save()

  return (

    <div>
      <input
        placeholder="id"
        value={client._id}
        disabled  // 🆕 Deshabilitamos la edición del ID
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


