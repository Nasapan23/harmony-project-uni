# Docker Hub Configuration
$DOCKER_USERNAME = "nisipeanu"
$IMAGE_NAME = "harmonia"
$VERSION = "1.0.0"
$FULL_IMAGE_NAME = "${DOCKER_USERNAME}/${IMAGE_NAME}"

Write-Host "🐳 Building and pushing multi-platform Docker image to Docker Hub..." -ForegroundColor Cyan
Write-Host "Image: ${FULL_IMAGE_NAME}:${VERSION}" -ForegroundColor Yellow
Write-Host "Platforms: linux/amd64, linux/arm64, linux/arm/v7" -ForegroundColor Yellow
Write-Host ""

# Step 1: Login to Docker Hub (you'll be prompted for credentials)
Write-Host "Step 1: Logging into Docker Hub..." -ForegroundColor Green
docker login

# Step 2: Create/use buildx builder
Write-Host ""
Write-Host "Step 2: Setting up buildx builder..." -ForegroundColor Green
docker buildx create --name multiarch-builder --use --platform linux/amd64,linux/arm64,linux/arm/v7 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Builder already exists, using existing one..." -ForegroundColor Yellow
    docker buildx use multiarch-builder
}

# Step 3: Bootstrap the builder
Write-Host ""
Write-Host "Step 3: Bootstrapping builder..." -ForegroundColor Green
docker buildx inspect --bootstrap

# Step 4: Build and push multi-platform image (versioned)
Write-Host ""
Write-Host "Step 4: Building and pushing versioned multi-platform image..." -ForegroundColor Green
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t "${FULL_IMAGE_NAME}:${VERSION}" --push .

# Step 5: Build and push multi-platform image (latest)
Write-Host ""
Write-Host "Step 5: Building and pushing latest multi-platform image..." -ForegroundColor Green
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t "${FULL_IMAGE_NAME}:latest" --push .

Write-Host ""
Write-Host "✅ Successfully pushed multi-platform images to Docker Hub!" -ForegroundColor Green
Write-Host "Image available at: https://hub.docker.com/r/${DOCKER_USERNAME}/${IMAGE_NAME}" -ForegroundColor Cyan
Write-Host "Tags pushed:" -ForegroundColor Yellow
Write-Host "  - ${FULL_IMAGE_NAME}:${VERSION}" -ForegroundColor White
Write-Host "  - ${FULL_IMAGE_NAME}:latest" -ForegroundColor White
Write-Host ""
Write-Host "Supported platforms:" -ForegroundColor Yellow
Write-Host "  - linux/amd64 (Intel/AMD 64-bit)" -ForegroundColor White
Write-Host "  - linux/arm64 (ARM 64-bit, Apple M1/M2, Raspberry Pi 4)" -ForegroundColor White
Write-Host "  - linux/arm/v7 (ARM 32-bit, Raspberry Pi 3)" -ForegroundColor White 