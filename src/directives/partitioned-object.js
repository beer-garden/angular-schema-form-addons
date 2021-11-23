var partitionTransclusion = function (args) {
  // Make sure we have a transclusion field
  var transElement = args.fieldFrag.querySelector("[sf-field-transclude]");
  if (transElement) {
    var matchItems = [],
      noMatchItems = [];

    // sf-field-transclude is not a directive but has the name
    // of what we're supposed to traverse. Default to `items`
    var sub = transElement.getAttribute("sf-field-transclude") || "items";
    var items = args.form[sub];

    try {
      // Grab the partition from the form and possibly negate it
      var condition = args.form.partition;
      var negate = false;
      if (condition.startsWith("!")) {
        negate = true;
        condition = condition.substr(1);
      }

      // Actually partition items into their buckets
      angular.forEach(items, function (item) {
        if (
          (item["schema"][condition] && !negate) ||
          (!item["schema"][condition] && negate)
        ) {
          matchItems.push(item);
        } else {
          noMatchItems.push(item);
        }
      });
    } catch (err) {
      // If anything goes wrong just treat as a non-partitioned object
      matchItems = items;
    }

    // Find BOTH insertion points now, otherwise nesting causes problems
    var matchFrag = args.fieldFrag.querySelector("[sf-transclude-match]");
    var noMatchFrag = args.fieldFrag.querySelector("[sf-transclude-nomatch]");

    // Build the child fragements and add them in the correct place
    if (matchItems.length) {
      matchFrag.appendChild(
        args.build(matchItems, args.path + "." + sub, args.state)
      );
    }
    if (noMatchItems.length) {
      noMatchFrag.appendChild(
        args.build(noMatchItems, args.path + "." + sub, args.state)
      );

      args.form.hasPartition = true;
    }
  }
};

export { partitionTransclusion };
