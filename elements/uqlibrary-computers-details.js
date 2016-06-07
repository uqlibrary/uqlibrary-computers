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
      building: {
        type: Object,
        observer: '_buildingChanged'
      },
      _selectedRoom: {
        type: Object
      },
      /**
       * Holds the Google Analytics app name of this component
       */
      gaAppName: {
        type: String,
        value: ''
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
    _buildingChanged: function () {
      // Set image URLs
      this.$$('.image-header').style["background-image"] = "url('"+this.building.image+"')";

      this.fire("uqlibrary-computer-details-loaded", this.building.abbr);
    },

    /**
     * Closes the details view
     * @private
     */
    _showListView: function () {
      this.fire('close');
    },
    /**
     * Show the floor plan in a new window, TODO: show the floor plan in a neon-animated-page
     * @private
     */
    _showFloorPlan: function (e) {
      var room = e.model.item;

      window.open('https://www.library.uq.edu.au/uqlsm/map.php?building=' + this.building.buildingCode + '&room=' + room.item.roomCode, '_blank');

      this.$.ga.addEvent('Navigation', 'Floor plan view of ' + this.building.library + ' ' + room.name);
    }
  });
}());
