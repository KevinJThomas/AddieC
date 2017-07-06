Write-Host "build, test and line project"
Invoke-Expression "npm build"
Invoke-Expression "npm test"
Invoke-Expression "npm lint"


# Build docker image
Write-Host "Createing docker image"
Invoke-Expression "docker build -t addiec ."

Write-Host "Run docker image"
Invoke-Expression "docker run -d addiec"
