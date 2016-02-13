$(function() {
  var event_template = Handlebars.compile($("#event").html()),
      events_template = Handlebars.compile($("#events").html());

  Handlebars.registerPartial("event", $("#event").html());

  var Events = {
    render: function(events) {
      $("#events_list").html(events_template({events: events}));
    }
  }

    $.ajax({
      url: "/events",

      success: function(data) {
        Events.render(data);
      }
    })
});
