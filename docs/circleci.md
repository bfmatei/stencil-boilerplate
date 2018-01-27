# CircleCI

## Setup

1. Create the project in you CircleCI instance
2. SSH in your deployment server
3. Create a SSH key
   ```bash
   ssh-keygen -t rsa -C "circleci"
   ```
4. Add the SSH key to authorized_keys (the following commands assumes you named your key id_rsa_circleci)
   ```bash
   cat ~/.ssh/id_rsa_circleci.pub >> ~/.ssh/authorized_keys
   ```
5. Get the private key
   ```bash
   cat ~/.ssh/id_rsa_circleci
   ```
6. Copy the private key in your CircleCI instance (Project Settings -> SSH Permissions)
7. Create the following environmental variables in your CircleCI instance (Project Settings -> Environmental Variables)
   - DEPLOY_HOSTNAME -> deployment server path like this: example.com
   - DEPLOY_USERNAME -> username used to deploy your files
   - DEPLOY_PATH -> absolute path where you want your files deployed
