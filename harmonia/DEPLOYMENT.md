# 🚀 Harmonia Deployment Guide

## Docker Hub Deployment

### Prerequisites
- Docker installed and running
- Docker Hub account (nisipeanu)
- Access to this project directory

### Step 1: Build and Push to Docker Hub

**For Windows (PowerShell):**
```powershell
cd harmonia
.\docker-build-push.ps1
```

**For Linux/Mac (Bash):**
```bash
cd harmonia
chmod +x docker-build-push.sh
./docker-build-push.sh
```

**Or manually run these commands:**
```bash
# Login to Docker Hub
docker login

# Build the image
docker build -t nisipeanu/harmonia:1.0.0 .

# Tag as latest
docker tag nisipeanu/harmonia:1.0.0 nisipeanu/harmonia:latest

# Push both tags
docker push nisipeanu/harmonia:1.0.0
docker push nisipeanu/harmonia:latest
```

## Portainer Deployment

### Method 1: Using Portainer UI

1. **Login to Portainer**
2. **Navigate to Stacks** → Add Stack
3. **Name your stack**: `harmonia-app`
4. **Upload or paste** the content of `docker-compose.hub.yml`
5. **Deploy the stack**

### Method 2: Copy-Paste Compose Content

Copy this compose configuration into Portainer:

```yaml
version: '3.8'

services:
  harmonia-app:
    image: nisipeanu/harmonia:1.0.0
    container_name: harmonia-nextjs-hub
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

## Post-Deployment

### Accessing the Application
- **Local access**: http://localhost:3000
- **Health check**: http://localhost:3000/api/health

### Nginx Configuration
Configure your nginx reverse proxy to point to `localhost:3000`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Image Information

- **Docker Hub Repository**: https://hub.docker.com/r/nisipeanu/harmonia
- **Current Version**: 1.0.0
- **Tags Available**: 
  - `nisipeanu/harmonia:1.0.0`
  - `nisipeanu/harmonia:latest`

## Updating the Application

To update to a new version:

1. **Build and push new version** (update version in scripts)
2. **In Portainer**: Go to Stacks → Your Stack → Editor
3. **Update image tag** to new version
4. **Click "Update the stack"**

## Monitoring

- **Container Health**: Check in Portainer dashboard
- **Application Health**: GET `/api/health`
- **Logs**: Available in Portainer container logs section 