(function(){
  var THEME_KEY = 'sparemail_theme';
  var LANG_KEY = 'sparemail_lang';

  function applyLang(lang){
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.querySelectorAll('[data-ar]').forEach(function(el){
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.ar;
    });
    document.querySelectorAll('[data-ph-ar]').forEach(function(el){
      el.placeholder = lang === 'en' ? el.dataset.phEn : el.dataset.phAr;
    });
  }

  function currentTheme(){
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }
  function currentLang(){
    return document.documentElement.lang || 'ar';
  }

  document.addEventListener('DOMContentLoaded', function(){
    /* Text was rendered in Arabic by default in the HTML; if the stored
       preference is English, translate now that the DOM is ready. */
    var storedLang = localStorage.getItem(LANG_KEY);
    if(storedLang === 'en'){
      applyLang('en');
    }

    var themeBtn = document.getElementById('themeToggleBtn');
    var langBtn = document.getElementById('langToggleBtn');

    if(themeBtn){
      themeBtn.addEventListener('click', function(){
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(THEME_KEY, next);
      });
    }
    if(langBtn){
      langBtn.addEventListener('click', function(){
        var next = currentLang() === 'en' ? 'ar' : 'en';
        applyLang(next);
        localStorage.setItem(LANG_KEY, next);
      });
    }
  });
})();
