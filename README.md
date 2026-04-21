This is a [Next.js](https://nextjs.org) project for CleanLiquidWaste.

## Local Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Useful Scripts

- `npm run generate:locations` regenerates the Canada locations dataset.
- `npm run export:live-links` exports the current live launch URLs to `data/live-links.csv`.
- `npm run deploy:droplet` builds the Docker image locally and streams it straight to a droplet over SSH.

## Local Docker

For local Docker use, the intended flow is:

```bash
docker compose build
docker compose up -d
```

Then open:

```bash
http://localhost:3001
```

Useful checks:

```bash
docker compose ps
docker compose logs --tail=50
curl -I http://127.0.0.1:3001
```

## Direct Droplet Deploy

This project supports direct local build and SSH deploy without Docker Hub or another registry.

Required environment variables before running `npm run deploy:droplet`:

```bash
export DROPLET_HOST=your.droplet.ip
export DROPLET_USER=root
export NEXT_PUBLIC_SITE_URL=https://cleanliquidwaste.com
```

Optional environment variables:

```bash
export DROPLET_PORT=22
export DROPLET_SSH_KEY=$HOME/.ssh/your_key
export APP_NAME=cleanliquidwaste
export IMAGE_NAME=cleanliquidwaste
export IMAGE_TAG=deploy
export PLATFORM=linux/amd64
export REMOTE_PORT=3001
export CONTAINER_PORT=3000
```

Deploy command:

```bash
npm run deploy:droplet
```

What it does:

- builds the Docker image locally
- streams it to the droplet with `docker save | ssh docker load`
- stops and removes the old container if present
- starts the new container with the production environment values

## Notes

- `PLATFORM=linux/amd64` is important if you build on Apple Silicon and deploy to a typical DigitalOcean droplet.
- The droplet must already have Docker installed and your SSH user must be able to run Docker commands.
- `NEXT_PUBLIC_SITE_URL` should be your real production URL, not localhost.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
