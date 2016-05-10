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
       * Currently selected branch object
       */
      _selectedItem: {
        type: Object
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
      },
      /**
       * Required. Whether the app should start in standalone mode or not.
       * @type Boolean
       */
      standAlone: {
        type: Object,
        value: true
      },
      /**
       * Header title - application name
       */
      headerTitle: {
        type: String,
        value: 'Computers'
      },
      /**
       * Holds the selected page for the full view
       */
      _selectedPage: {
        type: Number,
        value: 0,
        observer: '_selectedPageChanged'
      },
      /**
       * Whether we should show the back button
       */
      _backEnabled: {
        type: Boolean,
        value: false
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
      if (!computers || computers.length == 0) return;

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
      this._selectedItem = this.computers[0];

      this.fire('uqlibrary-computers-loaded');
    },
    /**
     * Catches the click from the LIST VIEW and sets the selected branch
     * @param e
     * @private
     */
    _itemClicked: function (e) {
      this.$.ga.addEvent('Navigation', 'Detail view of ' + e.detail.item.library);
      this._selectedItem = e.detail.item;
      this._selectedPage = 1;
    },
    /**
     * Fired when the user closes the details view
     * @private
     */
    _onClose: function() {
      this.$.ga.addEvent('Navigation', 'List view');
      this._selectedPage = 0;
    },
    /**
     * Sets the Google Analytics app name
     * @private
     */
    _gaCategoryPrefixChanged: function () {
      this._gaAppName = (this.gaCategoryPrefix ? this.gaCategoryPrefix + ' Computers' : 'Computers');
    },
    /**
     * Toggles the drawer panel of the main UQL app
     * @private
     */
    _toggleDrawerPanel: function () {
      this.fire('uqlibrary-toggle-drawer');
    },
    /**
     * Back button clicked
     * @private
     */
    _goBack: function () {
      this._selectedPage = 0;
    },
    /**
     * Called when the selectedPage changes
     * @private
     */
    _selectedPageChanged: function () {
      this._backEnabled = (this._selectedPage > 0);
    }
  });
}());
