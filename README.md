# copy-paste-detector [![Version](http://img.shields.io/npm/v/copy-paste-detector.svg)](https://www.npmjs.org/package/copy-paste-detector) [![Build Status](https://travis-ci.org/hpbuniat/copy-paste-detector.svg?branch=master)](https://travis-ci.org/hpbuniat/copy-paste-detector) [![Dependencies](https://david-dm.org/hpbuniat/copy-paste-detector.png)](https://david-dm.org/hpbuniat/copy-paste-detector) [![Code Climate](https://codeclimate.com/github/hpbuniat/copy-paste-detector/badges/gpa.svg)](https://codeclimate.com/github/hpbuniat/copy-paste-detector)
> copy-paste-detector (cpd) is a copy/paste-detector for various languages

### Supported languages
- javascript
- coffeescript
- php
- css (very simple!)
- generic tokenizer

### Reports
- Text (simple)
- JSON
- PMD-CPD (for Continuous Integration, e.g. Jenkins)

## Installation
    npm install copy-paste-detector

## Usage Example
    $ ./bin/cpd -d /tmp/zendframework/library/ -i *.php
        copy-paste-detector 0.0.1 by Hans-Peter Buniat
            parsing files 2263/2263 (100%) [====================] 0.0s
        Found 97 exact clones with 8348 duplicated lines in 125 files:

            -   /tmp/zendframework/library/Zend/Barcode/Object/Ean13.php:40-58
                /tmp/zendframework/library/Zend/Barcode/Object/Upce.php:34-52

            ..

            -   /tmp/zendframework/library/Zend/File/Transfer/Adapter/AbstractAdapter.php:1013-1100
                /tmp/zendframework/library/Zend/View/Helper/Navigation/AbstractHelper.php:770-857
            0.03% duplicated lines out of 287753 total lines of code.

### Credits
This tool is inspired by Sebastian Bergmanns phpcpd, based on an idea i had back in 2011 (sebastianbergmann/phpcpd#26)
