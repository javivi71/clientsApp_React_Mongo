import { useState } from "react";
import { ClientService } from "../services/clientService";

export default function ClientesAddPage(){

  const [client, setClient] = useState({
    nombre: "",
    ciudad: "",
    facturacion: 0
  });

   const save = async () => {
    await ClientService.addClient(client);

    // const navigate = useNavigate(); <- React Router 6
    // history.push("/clients");
  };

    return (

       <div>
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