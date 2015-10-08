//import DS from 'ember-data';

App = Ember.Application.create({ LOG_TRANSITIONS: true });

App.Router.map(function() {
    this.route('list-members', { path: 'listagem-de-membros' });
    this.route('create-member', { path: 'criacao-de-membro' });
});

App.Store = DS.Store.extend({
  adapter: 'App.ApplicationAdapter'
});

DS.RESTAdapter.reopen({
  host: 'http://localhost:3000'
});

App.ListMembersRoute = Ember.Route.extend({
    model: function() {
        return Ember.$.getJSON('/members').then(function(data) {
            return data;
        });
    }
});

App.Member = Ember.Object.extend({
    name : "",
    email : "",
    birthday : "",
    phone : "",
    cellphone : "",
});

App.CreateMemberRoute = Ember.Route.extend({
    model: function(){
        return App.Member.create();
    },
    setupController : function(controller, model){
        controller.set("model", model);
    }
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'https://localhost:3000'
});

App.CreateMemberController = Ember.Controller.extend({
    actions: {
        submit: function() {
            var obj = this.get('model');
            console.info(JSON.stringify(obj));
        }
    }
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        var url = 'https://api.github.com/repos/henriquebelfort/desbravadores-js/commits';
        return Ember.$.getJSON(url).then(function(data) {
            return data.splice(0, 5);
        });
    }
});
