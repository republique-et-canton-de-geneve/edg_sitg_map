(function ($) {
  /**
   *   fonction appelée sur keyUp de l'input de recherche
   */
  function searchAdress(adress) {

    var str = adress.getValue();
    if (str.length > 2) { // lance la recherche si plus de 2 caractéres sont saisis
      var popup = $('#idpadr_popup');

      //supprime toutes les entrées dans la popup
      popup.empty();
      popup.show();

      //charge les nouvelles adresses
      loadAdress(adress, popup);
    }
  }

  /**
   * Sélectionne une adresse après clic dans la liste
   * @param el -> element cliqué dans la liste
   * @param adress -> input pour la saisie de l'adresse
   */
  function selectAdress(el, adress) { //

    $('#idpadr_popup').hide();
    var idpadr_res = $('#idpadr_res');

    var id = el.getAttribute('id');
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        var html = '';
        var nbRes = response.features.length;
//        Test si des adresses exitent
        if ( nbRes > 0 ) {
          //on vide la div popup
          idpadr_res.empty();

//        on affiche les infos de l'adresse selectionnee
          var text = document.createElement('p');
          text.innerHTML = "Adresse choisie : ";
          idpadr_res.append(text);

          var result = response.features[0].attributes;

          idpadr_res.append('<p>' + result.ADRESSE + '</p><p>' +result.NOM_NPA + '</p><p>' + result.NO_POSTAL +
            '</p><p>IDPADR :' + result.IDPADR + '</p>');
          
          adress.setValue(result.ADRESSE + ' (' + result.NO_POSTAL + ' ' + result.NOM_NPA + ')');
          //Met à jour la description si celle ci est vide
          var dialog = adress.getDialog();
          var desc = dialog.getContentElement('tab_idpAdr', 'desc');
          if (desc.getValue().length == 0) {
            desc.setValue(result.ADRESSE + '%3Cbr%3E' + result.NO_POSTAL + '%3Cbr%3E' + result.NOM_NPA); //%3Cbr%3E = encodage de <br>
          }

          var id = document.createElement('input');
          id.setAttribute('type', 'hidden');
          id.setAttribute('id', 'idpadr_selected');
          id.setAttribute('value', result.IDPADR);
          idpadr_res.append(id);

        }
        else {
          var el = document.createElement("p");
          el.innerHTML = 'Pas de resultat';
          idpadr_res.append(el);
        }
//        document.getElementById("idpadr_res").innerHTML = html;
      }
    };
    var query_layer = "https://ge.ch/ags1/rest/services/SITG/localisation_dynamique/MapServer/0";
    xhttp.open("GET", query_layer + "/query?returnGeometry=false&outFields=ADRESSE,IDPADR,NO_POSTAL,NOM_NPA" +
      "&f=json&where=IDPADR%20like%20%27" + id + "%27", true);
    xhttp.send();
  }

  /**
   * Tri les résultats par ordre alphabétiaue
   */
  function SortByName(x,y) {
    return ((x.attributes.ADRESSE == y.attributes.ADRESSE) ? 0 : ((x.attributes.ADRESSE > y.attributes.ADRESSE) ? 1 : -1 ));
  }

  /**
   * Cherche les adresses correspondantes à la saisie
   * @param adress -> element input CKEditor
   * @param popup -> div popup
   */
  function loadAdress(adress, popup) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        var nbRes = response.features.length;
//        Test si des adresses exitent
          if ( nbRes > 0 ) {
            // Tri les resultats par adresse
            response.features.sort(SortByName);
            for (i in response.features) {
              var result = response.features[i].attributes;
              var el = document.createElement("p");
              el.setAttribute('id', result.IDPADR);
              el.innerHTML = result.ADRESSE + ' (' + result.NO_POSTAL + ' ' + result.NOM_NPA + ')';
              el.addEventListener("click", function () {
                selectAdress(this, adress);
              }, false);
              var input = document.createElement("input");
              input.setAttribute('type', 'hidden');
              input.setAttribute('value', '{IDPADR:}');
              popup.append(el);
            }
          }
          else {
            var el = document.createElement("p");
            el.innerHTML = 'Pas de resultat';
            popup.append(el);
          }
      }
    };

    //appel au webservice
    var val = adress.getValue();
    val = val.replace( ' ', '+');
    var str = val.toLowerCase();

    xhttp.open("GET", Drupal.settings.edgSitgMap.idpadrQuery + "/query?returnGeometry=false&outFields=ADRESSE,IDPADR,NO_POSTAL,NOM_NPA" +
      "&f=json&where=lower(ADRESSE)%20like%20%27%" + str + "%%27&order_by=ADRESSE", true);
    xhttp.send();
  }

  // Déclaration de la boîte de dialogue
  CKEDITOR.dialog.add('ckeditorSitgDialog', function (editor) {
    return {
      title: Drupal.t('Insertion carte SITG'),
      minWidth: 450,
      minHeight: 250,

      // Contenu de la boîte de dialogue avec les tab, contenant des éléments de formulaire.
      contents: [
        {
          id: 'tab_latlng', // Tab Latitude / Longitude
          label: Drupal.t('par Coordonnées'),
          elements: [
            // input textInput http://docs.ckeditor.com/#!/api/CKEDITOR.dialog.definition.textInput
            {
              type: 'text',
              id: 'lat',
              label: Drupal.t('Latitude'),
              'default': ''
            },
            {
              type: 'text',
              id: 'lng',
              label: Drupal.t('Longitude'),
              'default': ''
            },
            {
              type: 'select',
              id: 'taille',
              label: Drupal.t('Taille de la carte'),
              items: [ [ 'petite' ], [ 'grande' ] ],
              'default': 'grande'
            },
            {
              type: 'text',
              id: 'label',
              label: Drupal.t('Libellé'),
              'default': ''
            }, {
              type: 'text',
              id: 'desc',
              label: Drupal.t('Description'),
              'default': ''
            }
          ]
        },
        {
          id: 'tab_appId', // Tab par appId
          label: Drupal.t('par AppId'),
          elements: [
            {
              type: 'text',
              id: 'appId',
              label: Drupal.t('Numéro AppId'),
              'default': ''
            },
            {
              type: 'select',
              id: 'taille',
              label: Drupal.t('Taille de la carte'),
              items: [ [ 'petite' ], [ 'grande' ] ],
              'default': 'grande'
            },
            {
              type: 'text',
              id: 'option',
              label: Drupal.t('Paramètres'),
              'default': ''
            },
          ]
        },
        {
          id: 'tab_webMap',  // Tab WebMap
          label: Drupal.t('par WebMap'),
          elements: [
            {
              type: 'text',
              id: 'webMap',
              label: Drupal.t('Numéro webMap'),
              'default': ''
            },
            {
              type: 'select',
              id: 'taille',
              label: Drupal.t('Taille de la carte'),
              items: [ [ 'petite' ], [ 'grande' ] ],
              'default': 'grande'
            },
          ]
        },
        {
          id: 'tab_idpAdr',  // Tab idpAdr
          label: Drupal.t('par adresse'),
          elements: [
            {
              type: 'text',
              id: 'adress',
              label: Drupal.t('Rechercher une adresse'),
              'default': '',
              onKeyUp: function () {
                searchAdress(this);
              },
              onClick: function () {
                this.setValue('');
              }
            },
            {
              type: 'html',
              html: '<div id="idpadr_popup"></div>'
            },
            {
              type: 'hbox',
              children: [
                {
                  type: 'vbox',
                  align: 'left',
                  children: [
                    {
                      type: 'html',
                      html: '<div id="idpadr_res"></div>'
                    }
                  ]
                },
                {
                  type: 'vbox',
                  align: 'right',
                  children: [
                    {
                      type: 'select',
                      id: 'taille',
                      label: Drupal.t('Taille de la carte'),
                      items: [ [ 'petite' ], [ 'grande' ] ],
                      'default': 'grande'
                    },
                    {
                      type: 'text',
                      id: 'label',
                      label: Drupal.t('Libellé'),
                      'default': ''
                    }, {
                      type: 'text',
                      id: 'desc',
                      label: Drupal.t('Description'),
                      'default': ''
                    }
                  ]
                }
              ]
            }
          ],
        }
      ],
      onShow: function () { // cache la popup de idpadr a l'affichage de la boite de dialog
        $('#idpadr_popup').hide();
      },
      // Callback appelée à la soumission du formulaire (validé)
      onOk: function () {

        var CurrObj = CKEDITOR.dialog.getCurrent();
        if (CurrObj.definition.dialog._.currentTabId == 'tab_latlng') {
          var latitude = this.getContentElement('tab_latlng', 'lat');
          var longitude = this.getContentElement('tab_latlng', 'lng');
          var label = this.getContentElement('tab_latlng', 'label');
          var desc = this.getContentElement('tab_latlng', 'desc');
          var taille = this.getContentElement('tab_latlng', 'taille');

          editor.insertHtml('[sitg:' + taille.getValue() + ':latlong:' + latitude.getValue() + ':' + longitude.getValue() + ':' + label.getValue() + ':' + desc.getValue() + ']');
        } else if (CurrObj.definition.dialog._.currentTabId == 'tab_idpAdr') {
            var idpAdr = $('#idpadr_selected').val();
            var label = this.getContentElement('tab_idpAdr', 'label');
            var desc = this.getContentElement('tab_idpAdr', 'desc');
            var taille = this.getContentElement('tab_idpAdr', 'taille');

            editor.insertHtml('[sitg:' + taille.getValue() + ':idpadr:' + idpAdr + ':' + label.getValue() + ':' + desc.getValue() + ']');
        } else if (CurrObj.definition.dialog._.currentTabId == 'tab_webMap') {
            var webMap = this.getContentElement('tab_webMap', 'webMap');
            var taille = this.getContentElement('tab_webMap', 'taille');

            editor.insertHtml('[sitg:' + taille.getValue() + ':webmap:' + webMap.getValue() + ']');
        } else if (CurrObj.definition.dialog._.currentTabId == 'tab_appId') {
            var appIdp = this.getContentElement('tab_appId', 'appId');
            var taille = this.getContentElement('tab_appId', 'taille');
            var option = this.getContentElement('tab_appId', 'option');

            editor.insertHtml('[sitg:' + taille.getValue() + ':appid:' + appIdp.getValue() + ':' + option.getValue() + ']');
        }
      }
    };
  });
})(jQuery);