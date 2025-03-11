# Use the official .NET 8.0 SDK image as the base
FROM mcr.microsoft.com/dotnet/sdk:8.0

# Set the working directory inside the container
WORKDIR /app

# Copy project files into the container
COPY . .

# Restore dependencies
RUN dotnet restore AngularApi.csproj

# Build the application (Specify Solution or Project)
RUN dotnet build AngularApi.csproj -c Release -o /app/build   # OR dotnet build YourProject.csproj

# Publish the application
RUN dotnet publish AngularApi.csproj -c Release -o /app/publish   # OR dotnet publish YourProject.csproj

# Set the runtime image (for running, not just building)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=0 /app/publish .

EXPOSE 80
# Command to run the app when the container starts
CMD ["dotnet", "AngularApi.dll"]


# the image name is  mvc-test-docker
# docker run -d --name TestDocker-app -p 8004:8080 mvc-test-docker     -> this was the issue :8080  not 80 
