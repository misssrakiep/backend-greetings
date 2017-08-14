module.exports = function(models) {

  const userData = [];
  const namesObj = {};
  var count = 0;

  const index = function(req, res, next) {
    var name = req.body.userName;
    var language = req.body.language;
    var newName = {
      name: name,
      count: 1
    };

    res.render('greet', {});

  };

  const addNameScreen = function(req, res, next) {
    models.Name.find({}, function(err, name) {
      if (err) {
        console.log(err);
      } else {
        res.render('greeted', {
          name: name,
          count: count
        })
      }
    });
  };

  const addName = function(req, res, next) {
    var name = req.body.userName;
    var language = req.body.language;
    var newName = {
      name: name,
      count: 1
    };


    models.Name.findOne({
      name: req.body.userName
    }, function(err, naam) {
      console.log('Found One');
      console.log(naam);
      if (err) {
        return done(err);
      }

      if (naam === null) {
        console.log("Searched for this name");
        models.Name.create({
          name: req.body.userName,
          count: 1
        }, function(err, result) {
          console.log('Created this name');
          console.log(arguments);
          if (err) {
            return done(err);
          }
          res.render('greet', {
            name: name,
            language: language
          });
        });
      }
      if (naam !== null) {
        console.log('name', naam);
        console.log(naam.count);
        naam.count = naam.count + 1;
        console.log(naam.count);

        naam.save(function(err) {
          if (err) {
            console.log(err);
          }
          console.log('Reached the render');
          res.render('greet', {
            name: name,
            language: language
          });
        });
      };
    });
  };

  return {
    index,
    addNameScreen,
    addName
  };
}
