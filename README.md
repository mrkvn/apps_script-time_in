# Google Apps Script (Web App) - Svelte + Vite + TailwindCSS Template

## Instructions

-   Go to script.google.com/home/usersettings and enable Google Apps Script API.
-   Create a Google Apps Script project.

```bash
# install google clasp (Command Line Apps Script Projects)
npm i -g @google/clasp

# create a .clasp.json file
cat .clasp.json.sample > .clasp.json
```

-   Update the `scriptId` in `.clasp.json`. The script ID can be retrieved from your Apps Script project under `Project Settings`.
-   Copy the `appsscript.json` file from your Apps Script project and replace the existing one in `dist/appsscript.json`. This file is hidden by default in an Apps Script project. To show it, go to your Apps Script project `Project Settings` and check `Show "appscript.json" manifest file in the editor`. The file will now show in the `Editor`.

```bash
# login to google to allow permissions
clasp login

# install dependencies
npm i

# build the project and push to your apps script project
npm run build:push

# when asked `Manifest file has been updated. Do you want to push and overwrite? y/N`, enter y then press Enter
```

-   Go to your Apps Script Project and create a new deployment by clicking `Deploy`
-   Select `Web app` as deployment type.
-   Enter a description and modify other settings accordingly.
-   Click `Deploy`.
-   You can click the URL to open the production-deployed app.

To open the URL for development:

-   Click `Deploy` again.
-   Click `Test deployments`
-   Click the URL. You can use this URL for development. Using this link, you don't need to deploy every time you push your code.
