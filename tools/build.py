#!/usr/bin/env python
# coding: utf-8

'''Compress Listbox.js for use in production.'''

__author__ = "Igor Kalnitsky"
__email__ = "igor@kalnitsky.org"

__license__ = "GPLv3"
__version__ = "0.1"


import os
import shutil


def make_build_dir(build_dir):
    '''Make build dir.

    If build dir already exists then remove it and create again.
    '''
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)
    os.mkdir(build_dir)


def compress(files, tools_dir, build_dir):
    for file_ in files:
        filename, extension = os.path.splitext(os.path.basename(file_))

        command = 'java -jar {} {} -o {}'.format(
            os.path.join(tools_dir, 'yuicompressor.jar'),
            file_,
            os.path.join(build_dir, '{}.min{}'.format(filename, extension))
        )
        os.system(command)


def main():
    ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    TOOLS_DIR = os.path.join(ROOT, 'tools')
    BUILD_DIR = os.path.join(ROOT, 'build')

    FILES_TO_COMPRESS = (os.path.join(ROOT, 'src', 'js', 'listbox.js'),
                         os.path.join(ROOT, 'src', 'styles', 'listbox.css'))

    # recreate build dir
    make_build_dir(BUILD_DIR)

    # compress files and move results to build dir
    compress(FILES_TO_COMPRESS, TOOLS_DIR, BUILD_DIR)


if __name__ == '__main__':
    main()
