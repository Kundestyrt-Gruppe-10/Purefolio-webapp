# Get the frontend up and running

1. Clone the repo: 

    ```bash
    git clone https://github.com/Kundestyrt-Gruppe-10/Purefolio-webapp.git
    ```

2. Go into the repo

    ```bash
    cd Purefolio-webapp/
    ```

3. Install dependencies

    ```bash
    npm i
    ```

4. Start the frontend

    ```bash
    npm start
    ```

You are up and running!

- Errors
    - 'webpack-dev-server' is not recognized

        If you get the error message: 

        ```bash
        'webpack-dev-server' is not recognized as an internal or external command,
        operable program or batch file.
        ```

        1. Install 'webpack-dev-server' explicitly:

        ```bash
        npm install webpack-dev-server --save-dev
        ```

        2. Start frontend

        ```bash
        npm start
        ```