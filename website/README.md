# Alliance des Médias - Site Web

Site web pour l'Alliance des Médias de Provence-Alpes-Côte d'Azur, construit avec Next.js et WordPress headless.

## Architecture

- **Frontend** : Next.js 16 (App Router) avec TypeScript
- **Backend** : WordPress headless (REST API)
- **UI** : shadcn/ui + Tailwind CSS
- **Hébergement** : Vercel (frontend) + VPS Hostinger (WordPress)

## Structure du projet

```
website/
├── app/                    # Pages Next.js
│   ├── api/               # API Routes
│   ├── actualites/        # Page actualités
│   ├── article/[slug]/    # Pages articles dynamiques
│   ├── media/[slug]/      # Pages médias partenaires
│   └── ...
├── components/            # Composants React
│   ├── home/             # Sections page d'accueil
│   ├── ui/               # Composants shadcn/ui
│   └── ...
├── lib/                  # Utilitaires
│   ├── wordpress.ts      # Client API WordPress
│   ├── transformers.ts   # Transformateurs de données
│   └── ...
└── types/                # Types TypeScript
```

## Installation

1. **Installer les dépendances**
   ```bash
   cd website
   npm install
   # ou
   pnpm install
   ```

2. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env.local
   ```
   
   Remplir les variables dans `.env.local` :
   ```
   NEXT_PUBLIC_WORDPRESS_URL=https://votre-wordpress.com
   WORDPRESS_USERNAME=votre-username
   WORDPRESS_APPLICATION_PASSWORD=votre-password
   WEBHOOK_SECRET_KEY=votre-cle-secrete
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

## Configuration WordPress

Voir les fichiers de documentation :
- `WORDPRESS_SETUP.md` - Guide de configuration WordPress headless
- `ACF_FIELDS_SETUP.md` - Configuration des champs ACF
- `wordpress-plugin.php` - Plugin pour Custom Post Types
- `wordpress-webhook-sender.php` - Plugin pour envoyer les articles

## Fonctionnalités

- ✅ Intégration WordPress headless
- ✅ Pages dynamiques avec ISR
- ✅ Recherche et filtres d'articles
- ✅ Formulaire de contact fonctionnel
- ✅ Webhook pour recevoir des articles
- ✅ SEO optimisé (sitemap, métadonnées)
- ✅ Design responsive et animations
- ✅ Optimisation des images

## Scripts disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run start` - Lancer le serveur de production
- `npm run lint` - Vérifier le code

## Déploiement

### Frontend (Vercel)

1. Connecter votre repository GitHub à Vercel
2. Configurer les variables d'environnement dans Vercel
3. Déployer automatiquement

### Backend (WordPress)

1. Installer WordPress sur votre VPS
2. Installer les plugins nécessaires (ACF, etc.)
3. Activer le plugin `wordpress-plugin.php`
4. Configurer les champs ACF selon `ACF_FIELDS_SETUP.md`

## Support

Pour toute question ou problème, consultez la documentation dans les fichiers `.md` ou contactez l'équipe de développement.
