(function () {
  Polymer({
    is: 'uqlibrary-computers-floorplan',
    behaviors: [
      Polymer.NeonAnimatableBehavior
    ],
    properties: {
      /**
       * Library object
       */
      building: {
        type: Object
      },
      room: {
        type: Object,
        observer: '_roomChanged'
      },
      compact: {
        type: Object
      },
      /**
       * Whether to show the floorplan iframe
       */
      _showFloorPlan: {
        type: Boolean,
        value: false
      },
      /**
       * Source of the floor plan
       */
      _floorPlanSource: {
        type: String,
      }
    },
    _roomChanged: function () {
      // Set image URLs
      this.$$('.image-header').style["background-image"] = "url('"+this.building.image+"')";

      // Set floorplan URL
      this._floorPlanSource = this._getFloorPlanUrl();
      if (this._floorPlanSource === false) {
        this._showFloorPlan = false;
      } else {
        this._showFloorPlan = true;
      }

      this.fire("uqlibrary-computer-details-loaded", this.building.abbr);
    },
    /**
     * Generate the floor plan api url
     * @private
     */
    _getFloorPlanUrl: function () {
      if (this.building.buildingCode && this.room.item.roomCode) {
        return 'https://www.library.uq.edu.au/uqlsm/map.php?building=' + this.building.buildingCode + '&room=' + this.room.item.roomCode;
      } else {
        return '';
      }
    },
    _showDetailsView: function () {
      this.fire('close');
    }
  });
}());
