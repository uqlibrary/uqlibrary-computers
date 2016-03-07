(function () {
  Polymer({
    is: 'uqlibrary-computers',
    behaviors: [
      Polymer.NeonAnimationRunnerBehavior
    ],
    properties: {
      /** Opening hours of all libraries in JSON format */
      computers: {
        type: Array,
        observer: "_computersChanged"
      },
      /**
       * Autoloads the library opening hours from the API
       * @type {Boolean}
       */
      autoLoad: {
        type: Object,
        value: true
      },
      /**
       * Renders the element in compact view
       * @type {Boolean}
       */
      compactView: {
        type: Object,
        value: false
      },
      /**
       * Selected branch
       */
      _branch: {
        type: Number,
        value: 0,
        observer: "_branchChanged"
      },
      /**
       * Currently selected branch object
       */
      _selectedBranch: {
        type: Object,
        value: null
      },
      /**
       * Whether the API is loaded
       */
      _apiLoaded: {
        type: Boolean,
        value: false
      },
      /**
       * Whether the computers view is currently in "Details" view
       */
      _detailsView: {
        type: Boolean,
        value: false
      },
      animationConfig: {
        type: Object,
        value: function () {
          return {
            'showDetailsView': [
              { 'name': 'fade-in-animation', node: this.$.details },
              { 'name': 'fade-out-animation', node: this.$.list }
            ],
            'showListView': [
              { 'name': 'fade-out-animation', node: this.$.details },
              { 'name': 'fade-in-animation', node: this.$.list, timing: { delay: 50} }
            ]
          }
        }
      },
      /**
       * Prefix for the google analytics category name. For example: "Home page"
       */
      gaCategoryPrefix: {
        type: String,
        value: '',
        observer: '_gaCategoryPrefixChanged'
      },
      /**
       * Holds the Google Analytics app name of this component
       */
      _gaAppName: {
        type: String,
        value: ''
      }
    },
    listeners: {
      // this event is fired when the animation finishes
      'neon-animation-finish': '_onNeonAnimationFinish'
    },
    ready: function () {
      var self = this;

      // Add event listener for accounts
      this.$.account.addEventListener('uqlibrary-api-account-loaded', function (e) {
        if (e.detail.hasSession) {
          if (e.detail.classes) {
            self.user = e.detail;
          } else {
            // Not logged in
            self.$.account.login(window.location.href);
          }
        }
      });

      // Add event listener for the Computers API
      this.$.computersApi.addEventListener('uqlibrary-api-computer-availability-loaded', function (e) {
        self.setComputers(e.detail);
        self._apiLoaded = true;
      });

      if (this.autoLoad) {
        this.$.account.get();
        this.$.computersApi.get();
      }
    },
    /**
     * Sorts and sets the computers variable
     * @param computers
     */
    setComputers: function (computers) {
      this.computers = _.sortBy(computers, "library");
    },
    /**
     * Formats the API return with totals
     * Because of dom-repeat limitations we need to convert the JSON objects to array
     * */
    _computersChanged: function () {
      _.forEach(this.computers, function (item) {
        item.branches = [];

        // Compute totals and percentages
        var totals = {
          Available: 0,
          Occupied: 0
        };

        _.forEach(item.availability, function (av, name) {
          totals.Available += av.Available;
          totals.Occupied += av.Occupied;
          av.total = av.Available + av.Occupied;

          av.percentage = Math.floor((av.Available / av.total * 100));

          // Add to branches array
          item.branches.push({
            name: name,
            item: av
          });
        });

        totals.total = totals.Available + totals.Occupied;
        totals.percentage = Math.floor((totals.Available / totals.total * 100));
        item.totalAvailability = totals;

        // Fix HTML '&'
        item.library = item.library.replace('&amp;', '&');
      });
      this._apiLoaded = true;

      // Set the item
      this._selectedItem = this.computers[this._branch];

      this.fire('uqlibrary-computers-loaded');
    },
    /** Sets the selected branch when the dropdown changes */
    _branchChanged: function () {
      if (this._apiLoaded) {
        this._selectedItem = this.computers[this._branch];
      }
    },
    /**
     * Catches the click from the LIST VIEW and sets the selected branch
     * @param e
     * @private
     */
    _itemClicked: function (e) {
      this.$.ga.addEvent('Navigation', 'Detail view of ', e.detail.item.library);
      this._selectedItem = e.detail.item;
      this.$$('#pages').selected = 1;
    },
    /**
     * Fired when the user closes the details view
     * @private
     */
    _onClose: function() {
      this.$.ga.addEvent('Navigation', 'List view');
      this.$$('#pages').selected = 0;
    },
    /**
     * Sets the Google Analytics app name
     * @private
     */
    _gaCategoryPrefixChanged: function () {
      this._gaAppName = (this.gaCategoryPrefix ? this.gaCategoryPrefix + ' Computers' : 'Computers');
    }
  });
}());
