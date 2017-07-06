param(
    [switch]$down, 
    [switch]$install
)

if ($down -like $true) {
    docker stop addiec
    docker rm addiec
}

# global variables
$dockerDirectory = "./docker"
$buildOutputDirectory = "./dist"
$project = "addiec"
$nodeModulesDirectory = "./node_modules"

if ($install -like $true) {
    Write-Host "Installing packages"
    npm install
}
Write-Host "Build project"
ng build
# test
# lint

Write-Host "Cleaning output for docker..."
if(Test-Path "$dockerDirectory/$project")
{
    Remove-Item "$dockerDirectory/$project" -recurse -Force
}
Write-Host "Cleaned output $dockerDirectory/$project"

Write-Host "Copying build from $buildOutputDirectory to $dockerDirectory/$project"
Copy-Item $buildOutputDirectory -Destination $dockerDirectory/$project -Recurse -Force


Push-Location docker
if(docker image ls | Select-String -Pattern "addiec")
{
    Write-Host "Removing old image"
    docker image rm -f addiec:develop
}
Write-Host "Createing docker image"
docker build -t addiec:develop .

Pop-Location

Write-Host "Run docker image"
docker run -d --name addiec addiec:develop