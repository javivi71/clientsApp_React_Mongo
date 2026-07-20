export class ClientService{
  static async getClients() {
     const res = await fetch( "http://localhost:3000/clients" );
     return await res.json();
  }
}