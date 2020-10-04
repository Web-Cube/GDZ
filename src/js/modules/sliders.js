import "owl.carousel";
import { config } from "../config";
import { defaults } from "./defaults";

/*
 *
 * Data atributes:
 * - settings : object (дополнительные настройки для owl-carousel)
 *
 */

var sliders = {
	selector: ".js-slider",

	settings: {
		items: 1,
		nav: true,
		dots: false,
		loop: true,
		autoplay: false,
		smartSpeed: 600,
		margin: 20,
		navText: [
			'<svg class="icon icon-arrowLeft" viewBox="0 0 12 19"><use xlink:href="/app/icons/sprite.svg#arrowLeft"></use></svg>',
			'<svg class="icon icon-arrowRight" viewBox="0 0 12 19"><use xlink:href="/app/icons/sprite.svg#arrowRight"></use></svg>',
		],
	},

	bar: (el, value) => {
		$(el).find(".owl-progress-bar").css("width", `${value}%`);
	},

	build: (selector) => {
		let data = $(selector).attr("data-settings")
			? $(selector).data("settings")
			: {};

		let clone = JSON.parse(JSON.stringify(sliders.settings));

		let current = Object.assign(clone, data);

		$(selector)
			.addClass("owl-carousel")
			.on("initialized.owl.carousel", (e) => {
				let $slider = $(e.target);
				let $logos = $slider.find(".js-logo:not([style])");

				if ($logos.length) {
					$logos.each((i, el) => {
						if ($(el).hasClass("is-changed")) return false;

						defaults.logoLoading(el);
					});
				}

				// counter
				let $counter = $(e.target).find(".owl-counter");
				let carousel = e.relatedTarget;
				let length = carousel.items().length;
				let current = carousel.relative(carousel.current()) + 1;

				if ($slider.attr("data-progress-bar")) {
					let bar = $slider.data("progress-bar");

					sliders.bar(bar, 100 / (length / current));
					console.log("bar is", bar, 100 / (length / current));
				}

				if ($slider.attr("data-counter")) {
					let counter = $slider.data("counter");
					$(counter).html(
						`<div class="owl-counter"><span class="owl-counter-current">${current}</span>/${length}</div>`
					);
				}
			})

			.on("drag.owl.carousel", (event) => {
				document.ontouchmove = (e) => {
					e.preventDefault();
				};
			})
			.on("dragged.owl.carousel", (event) => {
				document.ontouchmove = (e) => {
					return true;
				};
			})
			.on("changed.owl.carousel", (e) => {
				if (!e.namespace) {
					return;
				}
				let carousel = e.relatedTarget;
				let length = carousel.items().length;
				let current = carousel.relative(carousel.current()) + 1;

				if ($(e.target).attr("data-progress-bar")) {
					let bar = $(e.target).data("progress-bar");

					sliders.bar(bar, 100 / (length / current));

					console.log("bar is", bar, 100 / (length / current));
				}

				if ($(e.target).attr("data-counter")) {
					let counter = $(e.target).data("counter");
					$(counter).find('.owl-counter-current').text(current);
				}
			})
			.owlCarousel(current);
		
	},

	destroy: (selector) => {
		if ($(selector).hasClass("owl-loaded"))
			$(selector)
				.trigger("destroy.owl.carousel")
				.removeClass("owl-carousel");
		$(selector).find(".owl-counter").remove();
	},

	run: (selector) => {
		sliders.build(selector);
	},

	init: () => {
		if (!$(sliders.selector).length) return false;

		$(window).on("load", (e) => {
			$(sliders.selector).each((i, el) => {
				sliders.run(el);
			});
		});
	},
};

export { sliders };