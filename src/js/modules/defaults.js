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
		
		$('.js-more-btn').click(function(){
			$(this).toggleClass("is-active");
			$('.js-more-text').toggleClass('is-open');
			return false;
		});
		
		$('.js-accordion-head').click(function(){
			$(this).parent().toggleClass('is-active');
		});
		
		
		$('.accordion__list').each(function () {
			var accordList = $(this);
			accordList.find('.accordion__number').each(function () {
				if ($.trim($(this).html()).length >= 6) {
					$(this).parent().addClass('is-row');
				}
			});
		});
		
		// search book
		$('.js-search-lesson').on('input', function () {
			$('.js-accordion-item').removeClass('is-active');
			$('.js-accordion-body').removeAttr('style');
			$('.accordion__list > .accordion__list-item').css({ display: 'block' });

			var query = $.trim($(this).val()).toLowerCase();

			if (query !== '') {
				$('.accordion .accordion__number').each(function () {
					
					var html = $(this).html();
					
					if ( $(this).parent().hasClass('is-row') && $(this).find('.accordion__text').length ) {
						html = $(this).find('.accordion__text').html();
					}
					
					var name = $.trim(html).toLowerCase();

					if (name.includes(query)) {
						$(this).parents('.js-accordion-body').each(function () {
							$(this).css({ display: 'block' });

							if (!$(this).closest('.js-accordion-item').hasClass('is-active')) {
								$(this).closest('.js-accordion-item').addClass('is-active');
							}
						});
						$(this).parent().css({ display: 'block' });
					} else {
						$(this).parent().css({ display: 'none' });
					}
				});
			}
		});
		
		// Select
		
		$('.js-select').click(function(){
			$(this).toggleClass("is-active");
		});
		
		$('.js-select-item').click(function(){
			let value = $(this).text();
			$(this).closest('.js-select').find('.js-select-input').val(value);
			$(this).closest('.js-select').find('.js-select-label').text(value);
		});
		
		$('.js-lang').click(function(){
			$(this).parent().find('.js-lang.is-active').removeClass('is-active');
			$(this).addClass('is-active');
		});
		

	}
}

export { defaults }