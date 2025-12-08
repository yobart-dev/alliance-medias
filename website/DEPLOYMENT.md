# Guide de déploiement - Alliance des Médias

Ce guide vous explique comment déployer le site en production.

## Prérequis

- Compte Vercel (gratuit) ou VPS
- Serveur WordPress configuré (voir `WORDPRESS_SETUP.md`)
- Variables d'environnement configurées

## Option 1 : Déploiement sur Vercel (Recommandé)

### Étape 1 : Préparer le repository

1. Assurez-vous que tout est commité et poussé sur GitHub
2. Vérifiez que le build fonctionne localement :
   ```bash
   npm run build
   ```

### Étape 2 : Connecter à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Cliquez sur "Add New Project"
4. Sélectionnez le repository `alliance-medias`
5. Configurez :
   - **Root Directory** : `website`
   - **Framework Preset** : Next.js
   - **Build Command** : `npm run build` (ou `pnpm build`)
   - **Output Directory** : `.next` (par défaut)

### Étape 3 : Configurer les variables d'environnement

Dans les paramètres du projet Vercel, ajoutez :

```
NEXT_PUBLIC_WORDPRESS_URL=https://votre-wordpress.com
WORDPRESS_USERNAME=votre-username
WORDPRESS_APPLICATION_PASSWORD=votre-password
WEBHOOK_SECRET_KEY=votre-cle-secrete
NEXT_PUBLIC_SITE_URL=https://votre-site-vercel.vercel.app
```

### Étape 4 : Déployer

1. Cliquez sur "Deploy"
2. Attendez la fin du build
3. Votre site sera disponible à l'URL fournie par Vercel

### Étape 5 : Configurer un domaine personnalisé (optionnel)

1. Dans les paramètres du projet Vercel
2. Allez dans "Domains"
3. Ajoutez votre domaine
4. Suivez les instructions DNS

## Option 2 : Déploiement sur VPS

### Étape 1 : Préparer le serveur

1. Connectez-vous à votre VPS via SSH
2. Installez Node.js (version 18 ou supérieure)
3. Installez PM2 pour gérer le processus :
   ```bash
   npm install -g pm2
   ```

### Étape 2 : Cloner et construire

```bash
git clone https://github.com/yobart-dev/alliance-medias.git
cd alliance-medias/website
npm install
npm run build
```

### Étape 3 : Configurer les variables d'environnement

Créez un fichier `.env.production` :
```bash
NEXT_PUBLIC_WORDPRESS_URL=https://votre-wordpress.com
WORDPRESS_USERNAME=votre-username
WORDPRESS_APPLICATION_PASSWORD=votre-password
WEBHOOK_SECRET_KEY=votre-cle-secrete
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

### Étape 4 : Lancer avec PM2

```bash
pm2 start npm --name "alliance-medias" -- start
pm2 save
pm2 startup
```

### Étape 5 : Configurer Nginx

Créez un fichier de configuration Nginx :

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Redémarrez Nginx :
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Configuration WordPress

Assurez-vous que :

1. WordPress est accessible publiquement
2. La REST API fonctionne : `https://votre-wordpress.com/wp-json/wp/v2/posts`
3. CORS est configuré (voir `WORDPRESS_SETUP.md`)
4. Les Custom Post Types sont créés
5. Les champs ACF sont configurés

## Vérification post-déploiement

1. ✅ Le site charge correctement
2. ✅ Les articles s'affichent depuis WordPress
3. ✅ Les médias partenaires s'affichent
4. ✅ Le formulaire de contact fonctionne
5. ✅ Le webhook répond (GET `/api/articles/webhook`)
6. ✅ Le sitemap est accessible (`/sitemap.xml`)

## Maintenance

### Mettre à jour le site

**Vercel** : Push automatique depuis GitHub

**VPS** :
```bash
cd alliance-medias/website
git pull
npm install
npm run build
pm2 restart alliance-medias
```

### Logs

**Vercel** : Dashboard Vercel > Deployments > Logs

**VPS** :
```bash
pm2 logs alliance-medias
```

## Support

En cas de problème :
1. Vérifiez les logs
2. Vérifiez les variables d'environnement
3. Testez la connexion WordPress
4. Consultez la documentation WordPress

