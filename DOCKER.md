# Guia de Deploy com Docker

Este projeto está configurado para rodar com Docker Compose, incluindo backend Django, frontend SvelteKit, banco de dados PostgreSQL e Redis.

## Pré-requisitos

- Docker
- Docker Compose

## Configuração

1. **Criar arquivo `.env` na raiz do projeto** com as seguintes variáveis:

```bash
# Configurações do Banco de Dados
DBNAME=django_crm
DBUSER=postgres
DBPASSWORD=seu-password-seguro
DBHOST=db
DBPORT=5432

# Configurações do Django
SECRET_KEY=sua-chave-secreta-muito-segura-aqui
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,seu-dominio.com
ENV_TYPE=prod

# Configurações de Email
DEFAULT_FROM_EMAIL=noreply@seu-dominio.com
ADMIN_EMAIL=admin@seu-dominio.com

# Configurações do Celery
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

# Configurações do Frontend
PUBLIC_API_URL=http://localhost:8000
```

2. **Build e iniciar os containers:**

```bash
docker-compose up -d --build
```

3. **Executar migrações do banco de dados (se necessário):**

```bash
docker-compose exec backend python manage.py migrate
```

4. **Criar superusuário (se necessário):**

```bash
docker-compose exec backend python manage.py createsuperuser
```

## Acessar os serviços

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Comandos úteis

### Ver logs
```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend
```

### Parar os containers
```bash
docker-compose down
```

### Parar e remover volumes (cuidado: apaga dados)
```bash
docker-compose down -v
```

### Rebuild após mudanças
```bash
docker-compose up -d --build
```

### Executar comandos no container
```bash
# Backend
docker-compose exec backend python manage.py <comando>

# Frontend
docker-compose exec frontend sh
```

## Estrutura dos Dockerfiles

- **backend/Dockerfile**: Configuração para Django com Gunicorn
- **frontend/Dockerfile**: Build multi-stage para SvelteKit com adapter-node

## Notas importantes

- Os volumes são persistidos, então os dados do banco não serão perdidos ao reiniciar
- Para produção, certifique-se de alterar `SECRET_KEY`, `DEBUG=False` e configurar `ALLOWED_HOSTS` corretamente
- O frontend se conecta ao backend através da variável `PUBLIC_API_URL`

