//import DS from 'ember-data';
App = Ember.Application.create({ LOG_TRANSITIONS: true });

App.Router.map(function() {
  this.route('list-members', { path: 'listagem-de-membros' });
  this.route('create-member', { path: 'criacao-de-membro' });
});

App.Store = DS.Store.extend({
  adapter: DS.RESTAdapter,
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

App.Member = DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  birthday: DS.attr('date'),
  phone: DS.attr('string'),
  cellphone: DS.attr('string'),
});

App.CreateMemberRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('member');
  },
  setupController: function(controller, model) {
    controller.set("model", model);
  }
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
