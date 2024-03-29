# Use Python 3.10.12 as the parent image
FROM python:3.10.12-slim-buster

# Use build arguments to pass sensitive data
ARG DJANGO_SECRET_KEY
ARG WEATHERSTACK_API_KEY
ARG PORT
ARG DEBUG

# Set environment variables
ENV DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY
ENV WEATHERSTACK_API_KEY=$WEATHERSTACK_API_KEY
ENV PORT=$PORT
ENV DEBUG=$DEBUG

# Set the working directory in the container
WORKDIR /app

COPY requirements.txt /app

# Install any needed packages specified in requirements.txt
RUN while read requirement; do pip install --no-cache-dir $requirement; done < requirements.txt

# Copy the rest of your application's code
COPY . /app/

# You can run migrations and collect static files here, or you can handle them in an entrypoint script or manually
RUN python3 manage.py migrate
RUN python3 manage.py collectstatic --noinput
# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run Gunicorn to serve the Django application
CMD ["sh", "-c", "gunicorn weather_app.wsgi:application --bind 0.0.0.0:$PORT"]
