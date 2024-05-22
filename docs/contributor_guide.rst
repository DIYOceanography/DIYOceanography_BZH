.. _contributor_guide:

Contributor Guide
-----------------
**DIY Oceanography BZH** is meant to be a community platform and we welcome feedback and
contributions.

Did you notice missing or erroneous information? A good first starting place is to either
open an issue in the `github issues page <https://github.com/DIYOceanography/DIYOceanography_BZH/issues>`_ either contact the group mailing list *xxxx.*.

Alternatively, you may post to the group mailing list *(add link)*

In order to contribute to DIY Oceanography BZH, please fork the repository and submit a pull request.
A good step by step tutorial for this can be found in the
`xarray contributor guide <https://xarray.pydata.org/en/stable/contributing.html#working-with-the-code>`_.


Environments
^^^^^^^^^^^^
A proper environment for the compilation of the documentation is useful.
An adequate conda environment is provided in `docs folder <https://github.com/DIYOceanography/DIYOceanography_BZH/tree/main/docs>`_::

    conda env create -f docs/environment.yml

Activate the environment with::

    conda activate diyocean

Comppiling the documentation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To compile The tests can then be run directly inside your Git clone (without having to install pynsitu) by typing::

    cd docs
    make html
