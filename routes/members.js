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

    /* GET New Member page. */
    router.get('/new', function(req, res) {
        res.render('members/new', { title: 'Novo Membro' });
    });

    router.param('id', function(req, res, next, id) {
        mongoose.model('member').findById(id, function (err, member) {
            if (err) {
                console.log(id + ' Não encontrado');
                res.status(404)
                var err = new Error('Não encontrado');
                err.status = 404;
                res.format({
                    html: function(){
                        next(err);
                    },
                    json: function(){
                        res.json({message : err.status  + ' ' + err});
                    }
                });
            } else {
                req.id = id;
                next();
            }
        });
    });

    router.route('/:id')
      .get(function(req, res) {
        mongoose.model('member').findById(req.id, function (err, member) {
          if (err) {
            console.log('Prolema ao obter: ' + err);
          } else {
            console.log('Obtendo id do membro: ' + member._id);
            res.format({
              html: function(){
                  res.render('members/show', {
                    "member" : member
                  });
              },
              json: function(){
                  res.json(member);
              }
            });
          }
        });
      });

    router.route('/:id/edit')
    	.get(function(req, res) {
    	    mongoose.model('member').findById(req.id, function (err, member) {
    	        if (err) {
                  console.log('Falha ao obter membro ' + err);
    	        } else {
    	            console.log('Obténdo membro : ' + member._id);
                  res.format({
    	                html: function(){
  	                       res.render('members/edit', {
  	                          title: 'Membro' + member._id,
                              "member" : member
  	                      });
    	                 },
    	                json: function(){
	                         res.json(member);
                      }
    	            });
    	        }
    	    });
    	})
    	.put(function(req, res) {
    	    var name = req.body.name,
    	        email = req.body.email,
      	      date = req.body.date,
      	      phone = req.body.phone,
      	      cellphone = req.body.cellphone;

    	    mongoose.model('member').findById(req.id, function (err, member) {
    	        member.update({
    	            name : name,
                  email : email,
    	            date : date,
                  phone : phone,
    	            cellphone : cellphone
    	        }, function (err, memberID) {
    	          if (err) {
    	              res.send("Problema na atualização: " + err);
    	          }
    	          else {
    	                  res.format({
  	                      html: function(){
  	                           res.redirect("/members/" + member._id);
                          },
    	                    json: function(){
  	                           res.json(member);
    	                    }
    	                  });
    	           }
    	        })
    	    });
    	})
    	.delete(function (req, res){
    	    mongoose.model('member').findById(req.id, function (err, member) {
    	        if (err) {
    	            return console.error(err);
    	        } else {
    	            member.remove(function (err, member) {
    	                if (err) {
    	                    return console.error(err);
    	                } else {
    	                    console.log('Removendo membro: ' + member._id);
    	                    res.format({
    	                        html: function(){
    	                               res.redirect("/members");
    	                        },
    	                        json: function(){
    	                               res.json({message : 'deleted',
    	                                   item : member
    	                               });
    	                         }
    	                      });
    	                }
    	            });
    	        }
    	    });
    	});

module.exports = router;
