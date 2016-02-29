(function () {
  Polymer({
    is: 'uqlibrary-computers-compact-details',
    behaviors: [
      Polymer.NeonAnimatableBehavior
    ],
    properties: {
      /**
       * Library object
       */
      item: {
        type: Object,
        observer: '_itemChanged'
      },
      _image: {
        type: String
      },
      sharedElements: {
        type: Object,
        value: function() {
          return {
            'hero': this.$.main
          };
        }
      },
      animationConfig: {
        type: Object,
        value: function() {
          return {
            'entry': {
              name: 'hero-animation',
              id: 'hero',
              toPage: this
            },
            'exit': {
              name: 'scale-down-animation',
              node: this.$.main,
              transformOrigin: '50% 50%',
              axis: 'y'
            }
          }
        }
      }
    },
    /**
     * Fired whenever the detail item changes
     * @private
     */
    _itemChanged: function () {
      // Set image URLs
      this.$$('.image-header').style["background-image"] = "url('"+this.item.image+"')";
    },
    /**
     * Closes the details view
     * @private
     */
    _showListView: function () {
      this.fire('close');
    }
  });
}());
