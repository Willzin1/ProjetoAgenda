# Agenda de contatos

Este projeto é um CRUD de uma agenda de contatos, desenvolvido durante um curso
de Javascript, node.js e mongoDB. Ele permite que o usuários criem, leiam, editem
e excluam as informações de contatos. Ele está hospedado na Google Cloud Platform.

## Funcionalidades 

**Criar**: Adicionar contatos com informações como nome, sobrenome, e-mail e telefone.
**Ler**: Visualizar a lista de contatos cadastrados.
**Editar** Editar informações dos contatos existentes.
**Excluir** Remover um contato da agenda.

## Tecnologias 

**Frontend** HTML, CSS, Javascript
**Backend** Node.js, Express
**Banco de dados** MongoDB
**Padrão de projeto** MVC (Model-View-Controller)
**Deploy**: Google Cloud Platform (GCP)

## Estrutura do projeto

O projeto segue o padrão **MVC** com a seguinte estrutura:

**frontend/:** Contém os arquivos do frontend (HTML, CSS, JS), o **Webpack**
    é utilizado para empacotar e otimizar os arquivos.

**public/:** Arquivos públicos como imagens. O webpack irá empacotar os
    arquivos aqui dentro.

**src/:** Contém o código do backend:
    • Model: Lógica e estrutura dos dados.
    • View: Arquivos de visualização.
    • Controller: Lógica de controle e rotas do servidor.

**src.js:** Arquivo principal do servidor.

**Webpack.config.js:** Arquivo com a configuração do webpack.

**Routes.js:** Define as rotas do backend.

**package.json:** Contém as dependências do projeto.

O projeto estará disponível em `http://localhost:3000`.
    

Feito por [William](https://github.com/Willzin1)