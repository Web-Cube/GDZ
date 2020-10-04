var defaults = {

	events: () => {

	},
	
	subMenu: (e) => {
		
		if ( $(e.currentTarget).parent().hasClass('is-active') ) {
			$(e.currentTarget).parent().removeClass('is-active');
			if ( $(window).width() < 810 ) {
				$(e.currentTarget).parent().find('.menu__list').fadeOut(300);
			}
		} else {
			$('.js-menu-box.is-active').removeClass('is-active');
			$(e.currentTarget).parent().addClass('is-active');
			if ( $(window).width() < 810 ) {
				$('.menu__list:visible').slideUp(300);
				$(e.currentTarget).parent().find('.menu__list').fadeIn(300);
			}
		}
		
		return false;
		
	},

	init: () => {

		defaults.events();
		$(document).on('click', '.js-show-menu', function(){
			$('.js-menu').toggleClass('is-active');
			$('.js-menu-body').fadeToggle(300);
			$('.js-close-menu').toggle();
		});
		$(document).on('click', '.js-close-menu', function(){
			$('.js-menu').removeClass('is-active');
			$('.js-menu-body').fadeOut(300);
			$('.js-close-menu').hide();
		});
		$(document).on('click', '.js-menu-head', defaults.subMenu);
		
		$('.js-show-form').click(function(){
			$(this).parent().toggleClass('is-active');
		});
		
		$('.js-show-mobile').click(function(){
			$(this).toggleClass('is-active');
			$('.js-mobile-menu').toggleClass('is-active');
		});
		
		$('.cat__head').click(function(){
			if ( $(this).parent().hasClass('is-active') ) {
				$(this).parent().removeClass('is-active');
			} else {
				$('.cat__item.is-active').removeClass('is-active');
				$(this).parent().addClass('is-active');
			}
		});

	}
}

export { defaults }