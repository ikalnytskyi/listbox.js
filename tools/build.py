#!/usr/bin/env python
# coding: utf-8

'''Compress Listbox.js for use in production.'''

__author__ = "Igor Kalnitsky"
__email__ = "igor@kalnitsky.org"

__license__ = "GPLv3"
__version__ = "0.1"


import os
import shutil


def generate_output_files(input_files, postfix):
    filename = '{}' + postfix + '{}'
    return [filename.format(*os.path.splitext(f)) for f in input_files]


def compress(input_files, output_files, pathes):
    assert len(input_files) == len(output_files)

    yuicompressor = os.path.join(pathes['tools'], 'yuicompressor.jar')
    command = 'java -jar ' + yuicompressor + ' {} -o {}'

    for i in range(len(input_files)):
        in_file = os.path.join(pathes['input'], input_files[i])
        out_file = os.path.join(pathes['output'], output_files[i])

        os.mkdir(os.path.dirname(out_file))
        os.system(command.format(in_file, out_file))


def print_stats(input_files, output_files, pathes):
    assert len(input_files) == len(output_files)

    for i in range(len(input_files)):
        in_file = os.path.join(pathes['input'], input_files[i])
        out_file = os.path.join(pathes['output'], output_files[i])

        in_size = os.path.getsize(in_file) / 1024.0
        out_size = os.path.getsize(out_file) / 1024.0

        pattern = '{:>20}: {:.3}kb -> {:.3}kb'
        print(pattern.format(input_files[i], in_size, out_size))


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pathes = {'tools': os.path.join(root, 'tools'),
              'input': os.path.join(root, 'src'),
              'output': os.path.join(root, 'build')}

    # recreate build dir
    if os.path.exists(pathes['output']):
        shutil.rmtree(pathes['output'])
    os.mkdir(pathes['output'])

    # files to compress
    input_files = (os.path.join('js', 'listbox.js'),
                   os.path.join('styles', 'listbox.css'))
    output_files = generate_output_files(input_files, '.min')

    compress(input_files, output_files, pathes)
    print_stats(input_files, output_files, pathes)


if __name__ == '__main__':
    main()
