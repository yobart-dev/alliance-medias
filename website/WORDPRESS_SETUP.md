# Guide de configuration WordPress Headless

Ce guide vous explique comment configurer WordPress en mode headless pour l'Alliance des Médias.

## Étape 1 : Installation WordPress

1. **Installer WordPress sur votre VPS Hostinger**
   - Suivez le guide d'installation standard de WordPress
   - Notez l'URL de votre installation (ex: `https://cms.alliance-medias.fr`)

2. **Configurer les permaliens**
   - Allez dans **Réglages > Permaliens**
   - Choisissez "Nom de l'article" ou "Structure personnalisée"
   - Sauvegardez

## Étape 2 : Activer la REST API

La REST API est activée par défaut dans WordPress. Vérifiez qu'elle fonctionne :

```
https://votre-domaine.com/wp-json/wp/v2/posts
```

Vous devriez voir une liste d'articles au format JSON.

## Étape 3 : Configurer CORS (Cross-Origin Resource Sharing)

Pour autoriser Next.js à accéder à votre API WordPress, ajoutez ce code dans le fichier `functions.php` de votre thème (ou créez un plugin) :

```php
<?php
// Autoriser CORS pour l'API WordPress
function add_cors_headers() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(0);
    }
}
add_action('rest_api_init', 'add_cors_headers');
```

**Note** : En production, remplacez `*` par l'URL exacte de votre site Next.js pour plus de sécurité.

## Étape 4 : Installer les plugins nécessaires

### 4.1 Advanced Custom Fields (ACF)
1. Installez le plugin **Advanced Custom Fields** (gratuit)
2. Ou utilisez **ACF Pro** (payant, plus de fonctionnalités)

### 4.2 WPGraphQL (optionnel mais recommandé)
1. Installez le plugin **WPGraphQL**
2. Activez-le
3. Cela permet d'utiliser GraphQL en plus de REST API

### 4.3 Custom Post Type UI (optionnel)
1. Installez le plugin **Custom Post Type UI**
2. Facilite la création de Custom Post Types

## Étape 5 : Créer les Custom Post Types

Vous pouvez créer les Custom Post Types via code (recommandé) ou avec un plugin.

### Option A : Via code (dans functions.php ou un plugin)

Créez un fichier `custom-post-types.php` dans votre thème ou plugin :

```php
<?php
// Custom Post Type: Article
function create_article_post_type() {
    register_post_type('article',
        array(
            'labels' => array(
                'name' => 'Articles',
                'singular_name' => 'Article',
                'add_new' => 'Ajouter un article',
                'add_new_item' => 'Ajouter un nouvel article',
                'edit_item' => 'Modifier l\'article',
                'new_item' => 'Nouvel article',
                'view_item' => 'Voir l\'article',
                'search_items' => 'Rechercher des articles',
                'not_found' => 'Aucun article trouvé',
                'not_found_in_trash' => 'Aucun article dans la corbeille'
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true, // Important pour REST API
            'rest_base' => 'articles',
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
            'menu_icon' => 'dashicons-edit',
        )
    );
}
add_action('init', 'create_article_post_type');

// Custom Post Type: Média Partenaire
function create_media_partner_post_type() {
    register_post_type('media_partner',
        array(
            'labels' => array(
                'name' => 'Médias Partenaires',
                'singular_name' => 'Média Partenaire',
            ),
            'public' => true,
            'has_archive' => false,
            'show_in_rest' => true, // Important pour REST API
            'rest_base' => 'media-partners',
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'menu_icon' => 'dashicons-groups',
        )
    );
}
add_action('init', 'create_media_partner_post_type');
```

### Option B : Via plugin Custom Post Type UI

1. Allez dans **CPT UI > Add/Edit Post Types**
2. Créez un nouveau type nommé `article`
3. Cochez **Show In REST API** et définissez **REST API base slug** à `articles`
4. Répétez pour `media_partner` avec slug `media-partners`

## Étape 6 : Créer les Custom Taxonomies

### Taxonomie: Catégorie Média

```php
function create_media_category_taxonomy() {
    register_taxonomy('media_category',
        array('article'),
        array(
            'labels' => array(
                'name' => 'Catégories Médias',
                'singular_name' => 'Catégorie Média',
            ),
            'public' => true,
            'show_in_rest' => true, // Important pour REST API
            'hierarchical' => true,
        )
    );
}
add_action('init', 'create_media_category_taxonomy');
```

### Taxonomie: Région PACA

```php
function create_region_paca_taxonomy() {
    register_taxonomy('region_paca',
        array('article'),
        array(
            'labels' => array(
                'name' => 'Régions PACA',
                'singular_name' => 'Région PACA',
            ),
            'public' => true,
            'show_in_rest' => true,
            'hierarchical' => true,
        )
    );
}
add_action('init', 'create_region_paca_taxonomy');
```

## Étape 7 : Configurer Advanced Custom Fields (ACF)

### Pour les Articles (Custom Post Type: article)

Créez un groupe de champs ACF avec ces champs :

1. **read_time** (Texte)
   - Label: Temps de lecture
   - Nom: `read_time`
   - Type: Texte

2. **media_source** (Texte)
   - Label: Source média
   - Nom: `media_source`
   - Type: Texte

3. **media_slug** (Texte)
   - Label: Slug du média partenaire
   - Nom: `media_slug`
   - Type: Texte

4. **featured_image** (Image)
   - Label: Image principale
   - Nom: `featured_image`
   - Type: Image
   - Retour: Image Array

### Pour les Médias Partenaires (Custom Post Type: media_partner)

Créez un groupe de champs avec :

1. **name** (Texte)
2. **tagline** (Texte)
3. **description** (Texte)
4. **long_description** (Zone de texte)
5. **theme** (Texte)
6. **color** (Texte) - ex: "from-slate-700 to-slate-900"
7. **icon** (Texte) - nom de l'icône Lucide
8. **coverage** (Texte)
9. **founded** (Texte)
10. **website** (URL)
11. **specialties** (Liste)
12. **team** (Texte)
13. **audience** (Texte)
14. **bg_image** (Image)
15. **logo** (Image)

**Important** : Dans les paramètres ACF, assignez ces groupes aux bons Custom Post Types.

## Étape 8 : Exposer ACF dans REST API

Ajoutez ce code pour exposer les champs ACF dans l'API :

```php
// Exposer les champs ACF dans REST API
function expose_acf_in_rest() {
    $post_types = ['article', 'media_partner'];
    
    foreach ($post_types as $post_type) {
        register_rest_field($post_type, 'acf', array(
            'get_callback' => function($post) {
                return get_fields($post['id']);
            },
        ));
    }
}
add_action('rest_api_init', 'expose_acf_in_rest');
```

## Étape 9 : Créer une Application Password (pour l'authentification)

1. Allez dans **Utilisateurs > Votre profil**
2. Faites défiler jusqu'à **Application Passwords**
3. Créez une nouvelle application password
4. **Copiez le mot de passe** (il ne sera affiché qu'une fois)
5. Utilisez ce mot de passe dans votre fichier `.env.local`

## Étape 10 : Tester l'API

Testez ces endpoints :

- Articles : `https://votre-domaine.com/wp-json/wp/v2/articles`
- Médias partenaires : `https://votre-domaine.com/wp-json/wp/v2/media-partners`
- Un article spécifique : `https://votre-domaine.com/wp-json/wp/v2/articles/1`

## Étape 11 : Configurer Next.js

1. Copiez `.env.example` vers `.env.local`
2. Remplissez les variables d'environnement
3. Redémarrez le serveur de développement

## Désactiver le thème frontend (optionnel)

Pour un vrai mode headless, vous pouvez désactiver l'accès au frontend WordPress :

```php
// Rediriger toutes les requêtes frontend vers l'admin
function redirect_frontend_to_admin() {
    if (!is_admin() && !wp_doing_ajax() && !is_rest()) {
        wp_redirect(admin_url());
        exit;
    }
}
add_action('template_redirect', 'redirect_frontend_to_admin');
```

**Note** : Cette étape est optionnelle. Vous pouvez garder le frontend WordPress pour l'administration.

## Support

Si vous rencontrez des problèmes :
1. Vérifiez que la REST API est accessible
2. Vérifiez les logs WordPress
3. Testez avec Postman ou curl
4. Consultez la documentation WordPress REST API

