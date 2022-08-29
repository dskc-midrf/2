function BuildSiteLink(section,title,link) {
  section.append("<li><a target='"+link.Window+"' href='"+link.Url+"' rel='noopener'>"+title+"</a></li>");
}

function BuildSocialLink(css,title,social) {
  if(social.Url!="")
    $(".skin-social").append("<div class='social-item'><a title='"+title+"' rel='"+social.Relationship+"' aria-label='"+title+"' target='"+social.Window+"' href='"+social.Url+"'><span class='social-icon "+css+"'></span><span class='social-title'>"+title+"</span></a></div>");
}

function BuildSocialLinkFA(css,fa,title,social) {
  if(social.Url!="") {
    $(".skin-social").append("<div class='social-item "+css+" '><a title='"+title+"' rel='"+social.Relationship+"' aria-label='"+title+"' target='"+social.Window+"' href='"+social.Url+"'><span class='fa "+fa+" fa-inverse'></span></a></div>");
  }
}

$(document).ready(function() {
  // site links
  BuildSocialLinkFA("social-icon-fb","fa-facebook","Follow Us on Facebook",skinvars.SocialLinks.Facebook);
  BuildSocialLinkFA("social-icon-twitter","fa-twitter","Follow Us on Twitter",skinvars.SocialLinks.Twitter);
  BuildSocialLinkFA("social-icon-youtube","fa-youtube","YouTube",skinvars.SocialLinks.YouTube);
  BuildSocialLinkFA("social-icon-linkedin","fa-linkedin","LinkedIn",skinvars.SocialLinks.LinkedIn);
  BuildSocialLinkFA("social-icon-instagram","fa-instagram","Instagram",skinvars.SocialLinks.Instagram);
  BuildSocialLinkFA("social-icon-flickr","fa-flickr","Flickr",skinvars.SocialLinks.Flickr);
  BuildSocialLinkFA("social-icon-blog","fa-comments","Blog",skinvars.SocialLinks.Blog);
  BuildSocialLinkFA("social-icon-email","fa-envelope","Email",skinvars.SocialLinks.Email);
  BuildSocialLinkFA("social-icon-rss","fa-rss","RSS",skinvars.SocialLinks.RSS);
  BuildSocialLinkFA("social-icon-widget","fa-cog","Widgets",{ Url: "",Window: "" });   // fix
  BuildSocialLinkFA("social-icon-snapchat","fa-snapchat","Snapchat",skinvars.SocialLinks.Snapchat);

  window.usasearch_config={
    siteHandle: skinvars.aid,
    autoSubmitOnSelect: false,
  };

  configureSearch();

  var $dma_fw_container=$(".dma-full-width, .dma-full-width-centered");
  var headerHeight=$("#main-header").height();
  if($dma_fw_container.length>0) {
    $(window).on('scroll',
      function() {
        if($("body").width()<768) {
          if($dma_fw_container.hasClass('scroll'))
            $dma_fw_container.removeClass('scroll');
          return;
        }

        if($(window).scrollTop()>headerHeight&&!$dma_fw_container.hasClass('scroll')) {
          $dma_fw_container.addClass('scroll');
        } else if($(window).scrollTop()<=headerHeight&&$dma_fw_container.hasClass('scroll')) {
          $dma_fw_container.removeClass('scroll');
        }
      });
  }

  // poyfill for objectfit
  var supportsObjectFit='objectFit' in document.documentElement.style,
    bgPolyString='<div class="bg-image-fallback"></div>',
    $pictures=$('.dod2-fixed-aspect'),
    objectFitPoly=function() {
      $pictures.each(function() {
        var $img=$(this).find('img'),
          src=$img.attr('src'),
          pos=$img.data('focus-left')+'% '+$img.data('focus-top')+'%',
          paddingBottom=$(this).css('padding-bottom'),
          polyEle=$(bgPolyString,{}).css({
            'background-image': "url(".concat(src,")"),
            'background-position': pos,
            'padding-bottom': paddingBottom,
            'background-size': "cover"
          });
        $(this).after(polyEle);
      });

      $pictures.hide();
    }; //objectfitpoly

  if(!supportsObjectFit) {
    objectFitPoly();
  }
});

function configureSearch() {
  var script=document.createElement('script');
  script.type='text/javascript';
  script.src='//search.usa.gov/javascripts/remote.loader.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  // This prevents the click from submitting the webforms form
  $('.skin-search-go').on('click',function(e) {
    e.stopImmediatePropagation();
    submitSearch($(this));
  });

  // This is the function that submits the search
  function submitSearch($this) {
    var query=$this? ($this.val()||$this.parent().find('input').val()):'';
    var affiliate=skinvars.aid;
    window.location='//search.usa.gov/search?query='+query+'&affiliate='+affiliate+'&utf8=%26%23x2713%3B';
  }

  // This turns hides the autocomplete box if the user scrolls the page
  $(window).on('scroll',
    function() {
      $('#usasearch_sayt ul').hide();
    });
}