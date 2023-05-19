# Start with base image 
FROM python:3.8-slim-buster

# Set PYTHONPATH
ENV PYTHONPATH=/app

# Set working directory 
WORKDIR /app

# Copy the requirements file into the container and install the dependencies
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install -y nodejs

# Copy the frontend files into the container and install the dependencies
COPY frontend /app/frontend
WORKDIR /app/frontend
RUN npm install

# Copy the frontend build file into the django static folder
COPY frontend/build /app/backend/static

# Copy the backend files into the container
WORKDIR /app
COPY backend /app/backend

# Set the environment variables for Django
ENV DJANGO_ENVIRONMENT=production
ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV DJANGO_SECRET_KEY='django-insecure-ci+4&imt)ti2lbxorr50v&kxucfyq6n3cf2f-q@lggq3+%d0&u'
ENV DJANGO_DEBUG=False

# Install gunicorn
RUN pip install gunicorn

# Install nginx
RUN apt-get install -y nginx

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port that the Django server will be running on
EXPOSE 8000
EXPOSE 80

# Start the Django server
CMD python backend/manage.py makemigrations && python backend/manage.py migrate && gunicorn --chdir /app/backend --bind 0.0.0.0:8000 backend.wsgi:application && python backend/manage.py collectstatic --noinput && nginx -g --bind 0.0.0.0:80 "daemon off;"