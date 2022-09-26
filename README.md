# <p align = "center"> :headphones: Projeto Sing Me a Song </p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/102394075/192192297-5ed9d474-7a29-4b3e-8538-b66fe973ec0c.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-isadoragravila-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/isadoragravila/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

Sing me a song é uma aplicação para recomendação anônima de músicas. Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas. Este projeto é voltado para a realização de testes automatizados.

***

## :mag_right:	 Testes automatizados

- Testes de integração
- Testes unitários
- Testes ponta a ponta (E2E)

***

## :computer:	 Tecnologias

- Jest
- Cypress
- Prisma
- Express
- React

***

## 🏁 Rodando a aplicação

Certifique-se que você tenha a última versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório em sua máquina:

```
git clone https://github.com/isadoragravila/projeto21-singmeasong.git
```
### Configurando o back-end

Pelo terminal, vá até o diretório back-end e rode o seguinte comando para instalar as dependências:

```
npm install
```

Então, configure seus arquivos .env e .env.test, de acordo com o .env.example

```
PORT= porta em que a aplicação irá rodar no servidor (sugestão: 5000)
DATABASE_URL= postgres://YourUser:YourPassword@YourHost:5432/YourDatabase
```

Depois, dentro da pasta, rode o seguinte comando para migrar o banco de dados:

```
npm run prisma
```

Finalizado o processo, para inicializar o servidor, rode:
```
npm run dev
```

### Configurando o front-end

Pelo terminal, vá até o diretório front-end e rode o seguinte comando para instalar as dependências:

```
npm install
```

Então, configure seu arquivo .env, de acordo com o .env.example.

```
REACT_APP_API_BASE_URL=http://localhost:PORT
*PORT: mesma porta em que o back-end irá rodar
```

Finalizado o processo, para inicializar o servidor, rode:
```
npm start
```
***

## 🏁 Rodando os testes

:stop_sign: Certifique-se de utilizar um arquivo .env.test e um banco de dados de testes para não comprometer o seu banco de dados original

### Testes de integração

Para rodar os testes de integração, abra o diretório de back-end no terminal e rode o seguinte comando:

```
npm run test:integration
```

### Testes unitários

Para rodar os testes unitários, abra o diretório de back-end no terminal e rode o seguinte comando:

```
npm run test:unit
```

### Testes E2E

Para rodar os testes E2E, primeiramente abra o diretório de back-end no terminal e inicialize o servidor:

```
npm run dev
```
Em seguida, em uma nova aba, abra o diretório de front-end no terminal e inicialize o servidor:

```
npm start
```

Então, em uma nova aba, abra o diretório de front-end no terminal e inicialize o Cypress:

```
npx cypress open
```

Na janela do Cypress, selecione a opção "E2E Testing" e depois clique no botão "Start E2E Testing in Electron"

Dessa forma, é possível escolher os testes a serem rodados, selecionando os specs
