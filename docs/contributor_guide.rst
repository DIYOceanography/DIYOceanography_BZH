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

Current need for contributions :
---------------------------------

We are currently looking for contributions in the following areas:

 - **pH**
 - **Chlorophyll**
 - **Passive acoustics**
 - **Sea level**
 - **Underwater positioning**
 - **PAR**
 - **Variables & sensors sections**: Transform slides into text for : oxygen, currents and geopositioning.
 - **Temperature section**: We are looking for contributions to the temperature section, including thermography and optical sensing. 
 - **DIY instruments**: We are looking for contributions to the DIY instruments section, including new instruments, improvements to existing instruments, and additional information on how to build and use them.
 - **Testing and validation**: We are looking for contributions to the testing and validation of DIY instruments, including test cases, validation procedures, and comparisons with commercial instruments.
 - **Zotero library**: We are looking for contributions to the Zotero library, including new references, annotations, and organization of the library.

Ultimately we aim to cover : data loggers, biofouling, physical containering and mechanical design of the hosting platform, electronics, github projects and good practices for open source projects.

Feel free to suggest any variable you wish to see in this list by `opening a new issue <https://github.com/DIYOceanography/DIYOceanography_BZH/issues/new/choose>`_ on our GitHub repository.

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