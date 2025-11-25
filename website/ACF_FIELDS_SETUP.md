# Configuration Advanced Custom Fields (ACF)

Ce guide explique comment configurer les champs ACF pour les Custom Post Types.

## Installation ACF

1. **Installer Advanced Custom Fields**
   - Allez dans **Extensions > Ajouter**
   - Recherchez "Advanced Custom Fields"
   - Installez et activez le plugin (version gratuite suffit)

## Configuration des champs pour les Articles

### Groupe de champs : "Champs Article"

1. Allez dans **Champs personnalisés > Ajouter nouveau**
2. Nom du groupe : **Champs Article**
3. Emplacement : Afficher ce groupe de champs si **Type de publication** est égal à **Article**

#### Champs à créer :

1. **Temps de lecture** (`read_time`)
   - Type : Texte
   - Label : Temps de lecture
   - Nom : `read_time`
   - Instructions : Ex: "5 min", "10 min"
   - Requis : Non

2. **Source média** (`media_source`)
   - Type : Texte
   - Label : Source média
   - Nom : `media_source`
   - Instructions : Nom du média source (ex: "Sport MED", "Marcelle")
   - Requis : Oui

3. **Slug du média partenaire** (`media_slug`)
   - Type : Texte
   - Label : Slug du média partenaire
   - Nom : `media_slug`
   - Instructions : Slug du média (ex: "sport-med", "marcelle")
   - Requis : Oui

4. **Image principale** (`featured_image`)
   - Type : Image
   - Label : Image principale
   - Nom : `featured_image`
   - Type de retour : Tableau d'image
   - Prévisualisation : Moyenne
   - Requis : Non

5. **Catégorie** (`category`)
   - Type : Texte
   - Label : Catégorie
   - Nom : `category`
   - Instructions : Ex: "Sport", "Culture", "Économie"
   - Requis : Non

## Configuration des champs pour les Médias Partenaires

### Groupe de champs : "Champs Média Partenaire"

1. Allez dans **Champs personnalisés > Ajouter nouveau**
2. Nom du groupe : **Champs Média Partenaire**
3. Emplacement : Afficher ce groupe de champs si **Type de publication** est égal à **Média Partenaire**

#### Champs à créer :

1. **Nom** (`name`)
   - Type : Texte
   - Label : Nom
   - Nom : `name`
   - Requis : Oui

2. **Tagline** (`tagline`)
   - Type : Texte
   - Label : Tagline
   - Nom : `tagline`
   - Instructions : Slogan du média
   - Requis : Oui

3. **Description** (`description`)
   - Type : Zone de texte
   - Label : Description courte
   - Nom : `description`
   - Instructions : Description courte (1-2 phrases)
   - Requis : Oui

4. **Description longue** (`long_description`)
   - Type : Zone de texte
   - Label : Description longue
   - Nom : `long_description`
   - Instructions : Description complète du média
   - Requis : Oui

5. **Thème** (`theme`)
   - Type : Texte
   - Label : Thème
   - Nom : `theme`
   - Instructions : Ex: "Sport & Loisirs", "Actualité Générale"
   - Requis : Oui

6. **Couleur** (`color`)
   - Type : Texte
   - Label : Couleur (gradient Tailwind)
   - Nom : `color`
   - Instructions : Ex: "from-slate-700 to-slate-900"
   - Requis : Oui

7. **Icône** (`icon`)
   - Type : Texte
   - Label : Nom de l'icône Lucide
   - Nom : `icon`
   - Instructions : Ex: "Trophy", "Newspaper", "Radio"
   - Requis : Oui

8. **Couverture** (`coverage`)
   - Type : Texte
   - Label : Zone de couverture
   - Nom : `coverage`
   - Instructions : Ex: "Toute la région PACA", "Provence"
   - Requis : Oui

9. **Année de création** (`founded`)
   - Type : Texte
   - Label : Année de création
   - Nom : `founded`
   - Instructions : Ex: "2015"
   - Requis : Oui

10. **Site web** (`website`)
    - Type : URL
    - Label : Site web
    - Nom : `website`
    - Instructions : URL du site du média
    - Requis : Oui

11. **Spécialités** (`specialties`)
    - Type : Liste
    - Label : Spécialités
    - Nom : `specialties`
    - Instructions : Une spécialité par ligne
    - Requis : Non

12. **Équipe** (`team`)
    - Type : Texte
    - Label : Équipe
    - Nom : `team`
    - Instructions : Ex: "8 journalistes", "12 journalistes"
    - Requis : Oui

13. **Audience** (`audience`)
    - Type : Texte
    - Label : Audience
    - Nom : `audience`
    - Instructions : Ex: "60 000 lecteurs mensuels"
    - Requis : Oui

14. **Image de fond** (`bg_image`)
    - Type : Image
    - Label : Image de fond
    - Nom : `bg_image`
    - Type de retour : Tableau d'image
    - Requis : Non

15. **Logo** (`logo`)
    - Type : Image
    - Label : Logo
    - Nom : `logo`
    - Type de retour : Tableau d'image
    - Requis : Non

## Vérification

Après avoir créé tous les champs :

1. Créez un article de test
2. Remplissez tous les champs
3. Testez l'API REST :
   ```
   https://votre-domaine.com/wp-json/wp/v2/articles/1
   ```
4. Vérifiez que le champ `acf` contient bien tous vos champs personnalisés

## Notes importantes

- Les champs ACF sont automatiquement exposés dans l'API REST grâce au plugin PHP fourni
- Le nom des champs (slug) doit correspondre exactement à celui utilisé dans le code Next.js
- Les champs requis doivent être remplis pour que les articles s'affichent correctement

