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

      self.render();
    },

    render: function() {
      this.$events_list.html(events_template({events: this.collection}));
    }
  } // Events

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
  });

  $.ajax({
    url: "/events",

    success: function(events) {
      Events.add(events);
    }
  });
});
