.. _contributor_guide:

Contributor Guide
-----------------

**pynsitu** is meant to be a community driven package and we welcome feedback and
contributions.

Did you notice a bug? Are you missing a feature? A good first starting place is to
open an issue in the `github issues page <https://github.com/apatlpo/pynsitu/issues>`_.


In order to contribute to pynsitu, please fork the repository and submit a pull request.
A good step by step tutorial for this can be found in the
`xarray contributor guide <https://xarray.pydata.org/en/stable/contributing.html#working-with-the-code>`_.


Environments
^^^^^^^^^^^^
The easiest way to start developing xrft pull requests,
is to install one of the conda environments provided in the `ci folder <https://github.com/xgcm/xrft/tree/master/ci>`_::

    conda env create python=3.9 -f ci/environment-dev.yml

Activate the environment with::

    conda activate pynsitu_dev

Code Formatting
^^^^^^^^^^^^^^^

We use `black <https://github.com/python/black>`_ as code formatter and pull request will
fail in the CI if not properly formatted.

All conda environments contain black and you can reformat code using::

    black pynsitu

`pre-commit <https://pre-commit.com/>`_ provides an automated way to reformat your code
prior to each commit. Simply install pre-commit::

    pip install pre-commit

and install it in the pynsitu root directory with::

    pre-commit install

and your code will be properly formatted before each commit.

Running the test suite
^^^^^^^^^^^^^^^^^^^^^^

The tests can then be run directly inside your Git clone (without having to install pynsitu) by typing::

    pytest pynsitu

How to release a new version of pynsitu (for maintainers only)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The process of releasing at this point is very easy.

We need only two things: A PR to update the documentation and and making a release on github.

1. Make sure that all the new features/bugfixes etc are appropriately documented in `doc/whats-new.rst`, add the date to the current release and make an empty (unreleased) entry for the next minor release as a PR.
2. Navigate to the 'tags' symbol on the repos main page, click on 'Releases' and on 'Draft new release' on the right. Add the version number and a short description and save the release.

From here the github actions take over and package things for `Pypi <https://pypi.org/project/xrft/>`_.
The conda-forge package will be triggered by the Pypi release and you will have to approve a PR in `xrft-feedstock <https://github.com/conda-forge/xrft-feedstock>`_. This takes a while, usually a few hours to a day.

Thats it!
