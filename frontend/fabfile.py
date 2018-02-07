import os
from fabric import api

SOURCE_VENV = 'source venv/bin/activate'


def venv():
    if os.path.isdir('venv'):
        return
    api.local('virtualenv venv')


def deps():
    clean()
    venv()
    with api.prefix(SOURCE_VENV):
        api.local('pip install -r requirements.txt')


def clean():
    api.local('rm -rf venv')
    api.local('rm -rf node_modules')

