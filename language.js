module.exports = function language(){
  const lang = function(req, res){
    var language = req.body.language;
    res.render('greet', {language : language});
  };
  return {
    lang
  };
};
