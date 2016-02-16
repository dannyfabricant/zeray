<?php

function my_scripts_method() {
	wp_enqueue_style( 'main-style', get_stylesheet_uri() );

	wp_enqueue_script('main',get_bloginfo('template_directory') . '/js/main.js',array('jquery'));
}

add_action( 'wp_enqueue_scripts', 'my_scripts_method' );
add_theme_support( 'post-thumbnails' ); 

?>