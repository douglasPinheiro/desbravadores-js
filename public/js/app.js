App = Ember.Application.create();

App.Router.map(function() {
    this.route('list-members', { path: 'listagem-de-membros' })
});

App.ListMembersRoute = Ember.Route.extend({
    
});

App.ListMembersController = Ember.Controller.extend({
    pageName: 'Listagem de membros'
});

App.IndexRoute = Ember.Route.extend({
    model: function () {
        return 'Bem vindo ao Desbravadores.JS';
    }
});
