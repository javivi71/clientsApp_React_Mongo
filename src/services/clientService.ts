import { Client } from "../models/Client";

export class ClientService{

  static async getClients() {
     const res = await fetch( "http://localhost:3000/clients" );
     return await res.json();
  }

  static async addClient(client:Client) {
    const token = localStorage.getItem('token');
     
    const res = await fetch( "http://localhost:3000/clients/new",
       {
        method:"post",
        body:JSON.stringify(client),
        headers: {
             "content-type":"application/json",
             Authorization: `Bearer ${token}`
          }
       }
      );    

     return await res.json();
  } // Fin addClient()

    static async updateClient(client:Client) {
     const res = await fetch( "http://localhost:3000/clients/update/"  + client._id ,
      {
        method:"put",
        body:JSON.stringify(client),
        headers: {
             "content-type":"application/json"
          }
       }
     );
     return await res.json();
  } // Fin updateClient()

/*     static async deleteClient(id:number) {
     const res = await fetch( "http://localhost:3000/clients/delete/" + id );
     return await res.json();
  } // Fin deleteClient() */

  static async deleteClient(id: number ) {
    const res = await fetch("http://localhost:3000/clients/delete/" + id, {
      method: "delete"  // Añadimos el método DELETE explícitamente
    });
  }
}