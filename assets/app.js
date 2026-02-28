(function () {
  "use strict";

  var DISPATCH_LOCATIONS = [
    { road: "Popular Street", district: "Strawberry", area: "Los Santos" },
    { road: "San Andreas Avenue", district: "Textile City", area: "Los Santos" },
    { road: "Vespucci Boulevard", district: "Little Seoul", area: "Los Santos" },
    { road: "Vinewood Boulevard", district: "Downtown Vinewood", area: "Los Santos" },
    { road: "Alta Street", district: "Pillbox Hill", area: "Los Santos" },
    { road: "Power Street", district: "Downtown", area: "Los Santos" },
    { road: "Elgin Avenue", district: "Mission Row", area: "Los Santos" },
    { road: "Occupation Avenue", district: "Downtown", area: "Los Santos" },
    { road: "Hawick Avenue", district: "Hawick", area: "Los Santos" },
    { road: "Spanish Avenue", district: "Burton", area: "Los Santos" },
    { road: "West Eclipse Boulevard", district: "Burton", area: "Los Santos" },
    { road: "Eclipse Boulevard", district: "West Vinewood", area: "Los Santos" },
    { road: "Milton Road", district: "Rockford Hills", area: "Los Santos" },
    { road: "North Rockford Drive", district: "Rockford Hills", area: "Los Santos" },
    { road: "Portola Drive", district: "Rockford Hills", area: "Los Santos" },
    { road: "Mad Wayne Thunder Drive", district: "Vinewood Hills", area: "Los Santos" },
    { road: "Heritage Way", district: "Vinewood Hills", area: "Los Santos" },
    { road: "Baytree Canyon Road", district: "Vinewood Hills", area: "Los Santos" },
    { road: "Movie Star Way", district: "Vinewood", area: "Los Santos" },
    { road: "Palomino Avenue", district: "Strawberry", area: "Los Santos" },
    { road: "Strawberry Avenue", district: "Strawberry", area: "Los Santos" },
    { road: "Adams Apple Boulevard", district: "Pillbox Hill", area: "Los Santos" },
    { road: "Carson Avenue", district: "Davis", area: "Los Santos" },
    { road: "Innocence Boulevard", district: "Davis", area: "Los Santos" },
    { road: "Davis Avenue", district: "Davis", area: "Los Santos" },
    { road: "Forum Drive", district: "Chamberlain Hills", area: "Los Santos" },
    { road: "Jamestown Street", district: "Rancho", area: "Los Santos" },
    { road: "Brouge Avenue", district: "Rancho", area: "Los Santos" },
    { road: "Olympic Freeway", district: "La Mesa", area: "Los Santos" },
    { road: "Capital Boulevard", district: "La Mesa", area: "Los Santos" },
    { road: "Amarillo Vista", district: "La Mesa", area: "Los Santos" },
    { road: "Exceptionalists Way", district: "Los Santos International Airport", area: "Los Santos" },
    { road: "New Empire Way", district: "Los Santos International Airport", area: "Los Santos" },
    { road: "Greenwich Parkway", district: "La Puerta", area: "Los Santos" },
    { road: "Dutch London Street", district: "La Puerta", area: "Los Santos" },
    { road: "Signal Street", district: "Cypress Flats", area: "Los Santos" },
    { road: "Chum Street", district: "Murrieta Heights", area: "Los Santos" },
    { road: "Del Perro Freeway", district: "Del Perro", area: "Los Santos County" },
    { road: "Great Ocean Highway", district: "North Chumash", area: "Los Santos County" },
    { road: "Banham Canyon Drive", district: "Banham Canyon", area: "Los Santos County" },
    { road: "Tongva Drive", district: "Tongva Hills", area: "Los Santos County" },
    { road: "Buen Vino Road", district: "Richman Glen", area: "Los Santos County" },
    { road: "Route 68", district: "Grand Senora Desert", area: "Blaine County" },
    { road: "Joshua Road", district: "Sandy Shores", area: "Blaine County" },
    { road: "East Joshua Road", district: "Sandy Shores", area: "Blaine County" },
    { road: "Panorama Drive", district: "Harmony", area: "Blaine County" },
    { road: "Marina Drive", district: "Sandy Shores", area: "Blaine County" },
    { road: "Paleto Boulevard", district: "Paleto Bay", area: "Blaine County" },
    { road: "Procopio Drive", district: "Paleto Bay", area: "Blaine County" },
    { road: "Grapeseed Avenue", district: "Grapeseed", area: "Blaine County" },
    { road: "Senora Freeway", district: "Braddock Pass", area: "Blaine County" },
    { road: "Zancudo Avenue", district: "Harmony", area: "Blaine County" },
    { road: "Cat-Claw Avenue", district: "Sandy Shores", area: "Blaine County" },
    { road: "Algonquin Boulevard", district: "Sandy Shores", area: "Blaine County" },
    { road: "Lesbos Lane", district: "Paleto Bay", area: "Blaine County" },
    { road: "Duluoz Avenue", district: "Paleto Bay", area: "Blaine County" },
    { road: "Cascabel Avenue", district: "Grapeseed", area: "Blaine County" },
    { road: "Calafia Road", district: "Raton Canyon", area: "Blaine County" },
    { road: "Nowhere Road", district: "Grand Senora Desert", area: "Blaine County" }
  ];

  var DISPATCH_CALLS = [
    {
      title: "Suspicious Vehicle",
      priority: "Priority 2",
      summary: "Occupied vehicle has been sitting too long with lights off. Make contact and verify the driver.",
      response: "Low-risk contact, run the plate, and document the stop if nothing escalates."
    },
    {
      title: "Reckless Driving",
      priority: "Priority 2",
      summary: "Caller reports a high-speed vehicle weaving through traffic and crossing lanes without signaling.",
      response: "Stage ahead of the route, confirm the vehicle, and coordinate a safe stop."
    },
    {
      title: "Burglary Alarm",
      priority: "Priority 2",
      summary: "Commercial alarm activation with no keyholder on scene. Check entries and nearby foot traffic.",
      response: "Clear the perimeter first, then conduct a methodical exterior check."
    },
    {
      title: "Fight In Progress",
      priority: "Priority 1",
      summary: "Multiple subjects are reportedly arguing and shoving outside a storefront. Scene may still be active.",
      response: "Approach with another unit if available and separate involved parties early."
    },
    {
      title: "Shots Heard",
      priority: "Priority 1",
      summary: "Residents report possible gunfire in the area with no confirmed suspect description yet.",
      response: "Secure the area, check for injured civilians, and canvass for witnesses."
    },
    {
      title: "Traffic Stop Escalation",
      priority: "Priority 2",
      summary: "A routine stop has turned non-compliant and the driver is refusing clear verbal commands.",
      response: "Set a containment angle, request backup, and slow the encounter down."
    },
    {
      title: "Stolen Vehicle Ping",
      priority: "Priority 1",
      summary: "A flagged vehicle was seen passing through the area moments ago. Last known direction is still fresh.",
      response: "Confirm the plate before contact and be ready to transition into pursuit procedures."
    },
    {
      title: "Suspicious Person",
      priority: "Priority 3",
      summary: "Caller reports a subject checking vehicle doors and lingering near private property.",
      response: "Make a calm field interview and confirm whether any trespass or attempted theft occurred."
    },
    {
      title: "Disturbance Call",
      priority: "Priority 2",
      summary: "Neighbors report yelling, loud banging, and at least two subjects causing a scene.",
      response: "Approach quietly, identify the main aggressor, and stabilize the scene before interviews."
    },
    {
      title: "Illegal Parking Complaint",
      priority: "Priority 4",
      summary: "Caller says a vehicle is blocking access and has been left unattended for an extended period.",
      response: "Confirm the violation, attempt owner contact, and tow if the vehicle qualifies."
    },
    {
      title: "Store Panic Button",
      priority: "Priority 1",
      summary: "A silent hold-up alarm was triggered from a local business with no callback available.",
      response: "Set perimeter positions, avoid driving straight to the front, and wait for a coordinated approach."
    },
    {
      title: "Hit And Run",
      priority: "Priority 2",
      summary: "A vehicle struck a parked car and fled before the owner could make contact.",
      response: "Collect witness descriptions, check nearby cameras, and broadcast the suspect vehicle."
    },
    {
      title: "Public Intoxication",
      priority: "Priority 3",
      summary: "Caller reports an unsteady subject yelling at pedestrians and stumbling into traffic.",
      response: "Slow the contact down, assess medical need first, and move the subject out of traffic."
    },
    {
      title: "Vehicle Fire",
      priority: "Priority 1",
      summary: "Smoke and open flame are visible from a stopped vehicle on the shoulder.",
      response: "Shut down the lane, keep bystanders back, and stage for fire support."
    },
    {
      title: "Trespassing Complaint",
      priority: "Priority 3",
      summary: "Property owner reports a subject lingering on private land after being told to leave.",
      response: "Confirm the complainant wants enforcement and make clear contact with the trespasser."
    },
    {
      title: "Road Rage Incident",
      priority: "Priority 2",
      summary: "Two drivers are out of their vehicles and confronting each other in live traffic.",
      response: "Separate the drivers immediately and prevent the scene from spilling into traffic lanes."
    },
    {
      title: "Armed Robbery Report",
      priority: "Priority 1",
      summary: "Caller reports a subject displayed a handgun during a street robbery and fled on foot.",
      response: "Lock down nearby exits, get the victim secure, and broadcast clothing and direction."
    },
    {
      title: "Assault Just Occurred",
      priority: "Priority 1",
      summary: "Victim says they were attacked moments ago and the suspect is still nearby.",
      response: "Prioritize victim safety, control the suspect if visible, and secure witness statements."
    },
    {
      title: "Knife Call",
      priority: "Priority 1",
      summary: "A subject is reportedly brandishing a knife and pacing in public.",
      response: "Keep distance, slow the tempo, and set a crossfire-free contact plan."
    },
    {
      title: "Possible DUI Driver",
      priority: "Priority 2",
      summary: "Caller describes a vehicle drifting within lanes and nearly striking the curb repeatedly.",
      response: "Shadow the vehicle, confirm impairment indicators, and pick a controlled stop location."
    },
    {
      title: "Street Racing Complaint",
      priority: "Priority 2",
      summary: "Multiple vehicles are reportedly lining up and accelerating aggressively through intersections.",
      response: "Use distance to identify lead cars and cut off exit routes before contact."
    },
    {
      title: "Domestic Disturbance",
      priority: "Priority 1",
      summary: "A caller can hear screaming from inside a nearby residence and believes the fight is ongoing.",
      response: "Coordinate a cover unit, approach carefully, and separate involved parties on contact."
    },
    {
      title: "Welfare Check",
      priority: "Priority 3",
      summary: "Concerned caller has not heard from a resident and reports unusual silence at the property.",
      response: "Check the exterior first, attempt contact, and escalate entry only if facts justify it."
    },
    {
      title: "Person With A Gun",
      priority: "Priority 1",
      summary: "A subject reportedly lifted their shirt to reveal a handgun during an argument.",
      response: "Use cover, confirm the subject, and manage the stop with clear verbal control."
    },
    {
      title: "Attempted Vehicle Theft",
      priority: "Priority 2",
      summary: "Witness observed a subject pulling on door handles and trying to defeat a vehicle lock.",
      response: "Contain the area, look for tools or suspect flight routes, and detain if probable cause develops."
    },
    {
      title: "Loitering Complaint",
      priority: "Priority 4",
      summary: "Business staff report a group refuses to move from the entrance and is bothering customers.",
      response: "Verify the complaint, determine if the group will leave voluntarily, and trespass if needed."
    },
    {
      title: "Parking Lot Crash",
      priority: "Priority 3",
      summary: "Two vehicles collided at low speed and drivers are arguing over fault.",
      response: "Keep the lane clear, separate the drivers, and handle it as a basic collision investigation."
    },
    {
      title: "Roadway Debris Hazard",
      priority: "Priority 3",
      summary: "Caller says a large object fell into the roadway and drivers are swerving around it.",
      response: "Protect the scene with a lane block and clear the hazard as soon as it is safe."
    },
    {
      title: "Animal In Roadway",
      priority: "Priority 3",
      summary: "A loose animal is running through traffic and causing drivers to brake suddenly.",
      response: "Slow traffic, prevent secondary crashes, and coordinate animal control if available."
    },
    {
      title: "Bicycle Versus Vehicle",
      priority: "Priority 2",
      summary: "Cyclist was clipped by a passing vehicle and is down but conscious.",
      response: "Secure medical aid, preserve the collision scene, and identify the driver before release."
    },
    {
      title: "Civilian Flag Down",
      priority: "Priority 3",
      summary: "A passerby is urgently waving units down and reports a problem just around the corner.",
      response: "Get the core facts quickly, then reposition to the reported location with the right approach."
    },
    {
      title: "Fireworks Complaint",
      priority: "Priority 4",
      summary: "Residents report repeated loud fireworks being set off in a dense neighborhood.",
      response: "Locate the source, address the crowd early, and document any citations issued."
    },
    {
      title: "Noise Complaint",
      priority: "Priority 4",
      summary: "Caller says music and shouting have continued for hours and the disturbance is escalating.",
      response: "Make contact with the responsible party and set clear expectations before enforcement."
    },
    {
      title: "Possible Burglary In Progress",
      priority: "Priority 1",
      summary: "Caller believes someone just climbed a fence and entered a closed business property.",
      response: "Establish containment, cover likely exits, and clear the scene methodically."
    },
    {
      title: "Foot Pursuit Started",
      priority: "Priority 1",
      summary: "Another unit lost visual for a suspect who bailed and ran through nearby alleys.",
      response: "Lock down intersections, listen for updated direction, and avoid overcommitting alone."
    },
    {
      title: "Pursuit Support Request",
      priority: "Priority 1",
      summary: "A primary unit is requesting nearby support as a vehicle pursuit approaches the area.",
      response: "Stage ahead, avoid stacking directly behind the primary, and prepare for containment."
    },
    {
      title: "Property Damage Report",
      priority: "Priority 4",
      summary: "Business owner reports fresh damage to windows and signage discovered after opening.",
      response: "Document the damage, check nearby cameras, and preserve any obvious evidence."
    },
    {
      title: "Found Property",
      priority: "Priority 4",
      summary: "A civilian located a dropped wallet and wants an officer to take custody.",
      response: "Secure the property, record chain of custody, and attempt owner notification."
    },
    {
      title: "Shoplifting Detained",
      priority: "Priority 3",
      summary: "Store staff have a suspected shoplifter detained and want police response.",
      response: "Confirm the detention is lawful, gather statements, and review any available store evidence."
    },
    {
      title: "Fraud Complaint",
      priority: "Priority 4",
      summary: "Caller believes they were scammed in a recent transaction and wants to make a report.",
      response: "Take a structured report, preserve transaction details, and set expectations on follow-up."
    },
    {
      title: "ATM Tampering Report",
      priority: "Priority 2",
      summary: "A caller noticed a suspicious device attached to an ATM and believes it may be compromised.",
      response: "Freeze the immediate area, keep civilians off the machine, and notify investigators."
    },
    {
      title: "Street Disorder",
      priority: "Priority 2",
      summary: "A growing crowd is blocking the sidewalk and several subjects are pushing each other.",
      response: "Break up the crowd edges first and identify the main agitators before it spreads."
    },
    {
      title: "Medical Assist Request",
      priority: "Priority 2",
      summary: "A caller needs help keeping a scene controlled until medical units arrive.",
      response: "Secure the area, create access for EMS, and keep bystanders back."
    },
    {
      title: "Unknown Trouble Call",
      priority: "Priority 2",
      summary: "Open line with background noise, then the call disconnected before dispatch could clarify.",
      response: "Approach as an unknown-risk scene and verify conditions before committing inside."
    },
    {
      title: "Vandalism In Progress",
      priority: "Priority 3",
      summary: "Caller reports subjects actively damaging signs and spray-painting a wall.",
      response: "Approach quietly, contain the likely exit route, and detain while tools and damage are fresh."
    },
    {
      title: "Vehicle Break-In Just Occurred",
      priority: "Priority 2",
      summary: "A suspect smashed a window, grabbed property, and fled before the owner could intervene.",
      response: "Broadcast the suspect direction immediately and preserve the vehicle for evidence."
    },
    {
      title: "Aggressive Panhandler",
      priority: "Priority 3",
      summary: "Caller says a subject is following pedestrians and refusing to back off after being told no.",
      response: "Make direct contact, de-escalate the behavior, and determine whether any threats were made."
    },
    {
      title: "Traffic Signal Out",
      priority: "Priority 3",
      summary: "The intersection lights are dark and vehicles are failing to yield properly.",
      response: "Treat it as an immediate traffic hazard and control the intersection until it is stabilized."
    },
    {
      title: "Construction Zone Complaint",
      priority: "Priority 4",
      summary: "Caller reports barriers moved into the roadway and no workers are present.",
      response: "Secure the lane, reposition the barriers, and notify the responsible contractor."
    },
    {
      title: "Harassment Report",
      priority: "Priority 3",
      summary: "A subject is following the caller on foot and continuing unwanted contact.",
      response: "Get the caller separated, identify the suspect, and document the conduct clearly."
    },
    {
      title: "Found Injured Person",
      priority: "Priority 2",
      summary: "Caller located an injured subject on the sidewalk who cannot explain what happened.",
      response: "Prioritize medical care, preserve any nearby evidence, and canvas for witnesses."
    }
  ];

  var DISPATCH_NOTES = [
    "Caller is still on scene and willing to speak with units.",
    "No suspect description has been confirmed yet.",
    "Scene is reported active, but details are still developing.",
    "Additional civilian vehicles may still be nearby.",
    "Units are advised to slow the approach and verify before contact.",
    "A second caller reports traffic backing up near the scene.",
    "Business staff are holding the scene until units arrive.",
    "The reporting party is nervous and may have limited details.",
    "Nearby cameras may have a useful view of the suspect route.",
    "Witnesses are separating and may leave if units delay too long.",
    "The suspect may have changed direction from the original report.",
    "Medical response may be needed depending on what units find."
  ];

  var RARE_DISPATCH = {
    place: {
      road: "North Dock",
      district: "Cayo Perico",
      area: "Offshore"
    },
    call: {
      title: "Offshore Smuggling Lead",
      priority: "Priority 1",
      summary: "Offshore surveillance flagged a possible weapons handoff near the island docks. Units should stage and verify before moving in.",
      response: "Coordinate a marine or air response, confirm the handoff point, and be ready for fleeing boats."
    },
    notes: "Offshore intercept may require marine support before primary contact."
  };

  function bootApp() {
    var body = document.body;

    if (!body) {
      return;
    }

    var pageId = body.getAttribute("data-page");

    if (pageId === "not-found") {
      window.location.replace("/");
      return;
    }

    initDispatchPreview();
  }

  function initDispatchPreview() {
    var widget = document.getElementById("dispatch-widget");

    if (!widget) {
      return;
    }

    var refreshButton = document.getElementById("dispatch-refresh");
    var callType = document.getElementById("dispatch-call-type");
    var location = document.getElementById("dispatch-location");
    var summary = document.getElementById("dispatch-summary");
    var response = document.getElementById("dispatch-response");
    var notes = document.getElementById("dispatch-notes");

    if (!refreshButton || !callType || !location || !summary || !response || !notes) {
      return;
    }

    var getDispatch = createDispatchSource();

    refreshButton.addEventListener("click", renderDispatch);
    renderDispatch();

    function renderDispatch() {
      var nextDispatch = getDispatch();

      callType.textContent = nextDispatch.call.title;
      location.textContent = formatDispatchLocation(nextDispatch);
      summary.textContent = nextDispatch.call.summary;
      response.textContent = "Suggested response: " + nextDispatch.call.response;
      notes.textContent = nextDispatch.notes;
    }
  }

  function createDispatchSource() {
    var lastSignature = "";

    return function () {
      var candidate;
      var signature = "";
      var attempts = 0;

      while (attempts < 8) {
        candidate = createDispatchRecord();
        signature = candidate.place.road + "|" + candidate.call.title;

        if (signature !== lastSignature) {
          lastSignature = signature;
          return candidate;
        }

        attempts += 1;
      }

      lastSignature = signature;
      return candidate;
    };
  }

  function createDispatchRecord() {
    if (Math.random() < 0.05) {
      return {
        place: RARE_DISPATCH.place,
        call: RARE_DISPATCH.call,
        notes: RARE_DISPATCH.notes
      };
    }

    return {
      place: pickRandom(DISPATCH_LOCATIONS),
      call: pickRandom(DISPATCH_CALLS),
      notes: pickRandom(DISPATCH_NOTES)
    };
  }

  function formatDispatchLocation(dispatch) {
    return dispatch.place.road + ", " + dispatch.place.district + ", San Andreas";
  }

  function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  bootApp();
})();
