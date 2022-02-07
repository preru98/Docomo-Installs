# Docomo

Docomo is a node script for installing python packages/dependencies with a single command. Accepts file name (.json) as a command-line argument, and installs all the dependencies with their versions mentioned in the file. Additionally, installations are timed, if any dependency is taking time beyond max_limit its child process is aborted.

## Environment Setup

Creating the virtual environment isolated from system site directories. This is an optional step but highly suggested to follow before running the script.

```bash

# Create a virtual environment
python3 -m venv env

# Activate environment
source env/bin/activate

```

## Usage

```bash

# All dependencies installed successfully
> node main.js example1.json

Installing beautifulsoup4==4.4.1.......
Installing boto==2.48.0.......
Installing bz2file==0.98.......
Installing requests==2.18.3.......
Installation of boto succeded
Installation of beautifulsoup4 succeded
Installation of bz2file succeded
Installation of requests succeded

Successfully installed all dependencies

_______________________________________________________________________________________________

# Installation fails for one of the dependencies.
> node main.js example2.json

Installing request==2.18.3.......
Installing beautifulsoup4==4.4.1.......
Installing boto==2.48.0.......
Installing bz2file==0.98.......
Installing numpy==1.13.1.......
Installation of bz2file succeded
Installation of boto succeded
Installation of beautifulsoup4 succeded
Installation of request failed
Time exceeded for numpy

Failed to install: request, numpy

_______________________________________________________________________________________________

# Timeout for one of the dependencies.
> node main.js example3.json

Installing beautifulsoup4==4.4.1.......
Installing boto==2.48.0.......
Installing bz2file==0.98.......
Installing numpy==1.13.1.......
Installing requests==2.18.3.......
Installation of beautifulsoup4 succeded
Installation of bz2file succeded
Installation of boto succeded
Installation of requests succeded
Time exceeded for numpy

Failed to install: numpy

```

## Examples

```json

# example1.json

{
  "Dependencies": {
    "beautifulsoup4": "4.4.1",
    "boto": "2.48.0",
    "bz2file": "0.98",
    "requests": "2.18.3"
  }
}

_______________________________________________________________________________________________

# example2.json

{
  "Dependencies": {
    "request": "2.18.3",
    "beautifulsoup4": "4.4.1",
    "boto": "2.48.0",
    "bz2file": "0.98",
    "numpy": "1.13.1"
  }
}

_______________________________________________________________________________________________

# example3.json

{
  "Dependencies": {
    "beautifulsoup4": "4.4.1",
    "boto": "2.48.0",
    "bz2file": "0.98",
    "numpy": "1.13.1",
    "requests": "2.18.3"
  }
}

```

## Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Author
Prerna Sharma :)