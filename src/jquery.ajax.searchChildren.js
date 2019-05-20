(jQuery)(function($) {



    var defaults = {

        url            : $(location).attr('protocol') + '//' + $(location).attr('host'),

        path           : '/',

        action         : 'ajax',

        headers        : {



            'X-HTTP-Method-Override': 'GET',



            'Content-Type': 'application/json'



        },

        type           : 'get',

        async: false,

        parameter      : '',

        dataType       : 'json',

        parent_object  : null,

        children_object  : null

    };







    $.fn.searchChildrenSupplyPoints = function(options) {



        options = $.extend(

            {},

            defaults,

            options

        );



        if ($.isEmptyObject(options.parent_objct)) {

            options.parent_objct = $('#parent');

        }



        if ($.isEmptyObject(options.children_objct)) {

            options.children_objct = $('select');

        }



        var url = options.url;

        url +=  options.path;

        url +=  options.action;



        if (isEmpty(options.parameter)) {

            options.parameter = {'parameters' : options.parent_objct.val()};

        }



        // ajax通信

        $.ajax({

            type: options.type,

            url: url,

            headers: options.headers,

            async: false,

            data: options.parameter,

            dataType: options.dataType,

            success: function(responseText ){

            	if (!$.isEmptyObject( responseText  )) {

            		// optionのempty用文言をバックアップ

            		var emptyText = null;

            		var obj = options.children_objct.children().eq(0);

            		if ( obj.val() == null ||  obj.val() == "" ) {

            			emptyText = obj.text();

            		}



                	// option を初期化

                	optionsRemove(options.children_objct);



                	if (!isEmpty(emptyText)) {

                		options.children_objct.append(

                                $('<option>').text(emptyText));

                	}



            		// select optionの設定

                    setOptions (options.children_objct, responseText);

            	}

            },

            error: function(msg){

            	// 特に何もしない

            }

        });

    };



    /**
	 *
	 *
	 *
	 * select Option を設定する
	 *
	 *
	 *
	 * @param target
	 *            エリア
	 *
	 *
	 *
	 * @param options
	 *            {@link #filteredChildren()}で絞込を行ったJson Code
	 *
	 *
	 *
	 */

    var setOptions = function (target, json) {

         $.each(json, function(index, elem) {

             target.append(

                 $('<option>').val(String(index)).text(elem));

         });



    };



    /**
	 *
	 * optioの削除
	 *
	 * @param target
	 *            Tag要素
	 *
	 */

	 var optionsRemove = function (target) {

		 $('select#'+ target.attr("id") + ' option').remove();

	 };



    var isEmpty = function(val){return !val?!(val===0||val===false)?true:false:false;}



});

