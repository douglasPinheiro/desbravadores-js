App = Ember.Application.create();

App.Router.map(function() {
    this.route('list-members', { path: 'listagem-de-membros' })
});

App.ListMembersRoute = Ember.Route.extend({
    model: function() {
        var url = 'http://localhost:3000/members';
        return Ember.$.getJSON(url).then(function(data) {
            return data;
        });
    }
});

App.ListMembersController = Ember.Controller.extend({
    pageName: 'Listagem de membros',

});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        var url = 'https://api.github.com/repos/henriquebelfort/desbravadores-js/commits';
        return Ember.$.getJSON(url).then(function(data) {
            return data.splice(0, 5);
        });
    }
});
