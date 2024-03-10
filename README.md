# HA_indoor_monitor


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
git clone git@gitlab.com:profiq/all/sp/HomeAssistantAutomation/ha_indoor_monitor.git
```

Remember that you need to setup the SSH key on your machine.

Do this to navigate to the root of the project:

```bash
cd ha_indoor_monitor
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

## Run server

To run the project locally on your localhost you can do this:

```bash
python3 manage.py migrate
python3 manage.py runserver
```




