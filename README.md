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

## :computer:	 Testes automatizados

- Testes de integração
- Testes unitários
- Testes ponta a ponta (E2E)

***

## 🏁 Rodando a aplicação

Certifique-se que você tenha a última versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório em sua máquina:

```
git clone https://github.com/isadoragravila/projeto21-singmeasong.git
```

### Configurando o front-end

Pelo terminal, vá até o diretório front-end e rode o seguinte comando para instalar as dependências:

```
npm install
```

Então, configure seu arquivo .env, de acordo com o .env.example.

Finalizado o processo, para inicializar o servidor, rode:
```
npm start
```

### Configurando o back-end

Pelo terminal, vá até o diretório back-end e rode o seguinte comando para instalar as dependências:

```
npm install
```

Então, configure seus arquivos .env e .env.test, de acordo com o .env.example.

Depois, dentro da pasta, rode o seguinte comando para migrar o banco de dados:

```
npm run prisma
```

Finalizado o processo, para inicializar o servidor, rode:
```
npm run dev
```
***

## 🏁 Rodando os testes

