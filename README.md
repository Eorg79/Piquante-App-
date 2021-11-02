
P6_Erika_Orengo: ce repository à cloner contient le front-end et le back-end de l'application.

## BACK END ## 
créer dans le dossier back-end un fichier .env, contenant les variables d'environnement suivantes à définir (cf .env.example):

SECRET_DB='mongodb+srv://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' URL BD mongodbAtlas
MAIL_KEY= "xxxxxxxxxxxxxxxx" cryptoJs user email token key
JWT_USER_KEY="xxxxxxxxxxxxxxxxxxx" userId jsonwebtoken key

ouvrir le terminal à la racine du dossier back-end

installer les dépendances avec la commande: `npm install`.

lancer le serveur avec la commande: `npm start`

Le serveur s'execute sur http://localhost:3000/

## FRONT END ## 

ouvrir un nouveau terminal à la racine du dossier front-end   

installer les dépendances avec les commandes: `npm install` et `run npm install --save-dev run-script-os`.

Attention, pour node-sass veiller à utiliser la version compatible avec votre version de NodeJS.

lancer le serveur avec la commande: `npm start`, cela devrait ouvrir une fenêtre dans votre navigateur par défaut et faire tourner le serveur sur http://localhost:8080.

