<?php
/**
 * Plugin Name: Alliance Medias Webhook Sender
 * Description: Envoie automatiquement les articles vers l'API Alliance Medias
 * Version: 1.0.0
 * Author: Alliance Medias
 */

// Sécurité : empêcher l'accès direct
if (!defined('ABSPATH')) {
    exit;
}

class Alliance_Medias_Webhook_Sender {
    private $webhook_url;
    private $secret_key;

    public function __construct() {
        // Récupérer les paramètres depuis les options WordPress
        $this->webhook_url = get_option('alliance_medias_webhook_url', '');
        $this->secret_key = get_option('alliance_medias_webhook_secret', '');

        // Hook pour envoyer l'article après publication
        add_action('save_post', array($this, 'send_article_to_webhook'), 10, 3);
        
        // Ajouter la page de configuration dans l'admin
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
    }

    /**
     * Envoyer l'article vers le webhook
     */
    public function send_article_to_webhook($post_id, $post, $update) {
        // Vérifier que c'est un article publié
        if ($post->post_status !== 'publish' || $post->post_type !== 'post') {
            return;
        }

        // Vérifier que les paramètres sont configurés
        if (empty($this->webhook_url) || empty($this->secret_key)) {
            return;
        }

        // Éviter les boucles infinies
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        // Récupérer les champs ACF
        $media_slug = get_field('media_slug', $post_id);
        $media_source = get_field('media_source', $post_id);
        $read_time = get_field('read_time', $post_id);
        $category = get_field('category', $post_id);

        // Si les champs requis ne sont pas remplis, ne pas envoyer
        if (empty($media_slug) || empty($media_source)) {
            return;
        }

        // Récupérer l'image mise en avant
        $featured_image_url = '';
        if (has_post_thumbnail($post_id)) {
            $featured_image_url = get_the_post_thumbnail_url($post_id, 'large');
        }

        // Préparer les données
        $data = array(
            'title' => $post->post_title,
            'content' => $post->post_content,
            'excerpt' => $post->post_excerpt,
            'media_slug' => $media_slug,
            'media_source' => $media_source,
            'category' => $category ? $category : '',
            'read_time' => $read_time ? $read_time : '5 min',
            'featured_image_url' => $featured_image_url,
            'date' => $post->post_date,
            'status' => 'publish',
        );

        // Envoyer la requête
        $response = wp_remote_post($this->webhook_url, array(
            'method' => 'POST',
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->secret_key,
                'Content-Type' => 'application/json',
            ),
            'body' => json_encode($data),
            'timeout' => 30,
        ));

        // Vérifier la réponse
        if (is_wp_error($response)) {
            error_log('Alliance Medias Webhook Error: ' . $response->get_error_message());
        } else {
            $response_code = wp_remote_retrieve_response_code($response);
            if ($response_code === 200) {
                // Succès
                update_post_meta($post_id, '_alliance_medias_sent', current_time('mysql'));
            } else {
                $response_body = wp_remote_retrieve_body($response);
                error_log('Alliance Medias Webhook Error: HTTP ' . $response_code . ' - ' . $response_body);
            }
        }
    }

    /**
     * Ajouter le menu dans l'admin
     */
    public function add_admin_menu() {
        add_options_page(
            'Alliance Medias Webhook',
            'Alliance Medias',
            'manage_options',
            'alliance-medias-webhook',
            array($this, 'settings_page')
        );
    }

    /**
     * Enregistrer les paramètres
     */
    public function register_settings() {
        register_setting('alliance_medias_webhook', 'alliance_medias_webhook_url');
        register_setting('alliance_medias_webhook', 'alliance_medias_webhook_secret');
    }

    /**
     * Page de configuration
     */
    public function settings_page() {
        if (isset($_POST['submit'])) {
            check_admin_referer('alliance_medias_webhook_settings');
            
            update_option('alliance_medias_webhook_url', sanitize_text_field($_POST['webhook_url']));
            update_option('alliance_medias_webhook_secret', sanitize_text_field($_POST['webhook_secret']));
            
            $this->webhook_url = get_option('alliance_medias_webhook_url', '');
            $this->secret_key = get_option('alliance_medias_webhook_secret', '');
            
            echo '<div class="notice notice-success"><p>Paramètres sauvegardés !</p></div>';
        }
        ?>
        <div class="wrap">
            <h1>Configuration Alliance Medias Webhook</h1>
            <form method="post" action="">
                <?php wp_nonce_field('alliance_medias_webhook_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="webhook_url">URL du Webhook</label>
                        </th>
                        <td>
                            <input 
                                type="url" 
                                id="webhook_url" 
                                name="webhook_url" 
                                value="<?php echo esc_attr($this->webhook_url); ?>" 
                                class="regular-text"
                                placeholder="https://votre-site.com/api/articles/webhook"
                            />
                            <p class="description">
                                URL de l'endpoint webhook de votre site Next.js
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="webhook_secret">Clé secrète</label>
                        </th>
                        <td>
                            <input 
                                type="text" 
                                id="webhook_secret" 
                                name="webhook_secret" 
                                value="<?php echo esc_attr($this->secret_key); ?>" 
                                class="regular-text"
                                placeholder="Votre clé secrète"
                            />
                            <p class="description">
                                Clé secrète configurée dans votre fichier .env.local (WEBHOOK_SECRET_KEY)
                            </p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
            
            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h2>Instructions</h2>
                <ol>
                    <li>Configurez l'URL du webhook (ex: https://alliance-medias.fr/api/articles/webhook)</li>
                    <li>Configurez la clé secrète (doit correspondre à WEBHOOK_SECRET_KEY dans votre .env.local)</li>
                    <li>Assurez-vous que les champs ACF suivants sont remplis pour chaque article :
                        <ul>
                            <li><strong>media_slug</strong> : Slug du média (ex: "sport-med")</li>
                            <li><strong>media_source</strong> : Nom du média (ex: "Sport MED")</li>
                            <li><strong>read_time</strong> : Temps de lecture (optionnel)</li>
                            <li><strong>category</strong> : Catégorie (optionnel)</li>
                        </ul>
                    </li>
                    <li>Les articles seront automatiquement envoyés lors de la publication</li>
                </ol>
            </div>
        </div>
        <?php
    }
}

// Initialiser le plugin
new Alliance_Medias_Webhook_Sender();

