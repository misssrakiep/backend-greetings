module.exports = function(models) {

  const userData = [];
  const namesObj = {};

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
    models.Name.find({}, function(err, name){
      if(err){
        console.log(err);
      }
      else{
        res.render('greeted',{
          name: name,
          count: 1
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
        console.log("Searched for this name")
        models.Name.create({
          name: req.body.userName,
          counter: 1
        }, function(err, result) {
          console.log('Created this name');
          console.log(arguments);
          if (err) {
            return done(err);
          }
          models.Name.find({
            name: req.body.userData
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
        console.log('Reached the render');
        res.render('greet', {
          namesObj: name
          // name: name,
          // language: language
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
