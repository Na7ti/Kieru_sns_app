FROM denoland/deno:latest

WORKDIR /app

# Copy configuration files
COPY deno.json ./
COPY tailwind.config.js ./
COPY vite.config.ts ./
COPY postcss.config.js ./
COPY index.html ./

# Copy source code
COPY src ./src

# Pre-fetch dependencies
RUN deno cache --node-modules-dir npm:vite npm:tailwindcss npm:postcss npm:autoprefixer npm:react npm:react-dom

EXPOSE 3000

CMD ["task", "dev"]
