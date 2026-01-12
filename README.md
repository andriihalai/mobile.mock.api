# Mobile Mock API

Mock API for VivaSense mobile devices with PostgreSQL database.

## Features

- Device management (CRUD operations)
- Test device configuration
- Signal type management (WiFi/Cell)
- Health check endpoint
- Production-ready with security headers, CORS, and request logging
- Docker support

## Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- PostgreSQL >= 14

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

4. Configure `.env` with your database credentials

5. Run migrations:
   ```bash
   pnpm migrate:up
   ```

## Development

Start the development server:

```bash
pnpm dev
```

Server will run on `http://localhost:3000`

## Production Build

Build the application:

```bash
pnpm build
```

Start production server:

```bash
NODE_ENV=production pnpm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

Start the entire stack (app + database):

```bash
docker-compose up -d
```

View logs:

```bash
pnpm docker:logs
```

Stop services:

```bash
docker-compose down
```

### Using Dockerfile

Build image:

```bash
docker build -t mobile-mock-api .
```

Run container:

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://user:password@host:5432/dbname \
  -e NODE_ENV=production \
  mobile-mock-api
```

## Environment Variables

| Variable       | Description                                  | Default       | Required |
| -------------- | -------------------------------------------- | ------------- | -------- |
| `NODE_ENV`     | Environment mode                             | `development` | No       |
| `APP_PORT`     | Server port                                  | `3000`        | No       |
| `DB_HOST`      | Database host                                | `localhost`   | Yes      |
| `DB_PORT`      | Database port                                | `5432`        | No       |
| `DB_USER`      | Database user                                | -             | Yes      |
| `DB_PASSWORD`  | Database password                            | -             | Yes      |
| `DB_NAME`      | Database name                                | -             | Yes      |
| `DATABASE_URL` | Full database connection string (production) | -             | No       |
| `CORS_ORIGIN`  | Allowed CORS origins                         | `*`           | No       |

## API Endpoints

### Health Check

- `GET /health` - Service health status with database connectivity check

### Devices

- `GET /devices` - Get all devices
- `POST /devices` - Create a new device
- `PATCH /devices/set-test-device/:id` - Set a device as test device
- `PATCH /devices/update-signal-type/:id` - Update device signal type
- `GET /getTestDevice` - Get the current test device
- `PATCH /setTestDeviceSignalType` - Update test device signal type

## Database Migrations

Create new migration:

```bash
pnpm migrate:make migration_name
```

Run pending migrations:

```bash
pnpm migrate:up
```

Rollback last migration:

```bash
pnpm migrate:down
```

Check migration status:

```bash
pnpm migrate:status
```

## DigitalOcean App Platform Deployment

### Prerequisites

- DigitalOcean account
- GitHub/GitLab repository with your code

### Step-by-Step Deployment

1. **Create a New App**

   - Log in to [DigitalOcean](https://cloud.digitalocean.com/)
   - Navigate to Apps → Create App
   - Connect your GitHub/GitLab repository
   - Select the repository and branch (e.g., `main`)

2. **Configure the App**

   - **Source Directory**: `/` (root)
   - **Build Command**: `pnpm install && pnpm build`
   - **Run Command**: `pnpm migrate:up && node dist/index.js`
   - **HTTP Port**: `3000`
   - **Environment**: Node.js (version 20+)

3. **Add Database Component**

   - Click "Add Resource" → Database
   - Select PostgreSQL (version 14 or higher)
   - Choose your preferred plan
   - DigitalOcean will automatically create `DATABASE_URL` environment variable

4. **Configure Environment Variables**

   Go to App Settings → Environment Variables and add:

   ```
   NODE_ENV=production
   APP_PORT=3000
   CORS_ORIGIN=https://yourdomain.com
   ```

   The following are auto-configured when using DO managed database:

   - `DATABASE_URL` (automatically set)
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (optional, parsed from DATABASE_URL)

5. **Configure Health Check**

   - Path: `/health`
   - Port: `3000`
   - Success threshold: 3

6. **Deploy**
   - Click "Next" → Review settings → "Create Resources"
   - Wait for deployment (usually 5-10 minutes)
   - App Platform will automatically build and deploy your app

### Post-Deployment

1. **Run Migrations** (if not in Run Command)

   ```bash
   # Via App Console
   pnpm migrate:up
   ```

2. **Access Your App**

   - Your app will be available at `https://your-app-name.ondigitalocean.app`
   - Check health: `https://your-app-name.ondigitalocean.app/health`

3. **Set Up Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed
   - Update `CORS_ORIGIN` environment variable

### Auto-Deploy on Git Push

App Platform automatically redeploys when you push to your connected branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Monitoring

- **Logs**: Apps → Your App → Runtime Logs
- **Metrics**: Apps → Your App → Insights
- **Alerts**: Set up alerts for high error rates or downtime

### Scaling

- Go to Apps → Your App → Settings → Resources
- Adjust instance size or number of instances
- Database can be scaled separately under Databases

### Troubleshooting

**Build fails:**

- Check Node version (should be 20+)
- Ensure `pnpm` is used (add to package.json engines)
- Review build logs for specific errors

**Database connection issues:**

- Verify `DATABASE_URL` is set correctly
- Check database is in same region as app
- Ensure database is running and accessible

**Migration failures:**

- Run migrations manually via App Console
- Check migration files are in `dist/migrations` after build
- Verify database credentials

### Cost Optimization

- Use Basic instance for development/staging
- Enable auto-scaling for production
- Use managed PostgreSQL for automatic backups
- Monitor resource usage in Insights

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure `DATABASE_URL` or individual DB variables
- [ ] Set `CORS_ORIGIN` to your allowed domains
- [ ] Run database migrations
- [ ] Build application: `pnpm build`
- [ ] Use process manager (PM2, systemd) or container orchestration
- [ ] Set up SSL/TLS (reverse proxy with nginx/caddy)
- [ ] Configure monitoring and logging
- [ ] Set up database backups
- [ ] Review security headers in helmet configuration

## Security Features

- **Helmet.js** - Sets secure HTTP headers
- **CORS** - Configurable cross-origin resource sharing
- **Input validation** - Request body validation
- **SQL injection protection** - Using Knex query builder
- **Graceful shutdown** - Proper database connection cleanup

## License

ISC
