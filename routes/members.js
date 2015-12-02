var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    moment = require('moment');

moment().format();

// configs
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

router.route('/')
    // GET: list members
    .get(function(req, res, next) {
        mongoose.model('member').find({}, function (err, members) {
          if (err) {
            return console.error(err);
          } else {
              res.format({
                html: function() {
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

    // POST: new member
    .post(function(req, res) {
        mongoose.model('member').create(req.body, function (err, member) {
            if (err) {
                return console.error(err);
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

    // GET: new member
    router.get('/new', function(req, res) {
        res.render('members/new', { title: 'Novo Membro' });
    });

    // Route param edit
    router.param('id', function(req, res, next, id) {
        mongoose.model('member').findById(id, function (err, member) {
            if (err) {
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

    // GET: member profile
    router.route('/:id')
        .get(function(req, res) {
            mongoose.model('member').findById(req.id, function (err, member) {
                if (err) {
                  return console.error(err);
                } else {
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

    // edição de membro
    router.route('/:id/edit')
    	.get(function(req, res) {
    	    mongoose.model('member').findById(req.id, function (err, member) {
    	        if (err) {
                  return console.error(err);
    	        } else {
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
    	    mongoose.model('member').findById(req.id, function (err, member) {
    	        member.update(req.body, function (err, memberID) {
    	          if (err) {
    	              return console.error(err);
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
