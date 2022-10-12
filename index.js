$(document).ready(function () {
  // string formatting function
  String.prototype.format = function () {
    var i = 0,
      args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != "undefined" ? args[i++] : "";
    });
  };

  var disUnit = "meters";
  var hourVal = 0;
  var minVal = 0;
  var secVal = 0;
  var disVal = 0;

  var outputData = function (tps) {
    $("#output").empty();
    let unitMessage =
      "<h4>Unit: {} | below is your splits | format H:mm:ss </h4>".format(
        disUnit
      );
    let hundredMeters = "<h4>100 Meters: {} </h4>".format(
      timeConversion(100, tps)
    );
    let twoHundredMeters = "<h4>200 Meters: {} </h4>".format(
      timeConversion(200, tps)
    );
    let fourHundredMeters = "<h4>400 Meters: {} </h4>".format(
      timeConversion(400, tps)
    );
    let eightHundredMeters = "<h4>800 Meters: {} </h4>".format(
      timeConversion(800, tps)
    );
    let oneMile = "<h4>1600 Meters/1 Mile: {} </h4>".format(
      timeConversion(1600, tps)
    );
    let oneK = "<h4>1000m: {} </h4>".format(timeConversion(1000, tps));
    let fiveK = "<h4>5000m: {} </h4>".format(timeConversion(5000, tps));
    let tenK = "<h4>10km: {} </h4>".format(timeConversion(10000, tps));
    let halfMarathon = "<h4>21.1 km/13.1 Miles: {} </h4>".format(
      timeConversion(21097.5, tps)
    );
    let Marathon = "<h4>42.2 km/26.2 Miles: {} </h4>".format(
      timeConversion(42195, tps)
    );

    $("#output").append(unitMessage);
    $("#output").append(hundredMeters);
    $("#output").append(twoHundredMeters);
    $("#output").append(fourHundredMeters);
    $("#output").append(eightHundredMeters);
    $("#output").append(oneMile);
    $("#output").append(oneK);
    $("#output").append(fiveK);
    $("#output").append(tenK);
    $("#output").append(halfMarathon);
    $("#output").append(Marathon);
  };
  // convert the second back to a readable format
  var timeConversion = function (dis, tps) {
    var date = new Date(null);
    date.setSeconds(dis / tps); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);
    return result;
  };
  var calculateSplits = function (time) {
    // unit coversion to all meters
    switch (disUnit) {
      case "kilometers":
        disVal = disVal * 1000;
        break;
      case "miles":
        disVal = disVal / 0.00062137;
        break;
      case "feet":
        disVal = disVal / 3.2808;
        break;
    }
    outputData(disVal / time);
  };
  // check for input error
  var isVaildInput = function () {
    if (hourVal > 24 || hourVal < 0) {
      alert("Hours input incorrect");
      return 0;
    }
    if (minVal > 59 || minVal < 0) {
      alert("Minutes input incorrect");
      return 0;
    }
    if (secVal > 59 || secVal < 0) {
      alert("Seconds input incorrect");
      return 0;
    }
    if (disVal < 0) {
      alert("You can't run negative distance :)");
      return 0;
    }
    if (
      Number.isNaN(hourVal) ||
      Number.isNaN(minVal) ||
      Number.isNaN(secVal) ||
      Number.isNaN(disVal)
    ) {
      alert("Some inputs are empty");
      return 0;
    }
    if ((hourVal == 0) & (secVal == 0) & (minVal == 0)) {
      alert("You time input is all 0");
      return 0;
    }
    return 1;
  };
  $("#calculate").click(function () {
    hourVal = parseFloat($("#hours").val());
    minVal = parseFloat($("#mins").val());
    secVal = parseFloat($("#secs").val());
    disVal = parseFloat($("#distance").val());
    //calculate total time
    if (isVaildInput() == 1) {
      let ttTime = hourVal * 60 * 60 + minVal * 60 + secVal;
      calculateSplits(ttTime);
    }
  });
  $(".dropdown-menu a").click(function () {
    disUnit = $(this).text();
    alert("Unit is now {}".format(disUnit));
  });
});
