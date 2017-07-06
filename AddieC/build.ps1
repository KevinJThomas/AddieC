# ./node_modules/.bin/eslint ./src
# ng serve

docker build -t ./docker/dockerfile addiec
docker-compose -f ./docker/docker-compose.yml up