/**
 * Plugin pour intégration de carte SITG dans CKEditor
 *
 */
(function($) {

    CKEDITOR.plugins.add('sitg', {
        icons: 'sitg-icon',
        init: function (editor) {

            // Plugin logic goes here...
            editor.addCommand( 'sitg_dialog', new CKEDITOR.dialogCommand('ckeditorSitgDialog', {
                allowedContent: 'p',
                requiredContent: 'p'
            }));
            editor.ui.addButton( 'sitg_button', {
                label: Drupal.t('Carte SITG'),
                command: 'sitg_dialog',
                icon: this.path + 'icons/sitg-icon.png', //http://www.freeiconspng.com/copyright-policy.html http://www.freeiconspng.com/free-images/location-icon-png-4253
                toolbar: 'insert,10'
            });
            // Déclaration du fichier contenant la boîte de dialogue
            CKEDITOR.dialog.add('ckeditorSitgDialog', this.path + 'dialogs/sitg.js');
            // Ajoute la feuille de style pour la boite de dialogue
            CKEDITOR.document.appendStyleSheet(CKEDITOR.plugins.getPath('sitg') + 'css/edg_sitg_map-ckeditor.css');
        }
    });

})(jQuery)