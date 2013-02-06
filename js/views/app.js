define([
  'jquery',
  'lodash',
  'backbone',
  'vm',
  'events',
  //'kinetic',
  'text!templates/layout.html',
  'libs/kinetic/kinetic-vcurrent'
], function($, _, Backbone, Vm, Events, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: '.container',
    initialize: function () {
    
      var NestedView2 = Backbone.View.extend({});
      var NestedView1 = Backbone.View.extend({
        initialize: function () {
          var nestedView2 = Vm.create(this, 'Nested View 2', NestedView2);
        }
      });
      var nestedView1 = Vm.create(this, 'Nested View 1', NestedView1);

    },
    render: function () {
      var that = this;
      $(this.el).html(layoutTemplate);
      require(['views/header/menu'], function (HeaderMenuView) {
        var headerMenuView = Vm.create(that, 'HeaderMenuView', HeaderMenuView);
        headerMenuView.render();
      });
      require(['views/footer/footer'], function (FooterView) {
        // Pass the appView down into the footer so we can render the visualisation
        var footerView = Vm.create(that, 'FooterView', FooterView, {appView: that});
        footerView.render();
      });

      //ROOT LAYER
      var stage = new Kinetic.Stage({
        container: 'container',
        width: 1200,
        height: 1200
      });

      var layer = new Kinetic.Layer({
        listening: false
      });

      var g1 = addModule(12,12,60,layer);

      stage.add(layer);

      console.log(layer);

      function addModule(height,width,size,layer) {

        var group = new Kinetic.Group({
            listening: false
        });

        var infoGroup = new Kinetic.Group({
            listening: false
        });

        var pY = 0;

        for (var y = 0;y<height;y++) {

            pY = size*y;

            for (var x = 0;x<width;x++) {

                var boxId = 'x'+x+'y'+y;

                var pX = x*size;
                var box = new Kinetic.Rect({
                    id: boxId,
                    x: pX,
                    y: pY,
                    offset: {
                      x: 0,
                      y: 0
                    },
                    width: size,
                    height: size,
                    fill: 'rgb(0,0,0)',
                    stroke: '#333333',
                    strokeWidth: 1
                  });

                group.add(box);

                var info = new Kinetic.Text({
                    x: pX,
                    y: pY,
                    text: boxId,
                    fill: '#cccccc'
                });

                infoGroup.add(info);

            }

        }


        layer.add(group);
        layer.add(infoGroup);

        return group;

      }

    
    }
  });
  return AppView;
});
