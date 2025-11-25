<?php
/**
 * Plugin Name: Alliance Medias Custom Post Types
 * Description: Custom Post Types et Taxonomies pour l'Alliance des Médias
 * Version: 1.0.0
 * Author: Alliance Medias
 */

// Sécurité : empêcher l'accès direct
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Créer le Custom Post Type: Article
 */
function alliance_medias_create_article_post_type() {
    $labels = array(
        'name' => 'Articles',
        'singular_name' => 'Article',
        'add_new' => 'Ajouter un article',
        'add_new_item' => 'Ajouter un nouvel article',
        'edit_item' => 'Modifier l\'article',
        'new_item' => 'Nouvel article',
        'view_item' => 'Voir l\'article',
        'search_items' => 'Rechercher des articles',
        'not_found' => 'Aucun article trouvé',
        'not_found_in_trash' => 'Aucun article dans la corbeille',
        'all_items' => 'Tous les articles',
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true, // CRUCIAL pour REST API
        'rest_base' => 'articles',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'author'),
        'menu_icon' => 'dashicons-edit',
        'menu_position' => 5,
        'capability_type' => 'post',
        'rewrite' => array('slug' => 'article'),
    );

    register_post_type('article', $args);
}
add_action('init', 'alliance_medias_create_article_post_type');

/**
 * Créer le Custom Post Type: Média Partenaire
 */
function alliance_medias_create_media_partner_post_type() {
    $labels = array(
        'name' => 'Médias Partenaires',
        'singular_name' => 'Média Partenaire',
        'add_new' => 'Ajouter un média',
        'add_new_item' => 'Ajouter un nouveau média partenaire',
        'edit_item' => 'Modifier le média',
        'new_item' => 'Nouveau média',
        'view_item' => 'Voir le média',
        'search_items' => 'Rechercher des médias',
        'not_found' => 'Aucun média trouvé',
        'not_found_in_trash' => 'Aucun média dans la corbeille',
        'all_items' => 'Tous les médias partenaires',
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true, // CRUCIAL pour REST API
        'rest_base' => 'media-partners',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-groups',
        'menu_position' => 6,
        'capability_type' => 'post',
        'rewrite' => array('slug' => 'media-partenaire'),
    );

    register_post_type('media_partner', $args);
}
add_action('init', 'alliance_medias_create_media_partner_post_type');

/**
 * Créer la taxonomie: Catégorie Média
 */
function alliance_medias_create_media_category_taxonomy() {
    $labels = array(
        'name' => 'Catégories Médias',
        'singular_name' => 'Catégorie Média',
        'search_items' => 'Rechercher des catégories',
        'all_items' => 'Toutes les catégories',
        'parent_item' => 'Catégorie parente',
        'parent_item_colon' => 'Catégorie parente :',
        'edit_item' => 'Modifier la catégorie',
        'update_item' => 'Mettre à jour la catégorie',
        'add_new_item' => 'Ajouter une nouvelle catégorie',
        'new_item_name' => 'Nom de la nouvelle catégorie',
        'menu_name' => 'Catégories Médias',
    );

    $args = array(
        'labels' => $labels,
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_rest' => true, // CRUCIAL pour REST API
        'rest_base' => 'media-categories',
        'query_var' => true,
        'rewrite' => array('slug' => 'categorie-media'),
    );

    register_taxonomy('media_category', array('article'), $args);
}
add_action('init', 'alliance_medias_create_media_category_taxonomy');

/**
 * Créer la taxonomie: Région PACA
 */
function alliance_medias_create_region_paca_taxonomy() {
    $labels = array(
        'name' => 'Régions PACA',
        'singular_name' => 'Région PACA',
        'search_items' => 'Rechercher des régions',
        'all_items' => 'Toutes les régions',
        'parent_item' => 'Région parente',
        'parent_item_colon' => 'Région parente :',
        'edit_item' => 'Modifier la région',
        'update_item' => 'Mettre à jour la région',
        'add_new_item' => 'Ajouter une nouvelle région',
        'new_item_name' => 'Nom de la nouvelle région',
        'menu_name' => 'Régions PACA',
    );

    $args = array(
        'labels' => $labels,
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_rest' => true, // CRUCIAL pour REST API
        'rest_base' => 'regions-paca',
        'query_var' => true,
        'rewrite' => array('slug' => 'region-paca'),
    );

    register_taxonomy('region_paca', array('article'), $args);
}
add_action('init', 'alliance_medias_create_region_paca_taxonomy');

/**
 * Exposer les champs ACF dans REST API
 */
function alliance_medias_expose_acf_in_rest() {
    $post_types = ['article', 'media_partner'];
    
    foreach ($post_types as $post_type) {
        register_rest_field($post_type, 'acf', array(
            'get_callback' => function($post) {
                return get_fields($post['id']);
            },
            'update_callback' => null,
            'schema' => null,
        ));
    }
}
add_action('rest_api_init', 'alliance_medias_expose_acf_in_rest');

/**
 * Autoriser CORS pour l'API WordPress
 */
function alliance_medias_add_cors_headers() {
    // Récupérer l'URL du site Next.js depuis les options
    $nextjs_url = get_option('alliance_medias_nextjs_url', '*');
    
    header("Access-Control-Allow-Origin: {$nextjs_url}");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce");
    header("Access-Control-Allow-Credentials: true");
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit(0);
    }
}
add_action('rest_api_init', 'alliance_medias_add_cors_headers', 15);

/**
 * Ajouter un endpoint custom pour rechercher par média slug
 */
function alliance_medias_register_custom_endpoints() {
    register_rest_route('alliance-medias/v1', '/articles/by-media/(?P<slug>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'alliance_medias_get_articles_by_media',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'alliance_medias_register_custom_endpoints');

/**
 * Callback pour récupérer les articles par média slug
 */
function alliance_medias_get_articles_by_media($request) {
    $media_slug = $request['slug'];
    
    $args = array(
        'post_type' => 'article',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'media_slug',
                'value' => $media_slug,
                'compare' => '=',
            ),
        ),
    );
    
    $query = new WP_Query($args);
    $articles = array();
    
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $articles[] = rest_ensure_response(get_post(get_the_ID()));
        }
    }
    
    wp_reset_postdata();
    
    return rest_ensure_response($articles);
}

/**
 * Ajouter un menu dans l'admin pour la configuration
 */
function alliance_medias_add_admin_menu() {
    add_options_page(
        'Alliance Medias Settings',
        'Alliance Medias',
        'manage_options',
        'alliance-medias-settings',
        'alliance_medias_settings_page'
    );
}
add_action('admin_menu', 'alliance_medias_add_admin_menu');

/**
 * Page de configuration
 */
function alliance_medias_settings_page() {
    if (isset($_POST['submit'])) {
        update_option('alliance_medias_nextjs_url', sanitize_text_field($_POST['nextjs_url']));
        echo '<div class="notice notice-success"><p>Paramètres sauvegardés !</p></div>';
    }
    
    $nextjs_url = get_option('alliance_medias_nextjs_url', '*');
    ?>
    <div class="wrap">
        <h1>Paramètres Alliance Medias</h1>
        <form method="post" action="">
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="nextjs_url">URL du site Next.js</label>
                    </th>
                    <td>
                        <input 
                            type="text" 
                            id="nextjs_url" 
                            name="nextjs_url" 
                            value="<?php echo esc_attr($nextjs_url); ?>" 
                            class="regular-text"
                            placeholder="https://votre-site-nextjs.com ou * pour tous"
                        />
                        <p class="description">
                            URL de votre site Next.js pour autoriser CORS. Utilisez * pour autoriser toutes les origines (non recommandé en production).
                        </p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

