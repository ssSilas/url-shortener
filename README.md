# .ENV

Para executar o seu projeto rapidamente, utilize a .env de desenvolvimento com o nome ".env_development". Para utiliza-la no projeto, renomeie o arquivo para ".env".

# Docker

Para configurar e iniciar a aplicação utilizando Docker, siga os passos abaixo:

## 1. Ajustando Permissões
Antes de subir os contêineres, é importante garantir que você tenha as permissões corretas para manipular os arquivos e scripts do Docker. Execute os seguintes comandos:

```bash
sudo chown -R $USER:$USER .docker
chmod +x .docker/entrypoint.sh
```

- **sudo chown -R $USER:$USER .docker**: Este comando altera o proprietário e o grupo da pasta `.docker` e de todos os seus arquivos para o usuário atual. Isso garante que você tenha as permissões necessárias para manipular os arquivos dentro da pasta `.docker`.
  
- **chmod +x .docker/entrypoint.sh**: Este comando concede permissão de execução para o script `entrypoint.sh`. Isso é necessário para que o script possa ser executado corretamente ao iniciar o contêiner.

## 2. Subindo a Aplicação e Banco de dados com Docker Compose

Após ajustar as permissões, você pode subir a aplicação com o Docker Compose. Execute o seguinte comando:

```bash
docker-compose up
```

- **docker-compose up**: Este comando inicia os serviços definidos no arquivo `docker-compose.yml`. Ele cria e inicia os contêineres conforme especificado na configuração, e mantém os logs em tempo real visíveis no terminal.

Após a execução desses comandos, a aplicação estará rodando em contêineres Docker, pronta para ser acessada conforme configurado.

# Url Shortener - Postman Collection

## Descrição
  A collection do projeto se encontra na raiz do projeto com o nome "url_shortener.postman_collection.json". A mesma inclui endpoints para autenticação de usuário, criação, consulta, atualização e exclusão de URLs encurtadas, além do endpoint que irá redirecionar o usuário para a url original(não encurtada).

## Variáveis de Ambiente
- **API_URL**: URL base da API (padrão: `http://localhost:3050`)
- **AUTH_TOKEN**: Token de autenticação, que será preenchido automaticamente após a execução do endpoint de login.

## Endpoints

### 1. **Auth**
#### 1.1. Login
- **Método**: `POST`
- **URL**: `{{API_URL}}/auth/sign-in`
- **Corpo da Requisição**:
  ```json
  {
      "email": "teste_email@gmail.com",
      "password": "test"
  }
  ```
- **Descrição**: Este endpoint realiza a autenticação do usuário. O token de autenticação retornado é armazenado na variável `AUTH_TOKEN` da coleção.

#### 1.2. Create
- **Método**: `POST`
- **URL**: `{{API_URL}}/auth/add-user`
- **Corpo da Requisição**:
  ```json
  {
      "name": "teste",
      "email": "teste_email@gmail.com",
      "password": "test"
  }
  ```
- **Descrição**: Este endpoint cria um novo usuário.

### 2. **Url Shortener**
#### 2.1. Create
- **Método**: `POST`
- **URL**: `{{API_URL}}/url-shortener`
- **Corpo da Requisição**:
  ```json
  {
      "url": "https://stackoverflow.com/questions/66335078/url-input-validation-nestjs"
  }
  ```
- **Descrição**: Este endpoint cria um URL encurtado para a URL fornecida.

#### 2.2. Find All
- **Método**: `GET`
- **URL**: `{{API_URL}}/url-shortener`
- **Descrição**: Este endpoint retorna todas as URLs encurtadas cadastradas pelo usuário logado.
- **🔴 Observação**: Caso não esteja logado, não será possível realizar a requisição com sucesso. O status 401 será retornado.


#### 2.3. Acess Url
- **Método**: `GET`
- **URL**: `http://localhost:3050/T1-LGx`
- **Descrição**: Este endpoint acessa uma URL encurtada específica, redirecionando para a URL original. Basta adicionar um encurtador criado anteriormente, estando logado ou nao.

#### 2.4. Update
- **Método**: `PUT`
- **URL**: `{{API_URL}}/url-shortener/10`
- **Corpo da Requisição**:
  ```json
  {
      "newUrl": "https://www.google.com/search?q=translate&oq=tra&aqs=chrome.0.69i59j69i57j69i61l2.534j0j4&sourceid=chrome&ie=UTF-8"
  }
  ```
- **Descrição**: Este endpoint atualiza a URL original associada a uma URL encurtada cadastrada pelo usuário logado, caso ela exista e pertença ao mesmo.
- **🔴 Observação**: Caso não esteja logado, não será possível realizar a requisição com sucesso. O status 401 será retornado.

#### 2.5. Remove
- **Método**: `DELETE`
- **URL**: `{{API_URL}}/url-shortener/10`
- **Descrição**: Este endpoint remove uma URL encurtada específica cadastrada pelo usuário logado, caso ela exista e pertença ao mesmo.
- **🔴 Observação**: Caso não esteja logado, não será possível realizar a requisição com sucesso. O status 401 será retornado.

## Execução dos Testes
Após realizar o login, o token de autenticação será armazenado automaticamente na variável `AUTH_TOKEN`. Todos os endpoints da coleção que requerem autenticação utilizarão este token para autorizar as requisições subsequentes.

## Observações
- Certifique-se de atualizar as variáveis de ambiente conforme necessário para executar a coleção em diferentes ambientes (por exemplo, desenvolvimento, produção).
- O token de autenticação deve ser renovado periodicamente ao executar o endpoint de login.