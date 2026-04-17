<?php
get_header();

if (file_exists(get_template_directory() . '/gui/gui_index.php')) {
    include get_template_directory() . '/gui/gui_index.php';
}

get_footer();