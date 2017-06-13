import "./analytics.js";
import $ from "jquery";
import "./jquery-color.js";
$(document).ready(function() {
  $("nav a").on('activate.bs.scrollspy', function () {
    $(this).css("color", "#fefeff");
  });
  $(".responsive").each(function() {
    if ($(this).children("img").width() > $(this).width()) {
      $(this).children("img").css("width", "80%");
    } else {
      $(this).children("img").addClass("logo");
    }
  });
  let arr, greatest, card;
  $(".sameheight").each(function() {
    arr = [];
    card = $(this).find(".card");
    card.each(function() {
      arr.push($(this).height());
    });
    greatest = 20 + Math.max.apply(null, arr);
    card.children().not("h3").addClass("invisible");
  });
  const smallest = $(".card").first().height();
  let scroll, min, max, height;
  $(window).scroll(function() {
    scroll = $(window).scrollTop();
    if (scroll < $("#home").height() && $("nav").hasClass("inverted")) {
      $("nav").animate({
        backgroundColor: "#fefeff",
        color: "#1e2749"
      }, function() {
        $("nav").toggleClass("normal inverted");
      });
    } else if (scroll < $("#home").height() + $("#skillset").height()) {
      if ($("nav").hasClass("normal")) {
        $("nav").animate({
          backgroundColor: "#1e2749",
          color: "#fefeff"
        }, function() {
          $("nav").toggleClass("normal inverted");
        });
      }
      height = $(window).height();
      min = scroll + height * .2;
      max = scroll + height * .7;
      $(".card").each(function(){
        if (min < $(this).offset().top && max > $(this).offset().top) {
          if ($(this).children().last().hasClass("invisible")) {
            $(this).animate({
              height: greatest
            }, function() {
              $(this).children().not("h3").removeClass("invisible");
            });
          }
        } else if (!$(this).children().last().hasClass("invisible")) {
          $(this).animate({
            height: smallest
          }, function() {
            $(this).children().not("h3").addClass("invisible");
          });
        }
      });
    }
  });
  let id, target;
  $("#nav a").click(function(){
    id = $(this).attr("href");
    $(window).animate(
      {
        scrollTop: $(id).offset().top
      }, 2000);
  });
});
