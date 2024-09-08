# Instock-api-golden-lions

### Setting Up Environment Variables

To set up environment variables for the project, follow these steps: 

1. Install dotenv:
    If you have not already installed the dotenv package, run the following command to install it:
        npm install dotenv

2. Create a `.env` file:

   You can create a `.env` file by copying the provided ".env.example" file. This ".env" file will store your environment-specific configurations such as database connection details, server port, etc.

3. Fill in the .env file
   Open the newly created .env file and replace the placeholder values (<YOUR_DB_NAME>, <YOUR_DB_USER>, <YOUR_DB_PASSWORD>) with your actual database credentials.
   Example:
   PORT=8080
   DB_HOST=127.0.0.1
   DB_LOCAL_DBNAME=my_database
   DB_LOCAL_USER=my_db_user
   DB_LOCAL_PASSWORD=my_db_password

By following these steps, you'll have a properly configured .env file that allows the project to run with your environment-specific settings

IMPORTANT: Ensure .env is Not Tracked by GIT 
    If the .env file was not added to .gitignore initially, follow these steps to ensure Git no longer tracks it
    1. pull the latest changes

    2.Make sure .env is no longer tracked
        There are two approaches to ensure Git ignores your .env file
            1. Delete the .env file and create a new one following the steps above, ensuring it is correctly ignored by Git
            2. If Git is still tracking .env, remove the entry from .gitignore, save the file, and re-add .env to .gitignore

    3.Check that .env is greyed out: After completing the steps above, ensure that the .env file is greyed out in your code editor, which indicates that Git is no longer tracking the file   