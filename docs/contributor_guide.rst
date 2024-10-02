.. _contributor_guide:

Feedback & contributor Guides
=============================

Providing feedbacks
-------------------

**DIY Oceanography BZH** is meant to be a community platform and we welcome feedback and
contributions.

Did you notice missing or erroneous information? A good first starting place is to
open an issue in the `github issues page <https://github.com/DIYOceanography/DIYOceanography_BZH/issues>`_.
Alternatively, you may post to the `group mailing list`_.

Contributing
------------

In order to contribute to DIY Oceanography BZH, please fork the repository and submit a pull request.
A good step by step tutorial for this can be found in the
`xarray contributor guide <https://docs.xarray.dev/en/stable/contributing.html#development-workflow>`_.

Python Environments
^^^^^^^^^^^^^^^^^^^
A proper python environment for the compilation of the documentation is necessary.
An adequate conda environment is provided in `docs folder <https://github.com/DIYOceanography/DIYOceanography_BZH/tree/main/docs>`_::

    git clone https://github.com/DIYOceanography/DIYOceanography_BZH.git # or clone forked repository
    cd DIYOceanography_BZH
    conda env create -f docs/environment.yml

Activate the environment with::

    conda activate diyocean

Compiling the documentation
^^^^^^^^^^^^^^^^^^^^^^^^^^^

To compile The tests can then be run directly inside your Git clone (without having to install pynsitu) by typing::

    cd docs
    make html

This will produce the `docs/_build/html` folder containing an `index.html` file which you may open in you browser.

.. _group mailing list: diyoceano.bzh@listes.ifremer.fr