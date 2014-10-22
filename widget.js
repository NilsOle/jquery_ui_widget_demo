String.prototype.inArray = function (haystack) {
    var needle = this.toString();
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] === needle) return true;
    }
    return false;
};

$.widget("webworker.party", {

    options: {
        guests: [ ],
        blacklist: [ ],
        music_url: "http://www.dailymotion.com/video/x39svl_house-of-pain-jump-around_music",
        motto: "What a party!",
        background_url: "http://i.imgur.com/2Pq7mU3.jpg",
        partystarter: ""
    },

    _create: function () {
        var startparty = 0;
        $(this.element).css('backgroundColor', '#000000').append(
            $('<h1></h1>', {text: this.options.motto, css: { "color": "#FFFFFF" }})
        );
        if ((this.options.partystarter !== "" && this.options.partystarter.inArray(this.options.guests) ) || this.options.partystarter === "") {
            startparty = 1;
        }
        this._trigger('partyopen', this, null);
        if (startparty === 1) {
            this._startparty();
        }
    },

    addGuest: function (guest) {
        if (guest.inArray(this.options.blacklist)) {
            this._trigger('reject', this, {name: guest});
            return false;
        }
        if (guest.inArray(this.options.guests)) {
            return false;
        }
        this.options.guests[this.options.guests.length] = guest;
        this._trigger('newguest', this, {name: guest});
        $(this.element).append(
            $('<div></div>', {text: guest, css: { 'backgroundColor': '#FFFFFF', 'width': '100px' }})
        );
        if (guest === this.options.partystarter) {
            this._startparty();
        }
        return true;
    },

    _startparty: function () {
        $(this.element).css('backgroundImage', 'url(' + this.options.background_url + ')');
        $(this.element).append(
            $('<iframe></iframe>', { "src": this.options.music_url, "scrolling": "auto", "frameborder": "0", name: "music", "width": "1", "height": "1"})
        );
        this._trigger('partystart', this, {name: this.options.partystarter});
    }

});