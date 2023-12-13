# Memório

## Descrição 
O projeto Memório é um jogo de memória online desenvolvido utilizando as tecnologias NestJS, NextJS e Socket.io. Ele oferece uma experiência divertida e interativa, permitindo que os usuários joguem entre si, testando e aprimorando suas habilidades de memória.

## Tecnologias Utilizadas
O Memório é construído com um conjunto de tecnologias modernas e eficientes, proporcionando um ambiente de desenvolvimento robusto e uma experiência de usuário agradável. As principais tecnologias incluem:

- **TypeScript**: Uma linguagem de programação que adiciona tipagem estática ao **JavaScript**, facilitando o desenvolvimento e manutenção de código.

- **NestJS**: Um framework para construção de aplicativos server-side robustos e escaláveis utilizando TypeScript.

- **NextJS**: Um framework React que permite renderização de páginas no lado do servidor, proporcionando uma aplicação web rápida e eficiente.

- **Socket.io**: Uma biblioteca que permite comunicação em tempo real bidirecional entre clientes e servidor.

- **Docker**: Plataforma que facilita a criação, implantação e execução de aplicativos em contêineres.

## Demonstração

https://github.com/WiliamMelo01/memorio/assets/109559789/28f8b869-0588-403f-b584-abaded05dc8b

## Como executar localmente
## Com Docker
  ### Requisitos
   - Docker
   - Docker compose
  ### 1. Clone o repositorio
  ```
  git clone https://github.com/WiliamMelo01/memorio
  ```
  ### 2. Entre na pasta do projeto
  ```
  cd memorio
  ```
  ### 3. Ultilize o Docker-Compose para criar e iniciar os contêineres necessários.
  ```
  docker-compose up -d
  ```
  ### 4. Abra a aplicação Web no endereço
  ```
  localhost:3000
  ```
## Sem Docker
### Requisitos
   - Node >= 20
   ### 1. Clone o repositorio
  ```
  git clone https://github.com/WiliamMelo01/memorio
  ```
  ### 2. Entre na pasta do projeto Backend
  ```
  cd memorio/back
  ```
  ### 3. Instale as dependencias do Backend
  ```
  npm install
  # ou
  yarn
  ```
### 4. Execute a aplicação Backend em modo de desenvolvimento
  ```
  npm run start:dev
  # ou
  yarn run start:dev
```
### 5.Entre na pasta do projeto Frontend
 ```
  cd ..
  cd front
```
  ### 6. Instale as dependencias do Frontend
  ```
  npm install
  # ou
  yarn
  ```
### 7. Execute a aplicação Frontend em modo de desenvolvimento
```
  npm run dev
  # ou
  yarn run dev
  ```
## :building_construction: Em desenvolvimento
- Partidas privadas
- Testes

## Contribuições:
Contribuições são bem-vindas! Sinta-se à vontade para reportar problemas, sugerir melhorias ou enviar pull requests para tornar o Memório ainda mais incrível.

## Licença
A licença do projeto encontra-se disponivel [aqui](https://github.com/WiliamMelo01/memorio/blob/master/LICENSE) .
