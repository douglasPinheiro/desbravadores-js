var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

// configs
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
}));

router.route('/')
    // get all members
    .get(function(req, res, next) {
        mongoose.model('member').find({}, function (err, members) {
          if (err) {
            return console.error(err);
          } else {
              res.format({
                html: function(){
                  res.render('members/index', {
                    title: 'Membros',
                      "members" : members
                    });
                },
                json: function(){
                  res.json(members);
                }
            });
          }
      });
    })

    // post new member
    .post(function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var birthday = req.body.birthday;
        var phone = req.body.phone;
        var cellphone = req.body.cellphone;

      mongoose.model('member').create({
          name : name,
          email : email,
          birthday : birthday,
          phone : phone,
          cellphone : cellphone
      }, function (err, member) {
            if (err) {
                res.send("Falha ao inserir dado em tabela member");
            } else {
                console.log('Criando membro: ' + member);
                res.format({
                  html: function(){
                      res.location("members");
                      res.redirect("/members");
                  },
                  json: function(){
                      res.json(member);
                  }
              });
            }
      })
    });
