(function () {
  Polymer({
    is: 'uqlibrary-computers-details',
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
      animationConfig: {
        type: Object,
        value: function() {
          return {
            'entry': {
              name: 'slide-from-right-animation',
              node: this
            },
            'exit': {
              name: 'slide-right-animation',
              node: this
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

      this.fire("uqlibrary-computer-details-loaded", this.item.abbr);
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
