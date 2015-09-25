App = Ember.Application.create();

App.Router.map(function() {
    this.route('list-members', { path: 'listagem-de-membros' });
    this.route('create-member', { path: 'criacao-de-membro' });
});

App.ListMembersRoute = Ember.Route.extend({
    model: function() {
        return Ember.$.getJSON('/members').then(function(data) {
            return data;
        });
    }
});

App.CreateMemberRoute = Ember.Route.extend({

})

App.MemberController = Ember.Controller.extend({

});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        var url = 'https://api.github.com/repos/henriquebelfort/desbravadores-js/commits';
        return Ember.$.getJSON(url).then(function(data) {
            return data.splice(0, 5);
        });
    }
});
