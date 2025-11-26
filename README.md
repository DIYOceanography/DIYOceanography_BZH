[![Documentation Status](https://readthedocs.org/projects/diy-oceanography-bzh/badge/?version=latest)](https://diy-oceanography-bzh.readthedocs.io/en/latest/?badge=latest)

# DIY Oceanography BZH

## How to Contribute

### Prerequisites
Before you start contributing to DIY Oceanography BZH, make sure you have:
- Git installed on your computer: https://git-scm.com/install/
- A GitHub account
- Basic knowledge of Git workflows (optional but helpful: [Visual Studio Code intro to Git](https://code.visualstudio.com/docs/sourcecontrol/intro-to-git))

### Step-by-Step Contribution Guide

#### 1. Fork the Repository
- Go to the [DIY Oceanography BZH project page](https://github.com/DIYOceanography/DIYOceanography_BZH)
- Click the **Fork** button near the top of the page
- This creates a copy of the code under your GitHub account

#### 2. Clone Your Fork Locally
Replace `yourusername` with your actual GitHub username:
```bash
git clone https://github.com/yourusername/DIYOceanography_BZH.git
cd DIYOceanography_BZH
```

#### 3. Set Up the Python Environment
A proper Python environment is necessary for compiling the documentation. We provide a conda environment configuration:

```bash
# Create the conda environment from the provided file
conda env create -f docs/environment.yml

# Activate the environment
conda activate diyocean
```

#### 4. Make Your Changes
- Create a new branch for your feature/fix:
  ```bash
  git checkout -b your-feature-name
  ```
- Make your changes/additions to the code or documentation
- Test your changes by compiling the documentation (see section below)

#### 5. Compile and Test the Documentation
To ensure your changes work correctly:

```bash
cd docs
make html
```

This will create the `docs/_build/html` folder with an `index.html` file that you can open in your browser to preview the documentation.

#### 6. Commit Your Changes
Once you're satisfied with your changes:

```bash

# Optional, good practice : See what files have changed
git status

# Optional, good practice : See the actual changes in those files
git diff

# Add your changes to the staging area
git add .

# Commit your changes with a descriptive message
git commit -m "Add a clear description of what you changed"

# Push your changes to your fork
git push origin your-feature-name
```

#### 7. Create a Pull Request
- Go to your fork on GitHub (https://github.com/yourusername/DIYOceanography_BZH)
- You should see a "Compare & pull request" button for your recently pushed branch
- Click it and fill out the pull request form:
  - Give it a clear title
  - Describe what changes you made and why
  - Reference any relevant issues
- Submit the pull request

Your pull request will be reviewed by the maintainers, and they may request changes or provide feedback before merging.

## Additional Resources

- **Documentation**: https://diy-oceanography-bzh.readthedocs.io/en/latest/
- **Mailing List**: diyoceano.bzh@listes.ifremer.fr
- **Contributing Guidelines**: This tutorial is adapted from the [xarray contributor guide](https://docs.xarray.dev/en/stable/contributing.html#development-workflow)

## Questions?
If you have any questions about contributing, feel free to:
- Open an issue on GitHub
- Contact us via the mailing list : diyoceano.bzh@listes.ifremer.fr
- Check the documentation for more detailed information


