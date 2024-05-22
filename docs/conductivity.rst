.. _installation-label:

conductivity
============

This is a template with rst format.

Sensing principles
------------------

blabla with links, for instance: xarray_ and pandas_.

May need to embed images from pdf if not pdf directly (seems difficult on first pass, maybe via jupyter notebook see `post <https://stackoverflow.com/questions/19470099/view-pdf-image-in-an-ipython-notebook>`_)
One way to embed pdf may be just with a link on a `local file <_static/test.pdf>`_

Sensor database
---------------

blabla ... May need to leverage tables_, for instance:

+------------------------+------------+----------+----------+
| Header row, column 1   | Header 2   | Header 3 | Header 4 |
| (header rows optional) |            |          |          |
+========================+============+==========+==========+
| body row 1, column 1   | column 2   | column 3 | column 4 |
+------------------------+------------+----------+----------+
| body row 2, xarray_    | Cells may span columns.          |
+------------------------+------------+---------------------+
| body row 3             | Cells may  | - Table cells       |
+------------------------+ span rows. | - contain           |
| body row 4             |            | - body elements.    |
+------------------------+------------+----------+----------+
| body row 5             | Cells may also be     |          |
|                        | empty: ``-->``        |          |
+------------------------+-----------------------+----------+

But we may also want to produce from excel document with `this library <https://github.com/sphinx-contrib/exceltable>`_ for instance.

.. _xarray: http://xarray.pydata.org
.. _pandas: https://pandas.pydata.org
.. _tables: https://sphinx-book-theme.readthedocs.io/en/stable/reference/kitchen-sink/tables.html
