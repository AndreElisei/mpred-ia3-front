# RCM 4.0 - Dashboard de Gestão de Ativos

Este repositório contém a Interface (Front-end) do sistema RCM 4.0 (MVP 3), desenvolvida como requisito para a pós-graduação em Desenvolvimento Full-Stack da PUC-Rio.

Esta aplicação React oferece um painel gerencial (Dashboard) focado na disponibilidade de ativos industriais e gestão de ordens de serviço. Ela consome a API Back-end desenvolvida em Python para exibir telemetria em tempo real, calcular o MTTR (Mean Time To Repair), emitir diagnósticos automáticos e despachar equipas de manutenção com base na distância geográfica do equipamento.

## Tecnologias Utilizadas

- **React** (Biblioteca de interfaces de utilizador)
- **Vite** (Build tool e servidor de desenvolvimento local)
- **React Router** (Navegação SPA)
- **Docker**

## Estrutura e Funcionalidades

- **Dashboard:** Resumo executivo exibindo a volumetria de ativos e o status operacional (Operacional vs. Parada).
- **Painel de Ativos:** Gestão da frota com localização (GPS), distância calculada da base técnica e exclusão de registos.
- **Detalhes e Telemetria:** Painel em tempo real atualizando métricas de vibração e temperatura, apresentando o diagnóstico gerado e permitindo o despacho logístico (criação e finalização de Ordens de Serviço).

## Instruções de Instalação e Execução

### Opção 1: Execução via Docker (Integrado)

Este Front-end está configurado para ser orquestrado via Docker Compose através do repositório do Back-end.
Para executar a infraestrutura completa:
1. Clone o repositório da API Principal e este repositório para a mesma diretoria no seu computador.
2. Navegue para a pasta da API Principal e execute:
   docker compose up --build
3. A interface do utilizador estará disponível no navegador em: `http://localhost:5173`

### Opção 2: Execução Local (Manual)

Se pretender correr apenas o ambiente React localmente para desenvolvimento:

1. Clone este repositório:
   git clone https://github.com/AndreElisei/mpred-ia-front.git
   cd mpred-ia-front
2. Instale as dependências do Node.js:
   npm install
3. Inicie o servidor de desenvolvimento:
   npm run dev
4. Aceda ao endereço gerado no terminal (por norma `http://localhost:5173`).
*(Lembre-se que para as funcionalidades de telemetria funcionarem plenamente, a API Python deve estar a correr na porta 8000).*