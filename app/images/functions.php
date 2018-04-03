<?php


/**
 *  Loaded script and style
 */
function load_style_and_script(){

	wp_enqueue_script('common_js', get_stylesheet_directory_uri() . '/dist/js/main.min.js');

	wp_enqueue_style('common_css', get_stylesheet_directory_uri() . '/dist/css/styles.min.css' );
}

/**
 *  Loading script and style
 */

add_action('wp_enqueue_scripts', 'load_style_and_script');

