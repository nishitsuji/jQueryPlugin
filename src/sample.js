
var defaults = {

  url            : $(location).attr('protocol') + '//' + $(location).attr('host'),
  path           : '/',
  action         : 'ajax',
  headers        : {
    'X-HTTP-Method-Override': 'GET',
    'Content-Type': 'html'
  },

  type           : 'get',
  async: false,
  parameter      : '',
  dataType       : 'json'
};

$(window).on("load", function(){
  $.ajax({

    type: defaults.type,
    url: url,
    headers: defaults.headers,
    async: false,
    data: defaults.parameter,
    dataType: defaults.dataType,

    success: function(responseText ){

      if (!$.isEmptyObject( responseText  )) {
        var out_html = $($.parseHTML(responseText));
        $('#page').empty().append(out_html.filter('#sub')[0].innerHTML);
      }
    },
    error: function(msg){

      // 特に何もしない

    }
  });
});

