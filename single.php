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
				<a id='name' href="<?php echo get_settings('home'); ?>">Yong Hee Kim</a>
			<div id='projects-wrapper'>
				<div id='projects'>
					<div id='divider'></div>
					<div id='title' class='expand-footer'>
						<div id='projects-title'>projects</div>
					</div>
					<div class='project-links closed'>
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
					<div style="clear:both"></div>
				</div>
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
			?>
				<div id='gallery-info'>
					<div id='gallery-title'><?php the_title(); ?></div>
					<div id='info-divider'></div>
					<div id='gallery-date'><?php the_field('gallery_date') ?></div>
				</div>
			<?php
				the_content();
			endwhile;
			?>
		</div>
	</div>

<?php get_footer(); ?>
