# 1. ビルド用の SDK イメージ
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app

# プロジェクトファイルだけ先にコピーして restore
COPY *.csproj ./
RUN dotnet restore

# 残りのソースコードをコピーしてビルド
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# 2. 実行用の Runtime イメージ（軽量）
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# ビルド成果物をコピー
COPY --from=build /app/publish ./

# ポートを開放（Web アプリ用）
EXPOSE 5000
# アプリ起動
ENTRYPOINT ["dotnet", "YourApp.dll"]