<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

	<div id='wrapper'>
		<div id='footer'>
			<h1>Yong Hee Kim</h1>
			<div id='projects'>
				<?php
					$args = array( 'posts_per_page' => -1, 'category_name' => 'gallery', 'order'=> 'ASC', 'orderby' => 'date' );
					$postslist = get_posts( $args );
					foreach ( $postslist as $post ) :
					  setup_postdata( $post ); ?> 
						<a href="<?php the_permalink(); ?>" class='project-title' title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
					<?php
					endforeach; 
					wp_reset_postdata();
				?>
			</div>
		</div>
		<div id="content">
			<?php
			while ( have_posts() ) : the_post();

				/*
				 * Include the post format-specific template for the content. If you want to
				 * use this in a child theme, then include a file called called content-___.php
				 * (where ___ is the post format) and that will be used instead.
				 */
				get_template_part( 'content', get_post_format() );
				the_content();
			endwhile;
			?>
		</div>
	</div>

<?php get_footer(); ?>
