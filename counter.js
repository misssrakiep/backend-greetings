
module.exports = function(userData){

// var greeted = {};
// var counter = 0;
  const count = function(req, res){
      var counter = userData.users.length;
      return counter;

    res.render('greet', {count : counter});
  };

  return {
    count
  }

}
