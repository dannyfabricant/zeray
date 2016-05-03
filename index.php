<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * e.g., it puts together the home page when no home.php file exists.
 *
 * Learn more: {@link https://codex.wordpress.org/Template_Hierarchy}
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

	<div id="wrapper">
	    <div id="title">zeray studio</div>
	    <div id="bk">Made In Brooklyn NY, USA</div>
	    <div id="nav">
	    	<div class="tag">Manifesto</div>
	    	<div class="tag catalog">Catalog</div>
	    	<div class="tag">Contact</div>
	    </div>
	    <?php
			$args = array( 'posts_per_page' => -1, 'category_name' => 'highlighted', 'order'=> 'ASC', 'orderby' => 'date' );
			$postslist = get_posts( $args );
			foreach ( $postslist as $post ) :
			  setup_postdata( $post ); ?> 
				<div bouncy="ball" class='<?php the_ID(); ?>'>
					<?php the_post_thumbnail(); ?>
				</div>
			<?php
			endforeach; 
			wp_reset_postdata();
		?>
		<div class='close'>X</div>
	    <div id='catalog'>
		    <?php
				$args = array( 'posts_per_page' => -1, 'category_name' => 'highlighted', 'order'=> 'ASC', 'orderby' => 'date' );
				$postslist = get_posts( $args );
				foreach ( $postslist as $post ) :
				  setup_postdata( $post ); ?>

					<a id='<?php the_ID(); ?>' class='project'>
						<div class='title'><?php the_title(); ?></div>
						<?php the_content(); ?>
						<div class='info'>
							<div>Product Info</div>
							<?php if( get_field('materials') ): ?>
								<p><?php the_field('materials'); ?></p>
							<?php endif; ?>
							<?php if( get_field('dimensions') ): ?>
								<p><?php the_field('dimensions'); ?></p>
							<?php endif; ?>
						</div>
						<div class='slider-controls' gallery='<?php the_ID(); ?>'>
							<div class='left'><</div>
							<div class='right'>></div>
							<div class=''></div>
						</div>
					</a>
					<div class='clear'>&nbsp;</div>
				<?php
				endforeach; 
				wp_reset_postdata();
			?>
		</div>
		<div id='manifesto'></div>
	</div>

<?php get_footer(); ?>
