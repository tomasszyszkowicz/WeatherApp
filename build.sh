args=()
while IFS= read -r line; do
  args+=(--build-arg "$line")
done < ./.env

docker build "${args[@]}" -t weather-app .
docker run -p 8000:8000 weather-app