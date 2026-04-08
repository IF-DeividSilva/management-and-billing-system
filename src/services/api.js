const BASE_URL = "https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend";

export const api = {
  // GET para busca
  // retorna url+endpoint
  // não precisa de método, headers ou body (só leitura)
  get: (endpoint) => {
    return fetch(`${BASE_URL}${endpoint}`)
      .then(response => {
        if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
        return response.json();
      });
  },

  // POST para novos produtos
  // retorna url+endpoint
  // informa o metodo  e headers (mexe nos dados)
  post: (endpoint, data) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
      return response.json();
    });
  },

  // PUT editar produtos
  // retorna url+endpoint
  // informa o metodo  e headers (mexe nos dados)
  put: (endpoint, data) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
      return response.json();
    });
  },

  // DELETE para remover produtos
  // retorna url+endpoint
  // não envia body nem headers pois só precisa do id no endpoint
  delete: (endpoint) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE"
    }).then(response => {
      if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
      return { success: true, message: "Item deletado com sucesso!" };
    }).catch(erro => {
      throw new Error(erro.message || "Erro ao deletar");
    });
  }
};