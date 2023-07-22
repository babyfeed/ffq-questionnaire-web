# Baby Feed Dev Guide
This document is meant to act as a quick guide for future development teams. 
Instructions will be provided for setting up the development environment as well as pushing to production.

## Setting Up the Dev Environment
Due to compilation issues on Windows and MacOS, the development for this project is done in Ubuntu. 
As such, for those with Windows and Mac devices it is recommended to use a VM to set up and work on the project over the course of the semester.

A couple of free options that have been used successfully by previous development teams include VMware and VirtualBox:

- [VMware installation guide](https://www.makeuseof.com/install-ubuntu-on-vmware-workstation/)
- [VirtualBox installation guide](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview)

> **Note**  
> When setting up the VM, be sure to enable settings that allow copy / paste between environments. This will save a lot of time during installation.

Once the VM is set up and ready, follow the instructions provided [here](https://github.com/FIUPanther-JMolto98/BabyFeed-v10.0).

> **Warning**  
> It is common to run into issues during installation with MongoDB. Here are a couple of videos that might be helpful:
> - [Alternative installation guide for Mongo](https://www.youtube.com/watch?v=JTvGImRESzg)
> - [Dealing with the "sudo" issue](https://www.youtube.com/watch?v=jZGHtuxpaP4)

As the installation guide suggests, it is highly recommended to install the GitHub tool in VS Code to make committing code easier.
There is a quick guide for using it [here](https://www.youtube.com/watch?v=i_23KUAEtUM).

### Familiarity with GitHub
Development teams that are familiar with Git and GitHub will likely find it much simpler to branch off the main repositories and work from there.
Those with less familiarity, however, may want to consider working off of this repository (or cloning it) in order to gain experience and avoid accidentally pushing to main.

## Pushing to Production
Pushing to production once development work is finished is fairly straightforward.

1. Commit all changes to the main branches.
2. Ensure that the changes are properly deploying through the Azure pipelines.
    - Log into Azure DevOps with the PO account.
    - Click on **Pipelines**, then **Releases**.
    - Check that the relevant pipelines are deploying.
      - Getting the pipelines to deploy properly may require some troubleshooting. Plan your deployment schedule accordingly.

> **Note**  
> There is another method of deployment found [here](ffq-questionnaire-web/README.md).
> The Summer 2023 dev team ran into issues using this method and found that working with the pipelines was easier.
> Feel free to use whichever.

## A Final Consideration
Regardless of how you choose to work on this project, please consider preserving and updating this guide for future development teams.
