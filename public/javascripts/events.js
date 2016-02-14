$(function() {
  var event_template = Handlebars.compile($("#event").html()),
      events_template = Handlebars.compile($("#events").html());

  Handlebars.registerPartial("event", $("#event").html());

  var Events = {
    collection: [],
    $events_list: $("#events_list"),

    add: function (events) {
      var self = this;
      events = _.isArray(events) ? events : [events]

      events.forEach(function(event) {
        self.collection.push(event);
      });
      self.sort();
      self.render();
    },

    remove: function(idx) {
      var model = _(this.collection).findWhere({id: idx});
      if (!model) { return; }

      this.collection = this.collection.filter(function(existing_model) {
        return existing_model.id !== model.id;
      });
      
      this.sort();
      this.render();
    },

    sort: function() {
      this.collection.sort(function(a, b) {
        if (a.date < b.date) { return -1 };
        if (a.date > b.date) { return 1 };
        return 0;
      });
    },

    render: function() {
      this.$events_list.html(events_template({events: this.collection}));
    }
  } // Events

  Events.$events_list.on("click", "a.remove", function(e) {
    e.preventDefault();
    var idx = +$(e.target).closest("li").attr("data-id");

    Events.remove(idx);
    $.ajax({
      url: "events/delete",
      type: "post",
      data: "id=" + idx
    });
  });

  $("form").on("submit", function(e) {
    e.preventDefault();
    var $f = $(this);

    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: $f.serialize(),

      success: function(event) {
        Events.add(event);
      }

    })
  }); // form submit



  // load initial data
  $.ajax({
    url: "/events",

    success: function(events) {
      Events.add(events);
    }
  });
});
