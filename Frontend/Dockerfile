FROM node:20-alpine

WORKDIR /app

# パッケージファイルをコピー
COPY package.json ./

# 依存関係をインストール
RUN npm install

# 設定ファイルをコピー
COPY tailwind.config.js ./
COPY vite.config.js ./
COPY postcss.config.js ./
COPY index.html ./
COPY tsconfig.json ./

# ソースコードをコピー
COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "dev"]
