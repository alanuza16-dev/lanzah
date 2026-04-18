<?php

global $site;

$site = [
    'brand' => 'Lanzah Enterprise',
    'hero_title' => 'Lanzah Enterprise',
    'hero_subtitle' => 'Soluciones Tecnológicas para tu Negocio',
    'about_title' => '¿Quiénes somos?',
    'about_text' => 'Somos un equipo de desarrolladores apasionados por la innovación digital. Nos especializamos en crear soluciones tecnológicas a medida para emprendedores y empresas en crecimiento, ayudándoles a fortalecer su presencia en línea. Ofrecemos servicios de desarrollo web y gestión estratégica de redes sociales, enfocados en potenciar su marca, atraer clientes y generar resultados reales en el entorno digital.',
    'project_featured_title' => 'Shoreline',
    'project_featured_text' => 'Grayscale is open source and MIT licensed. This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!',
    'project_one_title' => 'Desarrollo de Páginas web',
    'project_one_text' => 'Creamos sitios web modernos, funcionales y optimizados para convertir visitantes en clientes, adaptados a las necesidades de tu negocio.',
    'project_two_title' => 'Gestión de redes sociales',
    'project_two_text' => 'Potenciamos tu presencia digital mediante creación de portafolios y estrategias de contenido que conectan con tu audiencia y generan resultados reales.',
    'project_three_title' => 'Consultoría Tecnológica',
    'project_three_text' => 'Te asesoramos en la implementación de soluciones tecnológicas eficientes para optimizar procesos y mejorar el rendimiento de tu empresa.',
    'signup_title' => 'Subscribe to receive updates!',
    'address' => 'Cartago, Costa Rica',
    'email' => 'infolanzah@gmail.com',
    'phone1' => '(+506) 7261-0095',
    'phone2' => '(+506) 7244-3374'
];

if (file_exists(get_template_directory() . '/config/config.php')) {
    require_once get_template_directory() . '/config/config.php';
}

if (file_exists(get_template_directory() . '/functions/functions.php')) {
    require_once get_template_directory() . '/functions/functions.php';
}

function lanzah_enqueue_assets() {
    wp_enqueue_style(
        'bootstrap-css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        array(),
        '5.3.3'
    );

    wp_enqueue_style(
        'lanzah-styles',
        get_template_directory_uri() . '/assets/css/styles.css',
        array('bootstrap-css'),
        '1.0'
    );

    wp_enqueue_script(
        'fontawesome',
        'https://use.fontawesome.com/releases/v6.3.0/js/all.js',
        array(),
        '6.3.0',
        false
    );

    wp_enqueue_script(
        'bootstrap-bundle',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
        array(),
        '5.3.3',
        true
    );

    wp_enqueue_script(
        'lanzah-scripts',
        get_template_directory_uri() . '/assets/js/scripts.js',
        array('bootstrap-bundle'),
        '1.0',
        true
    );
}

add_action('wp_enqueue_scripts', 'lanzah_enqueue_assets');
