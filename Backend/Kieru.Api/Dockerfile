FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["Backend/Kieru.Api/Kieru.Api.csproj", "Backend/Kieru.Api/"]
COPY ["Backend/Kieru.Core/Kieru.Core.csproj", "Backend/Kieru.Core/"]
COPY ["Backend/Kieru.Infra/Kieru.Infra.csproj", "Backend/Kieru.Infra/"]

RUN dotnet restore "Backend/Kieru.Api/Kieru.Api.csproj"

COPY . .
WORKDIR "/src/Backend/Kieru.Api"
RUN dotnet build "Kieru.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Kieru.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Kieru.Api.dll"]
