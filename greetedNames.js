module.exports = function(models) {

  const userData = [];
  const namesObj = {};
  var counter = 0;

  const index = function(req, res, next) {
    var name = req.body.userName;
    var language = req.body.language;
    var newName = {
      name: name
    };

    res.render('greet', {});

  };

  const addNameScreen = function(req, res, next) {
    models.Name.find({}, function(err, name){
      if(err){
        console.log(err);
      }
      else{
        res.render('greeted',{
          name: name
        })
      }
    });
  };

  const addName = function(req, res, next) {
    var name = req.body.userName;
    var language = req.body.language;
    var newName = {
      name: name
    };


    models.Name.findOne({
      name: req.body.userName
    }, function(err, naam) {
      console.log('Find One');
      console.log(naam);

      if (err) {
        return done(err);
      };

      if (naam === null) {
        console.log("what")
        models.Name.create({
          name: req.body.userName,
          counter: 1
        }, function(err, result) {
          console.log('Create');
          console.log(arguments);
          if (err) {
            return done(err);
          }
          models.Name.findOne({
            name: req.body.userName
          }, function(err) {
            console.log('Second find one');
            if (err) {
              return done(err);
            }
            res.render('greet', {
              name: name,
              language: language
            })
          })
        });
      }

      if (naam) {
        console.log('Lol');
        res.render('greet', {
          name: name,
          language: language
        });
      }

    });

  };
  return {
    index,
    addNameScreen,
    addName
  };
};
