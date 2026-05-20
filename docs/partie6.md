# Partie 6 - Questions théoriques

## 1. Swarm

`docker compose up` en gros c'est en local sur ma machine, un seul docker, tout au même endroit. Outil de dev.

`docker stack deploy` c'est dès que je suis sur un cluster Swarm avec plusieurs nœuds. C'est Swarm qui dispatch les conteneurs, redémarre ce qui crash, fait du LB entre les réplicas.

Pour le `build:` en Swarm ça marche pas, parce qu'avec plusieurs nœuds, chaque nœud devrait rebuild l'image dans son coin et ça pourrait sortir différent à chaque fois. Dcp je build une fois, je push sur un registry, et tous les nœuds pull la même image.

## 2. Secrets

Une var d'env c'est lisible direct dans le conteneur (`printenv`, `docker inspect`...). Dcp pour un password ou un token c'est en clair, ça craint.

Un Docker Secret c'est différent, Swarm le stocke chiffré et il arrive dans le conteneur comme un fichier monté en mémoire, sur `/run/secrets/<nom>`. Il apparaît pas dans `docker inspect`, plus safe.

En Node.js pour le lire c'est juste de la lecture de fichier classique :

```js
const fs = require('fs');
const password = fs.readFileSync('/run/secrets/db_password', 'utf8').trim();
```

## 3. Backup

En prod faut backup tout ce que je peux pas reconstruire depuis zéro. En gros les volumes de données, genre les bases (Postgres, MySQL...), les uploads des users, l'historique Grafana/Prom si je veux garder les métriques, et les certifs TLS faits main.

Le reste je peux m'en passer, en effet les images je les rebuild, le code est sur Git, les conteneurs sont recréés par compose. Tout ce qui est déjà versionné quelque part, pas besoin.

Si je dois retenir une règle simple c'est que, si je perds le serveur, est-ce que je retrouve la donnée ailleurs (Git, registry...) ? Oui = pas de backup. Non = backup obligatoire.
