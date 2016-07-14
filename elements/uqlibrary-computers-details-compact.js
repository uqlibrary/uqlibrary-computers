(function () {
  Polymer({
    is: 'uqlibrary-computers-details-compact',
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
      /**
       * Room / level
       */
      room: {
        type: Object,
        notify: true
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
     * Show the floor plan in a new window
     * @private
     */
    _showFloorPlan: function (e) {
      if (e.model.item.floorplan) {
        this.room = e.model.item;
        this.fire('floorplan');

        this.$.ga.addEvent('Navigation', 'Floor plan view of ' + this.building.library + ' ' + this.room.name);
      }
    }
  });
}());
