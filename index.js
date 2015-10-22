var $hk = $(".h-k"); // Ê®Íò
var $tk = $(".t-k"); // Íò
var $k = $(".k"); // Ç§
var $h = $(".h"); // °Ù
var $t = $(".t"); // Ê®
var $single = $(".single"); // ¸ö
var $td = $(".t-d"); // Ê®·ÖÎ»
var $hd = $(".h-d"); // °Ù·ÖÎ»
var $comma = $(".comma.sign");
var $dot = $(".dot.sign");

var data = {
  numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
  targetClass: {
    "hk": $hk,
    "tk": $tk,
    "k": $k,
    "h": $h,
    "t": $t,
    "single": $single,
    "td": $td,
    "hd": $hd
  },
  zero: {
    hk: 0,
    tk: 0,
    k: 0,
    h: 0,
    t: 0,
    single: 0,
    td: 0,
    hd: 0
  },
  numbersTmp: ""
};

(function (){
  function numberDiv(num){
    return "<div class='" + data.numbers[num] + "'>" + num + "</div>";
  }
  
  for(var i = 0; i < 10; i ++) {
    data.numbersTmp += numberDiv(i);
  }
  
  $(".price-div .number").append("<div class='numbers-view'>" + data.numbersTmp + "</div>");
})();

function priceToObj(price){
  if(price == 0) {
    return data.zero;
  }
  var obj = {};
  obj.hd = parseInt((price.mul(100)) % 10);
  obj.td = parseInt((price.mul(10)) % 10);
  obj.single = parseInt(price % 10);
  obj.t = parseInt((price.div(10)) % 10);
  obj.h = parseInt((price.div(100)) % 10);
  obj.k = parseInt((price.div(1000)) % 10);
  obj.tk = parseInt((price.div(10000)) % 10);
  obj.hk = parseInt((price.div(100000)) % 10);
  return obj;
}

function objToPrice(obj) {
  return obj.hk.mul(100000).add(obj.tk.mul(10000))
      .add(obj.k.mul(1000)).add(obj.h.mul(100))
      .add(obj.t.mul(10)).add(obj.single)
      .add(obj.td.div(10)).add(obj.hd.div(100));
}

$.fn.extend({
  scrollToNumber: function(num, pos){
    var $this = $(this);
    var target = data.numbers[num];

    $this.find(".numbers-view").stop(true, true);

    var top = num * $this.find(".zero").height();
    var currentTop = -parseFloat($this.find(".numbers-view").css("marginTop").split("px")[0]);
    
    if(top == currentTop) {
      return;
    } else if(currentTop < top) {
      $this.find(".numbers-view").animate({marginTop: -top}, 1500, "swing");
    } else {
      $this.find(".numbers-view").append($(data.numbersTmp).addClass("temp"));
      top = $this.find("." + target + ".temp").offset().top - $this.find(".numbers-view").offset().top;
      
      $this.find(".numbers-view").animate({marginTop: -top}, 1500, "swing", function(){
        if($this.find(".zero").size() > 1) {
          var top = $this.find("." + target + ":not(.temp)").first().offset().top - $this.find(".numbers-view").offset().top;
          $this.find(".numbers-view").css({marginTop: -top});
          $this.find(".numbers-view .temp").remove();
        }
      });
    }
  }
})

$.animateToPrice = function(price){
  var obj = priceToObj(price);
  
  $.each(obj, function(key, value){
    data.targetClass[key].scrollToNumber(value, key);
  });
};

var number = 0;
$(".animate-btn").on("click", function(){
  number = number + parseFloat((Math.random() * 1000).toFixed(2));
  $.animateToPrice(number);
});