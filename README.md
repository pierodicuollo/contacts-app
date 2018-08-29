# contacts-app

This repository is a small contacts management application built on front end with vue js and backend on node.js.

Front end:

The front end application is located in webapp folder. Its been built using `router`, `vuex` in `vue.js` and for material design `vuetify` is being used. You have a main page with list of contacts shown sorted with first name and you have a search bar that you can use to filter the contacts matching both first and last name. You can select a contact and it will show in a separate view from there you can click on the email of the user and an email form will open. You can send email to the contact from there.

To send email `sendgrid` has been used.

Rest, you can edit and delete the same contact as well.

To add a new contact you can simply tap the plus icon at the top right of the toolbar and a dialog will open infront of you to add new contact.

The server must be running first to perform fetching of contacts and all other operations like add, edit and delete.
    To run the webapp:
        1. Colne the repository. 
        2. Run cd webapp
        3. Run npm run serve 

Back end:

The back end application is placed under the server folder. Its been built using `node.js` and `mongodb`. A free instance of mongodb was used from `mlab.com` for demo purposes. 

    To run the server:
        1. Colne the repository. 
        2. Run cd server
        3. Run npm run dev