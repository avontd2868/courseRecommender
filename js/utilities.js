
String.prototype.toBoolean = function() {
  switch(this.toLowerCase()){
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(this);
  }
};

Array.prototype.sum = function() {
  var total = 0;
  this.forEach(function(x) {
    if(!isNaN(parseFloat(x)) && isFinite(x)) {
      total += x;
    }
  });
  return total;
}

Array.prototype.avg = function() {
  return this.sum() / this.length;
}
