# Weather App


# Contact

Tomáš Szyszkowicz

email: tomas.szyszkowicz@profiq.com

phone-number: +420606633440

# Description

Simple weather app using weatherstack API.

# Usage

## Cloning the project

You can clone the project using this:

```bash
git clone git@github.com:tomasszyszkowicz/WeatherApp.git
```

Remember that you need to setup the SSH key on your machine.

Do this to navigate to the root of the project:

```bash
cd WeatherApp
```

## Setup the Virtual Environment

It is recommended to run this project in venv, so it runs in isolation from your other Django Projects.

You can do that like this:

```bash
python3 -m venv venv
source venv/bin/activate
```

## Install dependencies

Please ensure you have the latest version of pip installed.
```bash
python3 -m pip install --upgrade pip
```

Now you need to install all the dependencies needed for the project.
You can do it by using a single command:
```bash
pip install -r requirements.txt
```

## Setup .env file

Lastly, you need to setup the .env file. The variables are ready on heroku, however they are not ready for local development. That's why you need to setup the .env file to make the project work locally.

Create the .env file inside the root of the project.

Open it, and paste this into it:

```plaintext
DJANGO_SECRET_KEY=django_secret_value_value
WEATHERSTACK_API_KEY=weatherstack_api_key_value
PORT=8000
DEBUG=True or False
```

Replace the values with the real values of these variables, you can find them here: https://github.com/tomasszyszkowicz/WeatherApp/settings/variables/actions

Set the DEBUG to True for development. But if you want to test how the app will run in production, set the DEBUG to False.

## Run server

To run the project locally on your localhost you can do this:

```bash
python3 manage.py migrate
python3 manage.py runserver
```




