# Estágio 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml* ./

# Instalar todas as dependências (incluindo devDependencies para o build)
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação
RUN pnpm run build

# Estágio 2: Produção
FROM node:20-alpine

WORKDIR /app

# Copiar apenas arquivos necessários para produção
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expor porta
EXPOSE 5173

# Variáveis de ambiente
ENV PORT=5173
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Comando para iniciar o servidor
CMD ["node", "build/index.js"]

