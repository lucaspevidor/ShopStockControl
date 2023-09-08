# ShopStockControl
Sistema de controle de estoque

## Pré-requisitos

- Node.js (v18.14.0 ou mais nova)
- npm (v9.3.1 ou mais nova)
- Banco de dados MySQL (v8) com uma database configurada conforme o arquivo `database.sql`.

# Backend

## Instalação

1. Clone o repositório
    ```bash
    git clone https://github.com/lucaspevidor/ShopStockControl.git
    ```

1. Navegue até o diretório `backend` e instale as dependências
    ```bash
    cd backend
    npm i
    ```

1. Crie o arquivo `.env` na raiz do diretório `backend`, com o seguinte conteúdo:
    ```bash
    DATABASE_URL="mysql://<user>:<password>@<endereço_mysql>:<porta>/<nome_db>"
    ```

## Executando o servidor

Para iniciar o servidor, execute os comandos abaixo:

```bash
cd backend
npm run dev
```

O servidor será iniciado na porta 3000

## Deploy

1. Compile o servidor com os comandos:
    ```bash
    cd backend
    npx tsc
    ```

1. Execute o servidor:
    ```bash
    node ./dist/server.js
    ```

# Frontend

## Instalação

1. Clone o repositório
    ```bash
    git clone https://github.com/lucaspevidor/ShopStockControl.git
    ```

1. Navegue até o diretório `frontend` e instale as dependências
    ```bash
    cd frontend
    npm i
    ```

1. Crie o arquivo `.env` na raiz do diretório `frontend`, com o seguinte conteúdo:
    ```bash
    VITE_API_URL="http://<backend_url>:<port>/"
    ```

## Executando o servidor

Para iniciar o servidor, execute os comandos abaixo:

```bash
cd frontend
npm run dev
```

O frontend será iniciado em http://localhost:5173