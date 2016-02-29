(function () {
  Polymer({
    is: 'uqlibrary-computers-compact-list',
    behaviors: [
      Polymer.NeonAnimatableBehavior
    ],
    properties: {
      /** Opening hours of all libraries in JSON format */
      items: {
        type: Array
      },
      animationConfig: {
        type: Object,
        value: function() {
          return {
            'exit': {
              name: 'hero-animation',
              id: 'hero',
              fromPage: this
            }
          };
        }
      }
    },
    listeners: {
      // this event is fired when the animation finishes
      'neon-animation-finish': '_onNeonAnimationFinish'
    },
    ready: function () {

    },
    _showDetailsView: function (event) {
      var target = event.target;
      while (target !== this && !target._templateInstance) {
        target = target.parentNode;
      }

      this.sharedElements = {
        'hero': target
      };

      this.fire('uqlibrary-computers-item-selected', {
        item: event.model.item
      });
    }
  });
}());
