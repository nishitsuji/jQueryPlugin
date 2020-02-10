
/*
Content-Typeは以下を参考にして、text/html or text/plain　を指定すれば良いはず
https://qiita.com/AkihiroTakamura/items/b93fbe511465f52bffaa
*/
var defaults = {

  url            : $(location).attr('protocol') + '//' + $(location).attr('host'),
  path           : '/',
  action         : 'ajax',
  headers        : {
    'X-HTTP-Method-Override': 'GET',
    'Content-Type': 'text/html'
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
        // ここで書き出したい場所の要素指定して、取り出したい要素を突っ込む
        $('#page').empty().append(out_html.filter('#sub')[0].innerHTML);
      }
    },
    error: function(msg){

      // エラーあれば、エラーページなどにリダイレクトする

    }
  });
});

