import os
from fabric import api
from fabric.context_managers import lcd

SOURCE_VENV = 'source venv/bin/activate'


def venv():
    if os.path.isdir('venv'):
        return
    api.local('virtualenv venv')


def install():
    venv()
    with api.prefix(SOURCE_VENV):
        api.local('pip install -r requirements.txt')


def clean():
    api.local('rm -rf venv')


def server():
    venv()
    with lcd('src'):
        with api.prefix(SOURCE_VENV):
            api.local('python server.py')


# TODO
def migrate():
    with api.prefix(SOURCE_VENV):
        api.local('cp alembic.ini alembic.ini.tmp')
        api.local('echo "db_host = localhost" >> alembic.ini')
        try:
            api.local('alembic upgrade head')
        finally:
            api.local('mv alembic.ini.tmp alembic.ini')
