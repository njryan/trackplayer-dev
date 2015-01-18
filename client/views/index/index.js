// Basic Startup SEO Data, Set manually
Meteor.startup(function() {
    if(Meteor.isClient){
        return SEO.config({
            title: 'TrackPlayerDev',
            meta: {
                'description': 'Starting Code Structure'
            },
            og: {
                'image': '/images/insonicpng.png'
            }
        });
    }
});