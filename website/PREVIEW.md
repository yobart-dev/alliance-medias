# Aperçu du projet - Mode Démo

Le site fonctionne maintenant en **mode aperçu** avec des données de démonstration, même sans WordPress configuré !

## Lancer l'aperçu

1. **Installer les dépendances** (si ce n'est pas déjà fait) :
   ```bash
   cd website
   npm install
   # ou
   pnpm install
   ```

2. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

3. **Ouvrir dans le navigateur** :
   ```
   http://localhost:3000
   ```

## Ce que vous verrez

- ✅ **Page d'accueil** avec 6 articles de démonstration
- ✅ **6 médias partenaires** avec leurs informations
- ✅ **Page actualités** avec 8 articles de démonstration
- ✅ **Pages médias** individuelles (cliquez sur un média)
- ✅ **Pages articles** individuelles (cliquez sur un article)
- ✅ **Formulaire de contact** fonctionnel
- ✅ **Recherche et filtres** opérationnels
- ✅ **Design complet** avec animations

## Indicateur de mode démo

Un bandeau jaune apparaît en bas à droite pour indiquer que vous êtes en mode aperçu. Il disparaîtra automatiquement une fois WordPress configuré.

## Données de démonstration

Les données mockées incluent :
- 6 médias partenaires (Sport MED, Marcelle, mprovence, LEHTM, Frequence Mistral, bleu tomate)
- 8 articles d'exemple avec différentes catégories
- Images depuis le dossier `/public`

## Passer en mode production

Une fois WordPress configuré :

1. Créez un fichier `.env.local` dans `website/`
2. Ajoutez :
   ```
   NEXT_PUBLIC_WORDPRESS_URL=https://votre-wordpress.com
   ```
3. Redémarrez le serveur de développement

Le site basculera automatiquement vers les données WordPress réelles !

## Notes

- Les données mockées sont dans `lib/mock-data.ts`
- Le système détecte automatiquement si WordPress est disponible
- En cas d'erreur de connexion WordPress, les données mockées sont utilisées
- Toutes les fonctionnalités sont opérationnelles en mode démo

