var ringer = {
  //countdown_to: "10/31/2014",
  countdown_to: "Dec 3, 2023 6:00:00",
  rings: {
    DAYS: {
      s: 86400000, // mseconds in a day,
      max: 365,
    },
    HOURS: {
      s: 3600000, // mseconds per hour,
      max: 24,
    },
    MINUTES: {
      s: 60000, // mseconds per minute
      max: 60,
    },
    SECONDS: {
      s: 1000,
      max: 60,
    },
  },

  r_count: 4,
  r_spacing: 20, // px
  r_size: 100, // px
  r_thickness: 4, // px
  update_interval: 100, // ms

  draw: function () {
    $r = ringer;

    $r.cvs = document.getElementById("countdown");

    $r.size = {
      w:
        ($r.r_size + $r.r_thickness) * $r.r_count +
        $r.r_spacing * ($r.r_count - 1),
      h: $r.r_size + $r.r_thickness,
    };

    $r.cvs.setAttribute("width", $r.size.w);
    $r.cvs.setAttribute("height", $r.size.h);
    $r.ctx = $r.cvs.getContext("2d");
    // $(document.body).append($r.cvs);
    $r.cvs = $($r.cvs);
    $r.ctx.textAlign = "center";
    $r.actual_size = $r.r_size + $r.r_thickness;
    $r.countdown_to_time = new Date($r.countdown_to).getTime();
    $r.cvs.css({ width: $r.size.w + "px", height: $r.size.h + "px" });
    $r.go();
  },

  redraw: function (screenWidth) {
    $r = ringer;

    $r.r_spacing = (screenWidth * 20) / 1000;
    $r.r_size = (screenWidth * 100) / 1000;
    $r.r_thickness = (screenWidth * 4) / 1000;

    $r.draw();
  },

  ctx: null,

  go: function () {
    var idx = 0;

    $r.time = new Date().getTime() - $r.countdown_to_time;

    for (var r_key in $r.rings) $r.unit(idx++, r_key, $r.rings[r_key]);

    setTimeout($r.go, $r.update_interval);
  },

  unit: function (idx, label, ring) {
    var x,
      y,
      value,
      ring_secs = ring.s;
    value = parseFloat($r.time / ring_secs);
    $r.time -= Math.round(parseInt(value)) * ring_secs;
    value = Math.abs(value);

    x = $r.r_size * 0.5 + $r.r_thickness * 0.5;
    x += +(idx * ($r.r_size + $r.r_spacing + $r.r_thickness));
    y = $r.r_size * 0.5;
    y += $r.r_thickness * 0.5;

    // calculate arc end angle
    var degrees = 360 - (value / ring.max) * 360.0;
    var endAngle = degrees * (Math.PI / 180);

    $r.ctx.save();

    $r.ctx.translate(x, y);
    $r.ctx.clearRect(
      $r.actual_size * -0.5,
      $r.actual_size * -0.5,
      $r.actual_size,
      $r.actual_size
    );

    // first circle
    $r.ctx.strokeStyle = "rgba(128,128,128,0.2)";
    $r.ctx.beginPath();
    $r.ctx.arc(0, 0, $r.r_size / 2, 0, 2 * Math.PI, 2);
    $r.ctx.lineWidth = $r.r_thickness;
    $r.ctx.stroke();

    // second circle
    $r.ctx.strokeStyle = "rgba(253, 128, 1, 0.9)";
    $r.ctx.beginPath();
    $r.ctx.arc(0, 0, $r.r_size / 2, 0, endAngle, 1);
    $r.ctx.lineWidth = $r.r_thickness;
    $r.ctx.stroke();

    // label
    $r.ctx.fillStyle = "hsla(0, 0%, 20%, 1)";

    $r.ctx.font = "0.75rem Lora";
    $r.ctx.fillText(label, 0, 28);

    $r.ctx.font = "bold 3.125rem Lora";
    $r.ctx.fillText(Math.floor(value), 0, 10);

    $r.ctx.restore();
  },
};

// function draw() {
//   var screenWidth = window.innerWidth;
//   // var screenHeight = window.innerHeight;

//   if (screenWidth < 968) {
//     ringer.redraw(screenWidth);
//   }
// }

// ringer.draw();

// Register an event listener to call the resizeCanvas() function
// each time the window is resized.
// window.addEventListener("resize", draw, true);
