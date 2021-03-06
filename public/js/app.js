require.config({
  baseUrl: '/js',
  paths: {
    jquery: 'vendor/jquery',
    backbone: 'vendor/backbone',
    underscore: 'vendor/underscore',
    mapboxgl: 'vendor/mapbox-gl',
    ga: '//www.google-analytics.com/analytics',
    handlebars: 'vendor/handlebars',
    i18next: 'vendor/i18next'
  }
});

require(['backbone', 'app/router', 'app/models/map', 'app/views/map', 'i18next'],
  function (Backbone, Router, Map, MapView, i18next) {
    window.router = new Router();
    window.vent = _.extend({}, Backbone.Events);
    window.i18next = i18next;

    $(document).on('click', 'a:not([data-bypass])', function (e) {
      var href = $(e.currentTarget).attr('href');
      e.preventDefault();
      router.navigate(href, true);
    });

    var mapView = new MapView({
      model: new Map()
    });

    i18next.init({
      lng: 'en',
      debug: true,
      resources: {
        en: {
          translation: {
            reportIssue: 'Report Issue',
            reportIssuePlaceholder: 'Placeholder',
            close: 'Close',
            englishResources: 'English Resources',
            turkishResources: 'Turkish Resources',
            send: 'Send',
            officialLogo: 'Ministry of Culture and Tourism Archeological Site',
            visitingInfo: 'Visiting Info',
            more: 'More...',
            about: 'About this project',
            aboutLink: '/about'
          }
        },
        tr: {
          translation: {
            reportIssue: 'Hata Bildir',
            reportIssuePlaceholder: 'Placeholder',
            close: 'Kapat',
            englishResources: 'İngilizce Kaynaklar',
            turkishResources: 'Türkçe Kaynaklar',
            send: 'Gönder',
            officialLogo: 'Kültür ve Turizm Bakanlığı Ören Yeri',
            visitingInfo: 'Ziyaret Bilgileri',
            more: 'Daha fazla...',
            about: 'Bu proje hakkında',
            aboutLink: '/hakkinda'
          }
        }
      }
    });

    function updateContent() {
      document.getElementById('reportIssue').innerHTML = i18next.t('reportIssue');
      document.getElementById('close').innerHTML = i18next.t('close');
      document.getElementById('englishResources').innerHTML = i18next.t('englishResources');
      document.getElementById('turkishResources').innerHTML = i18next.t('turkishResources');
      document.getElementById('aboutLink').textContent = i18next.t('about');
      document.getElementById('aboutLink').href = i18next.t('aboutLink');
      document.getElementById('officialLogo').alt = i18next.t('officialLogo');
      document.getElementById('visitingInfo').textContent = i18next.t('visitingInfo');
    }

    i18next.on('languageChanged', function () {
      try {
        updateContent();
      } catch (e) {
        console.log(e);
      }
    });

    Backbone.history.start({ pushState: true });
  });
