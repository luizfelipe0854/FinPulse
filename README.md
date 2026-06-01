# FinPulse

Aplicação web de gestão de finanças pessoais com autenticação, controle de lançamentos e centros de custo.

## Tech Stack

- **React 19** + **TypeScript** — componentes com hooks e tipagem estrita
- **Vite** + **SWC** — build rápido com alias de path (`@/`)
- **Tailwind CSS 4** — estilização utilitária com variáveis CSS customizadas
- **Firebase** — autenticação (email/senha) e banco de dados Firestore em tempo real
- **Recharts** — gráficos interativos de receitas e despesas
- **ExcelJS** — exportação de lançamentos para `.xlsx`
- **React Router DOM 7** — roteamento client-side com rotas protegidas
- **React Toastify** — notificações de feedback

## Funcionalidades

### Autenticação
- Cadastro e login com email/senha via Firebase Auth
- Sessão persistente com redirecionamento automático
- Rotas protegidas — dashboard inacessível sem login

### Dashboard
- Cards de resumo: saldo total, total de entradas e total de saídas
- Gráfico de evolução das transações (Recharts)
- Últimos 5 lançamentos com acesso rápido

### Lançamentos
- Criação de entradas e saídas com valor, descrição, data e centro de custo
- Listagem completa ordenada por data (mais recente primeiro)
- Filtros por tipo (entrada/saída), mês/ano e centro de custo
- Exclusão de lançamentos
- Exportação da listagem filtrada para Excel

### Centros de Custo
- Criação de categorias personalizadas com ícone e cor
- Cards individuais com totais de entradas, saídas e quantidade de transações
- Exclusão de centros de custo

### IA (Em desenvolvimento)
- Tela reservada para análise financeira personalizada e recomendações baseadas em metas


## Configuração e Execução

### Pré-requisitos
- Node.js 18+
- Projeto Firebase criado com **Authentication** (email/senha) e **Firestore** habilitados

### Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Pré-visualizar build de produção
npm run preview

# Executar lint
npm run lint
```

O servidor de desenvolvimento roda em `http://localhost:5173` por padrão.
