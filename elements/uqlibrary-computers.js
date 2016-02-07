(function () {
    Polymer({
        is: 'uqlibrary-computers',
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
            _selectedBranch: {
                type: Object,
                value: null
            },
            _apiLoaded: {
                type: Boolean,
                value: false
            }
        },
        ready: function() {
            var self = this;

            // Add event listener for accounts
            this.$.account.addEventListener('uqlibrary-api-account-loaded', function(e) {
                if (e.detail.hasSession) {
                    if(e.detail.classes) {
                        self.user = e.detail;
                    } else {
                        // Not logged in
                        self.$.account.login(window.location.href);
                    }
                }
            });

            // Add event listener for the Computers API
            this.$.computersApi.addEventListener('uqlibrary-api-computer-availability-loaded', function(e) {
                self.computers = e.detail;
                self._apiLoaded = true;
            });

            if(this.autoLoad){
                this.$.account.get();
                this.$.computersApi.get();
            }
        },
        /**
         * Formats the API return with totals
         * Because of dom-repeat limitations we need to convert the JSON objects to array
         * */
        _computersChanged: function() {
            _.forEach(this.computers, function(item) {
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
        _branchChanged: function() {
            if (this._apiLoaded) {
                this._selectedItem = this.computers[this._branch];
            }
        }
    });
}());
