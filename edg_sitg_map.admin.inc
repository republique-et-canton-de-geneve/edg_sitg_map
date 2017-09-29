<?php

/**
 * @file
 * Code for the edg_sitg_map custom block contents.
 */

/**
 * Formulaire permettant de paramétrer les variables liées au module de carte sitg
 *
 * @return
 *   Un formulaire
 */
function _edg_sitg_map_admin_form() {

  $form['height'] = array(
    '#type' => 'fieldset',
    '#title' => t('Hauteur d\'affichage de la carte en pixel'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['height']['sitg_iframe_height_high'] = array(
    '#type' => 'textfield',
    '#title' => t("Grande carte"),
    '#default_value' => variable_get('sitg_iframe_height_high', SITG_IFRAME_HEIGHT_HIGH),
    '#required' => FALSE,
    '#size' => 20,
  );

  $form['height']['sitg_iframe_height_low'] = array(
    '#type' => 'textfield',
    '#title' => t("Petite carte"),
    '#default_value' => variable_get('sitg_iframe_height_low', SITG_IFRAME_HEIGHT_LOW),
    '#required' => FALSE,
    '#size' => 20,
  );

  $form['webmap'] = array(
    '#type' => 'fieldset',
    '#title' => t('Webmap'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['webmap']['url_sitg_webmap'] = array(
    '#type' => 'textfield',
    '#title' => t("URL SITG WEBMAP"),
    '#default_value' => variable_get('url_sitg_webmap', SITG_WEBMAP_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['webmap']['url_sitg_param_webmap'] = array(
    '#type' => 'textfield',
    '#title' => t("Paramètres"),
    '#default_value' => variable_get('url_sitg_param_webmap', SITG_PARAM_WEBMAP_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['webmap']['    \'#default_value\' => variable_get(\'url_sitg_css_webmap\', SITG_CSS_WEBMAP_URL),
'] = array(
    '#type' => 'textfield',
    '#title' => t("Class CSS"),
    '#default_value' => variable_get('url_sitg_css_webmap', SITG_CSS_WEBMAP_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['webmap']['desc'] = array(
    '#markup' => '<u>Exemple de jeton :</u> [sitg:TAILLE:webmap:<b>IDWEBMAP</b>]',
  );

  $form['appid'] = array(
    '#type' => 'fieldset',
    '#title' => t('APPID'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['appid']['url_sitg_appid'] = array(
    '#type' => 'textfield',
    '#title' => t("URL SITG APPID"),
    '#default_value' => variable_get('url_sitg_appid', SITG_APPID_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['appid']['url_sitg_param_appid'] = array(
    '#type' => 'textfield',
    '#title' => t("Paramètres"),
    '#default_value' => variable_get('url_sitg_param_appid', SITG_PARAM_APPID_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['appid']['    \'#default_value\' => variable_get(\'url_sitg_css_appid\', SITG_CSS_APPID_URL),
'] = array(
    '#type' => 'textfield',
    '#title' => t("Class CSS"),
    '#default_value' => variable_get('url_sitg_css_appid', SITG_CSS_APPID_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['appid']['desc'] = array(
    '#markup' => '<u>Exemple de jeton :</u> [sitg:TAILLE:appid:APPID:OPTION]',
  );


  $form['idadresse'] = array(
    '#type' => 'fieldset',
    '#title' => t('IDPADR'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['idadresse']['url_sitg_idadresse'] = array(
    '#type' => 'textfield',
    '#title' => t("URL SITG IDPADR"),
    '#default_value' => variable_get('url_sitg_idadresse', SITG_IDADRESSE_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['idadresse']['url_sitg_param_idadresse'] = array(
    '#type' => 'textfield',
    '#title' => t("paramètres"),
    '#default_value' => variable_get('url_sitg_param_idadresse', SITG_PARAM_IDADRESSE_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['idadresse']['url_sitg_css_idadresse'] = array(
    '#type' => 'textfield',
    '#title' => t("Class CSS"),
    '#default_value' => variable_get('url_sitg_css_idadresse', SITG_CSS_IDADRESSE_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['idadresse']['url_sitg_query_idadresse'] = array(
    '#type' => 'textfield',
    '#title' => t("URL webService pour recherche d'adresse"),
    '#default_value' => variable_get('url_sitg_query_idadresse', SITG_QUERY_IDADRESSE_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['idadresse']['desc'] = array(
    '#markup' => '<u>Exemple de jeton :</u> [sitg:TAILLE:idpadr:<b>IDPADR</b>:label à côté du point:message de la bulle]',
  );


  $form['latlong'] = array(
    '#type' => 'fieldset',
    '#title' => t('Coordonnées (Latitude Longitude)'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['latlong']['url_sitg_latlong'] = array(
    '#type' => 'textfield',
    '#title' => t("URL SITG corrdonnées"),
    '#default_value' => variable_get('url_sitg_latlong', SITG_LATLONG_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['latlong']['url_sitg_param_latlong'] = array(
    '#type' => 'textfield',
    '#title' => t("paramètres"),
    '#default_value' => variable_get('url_sitg_param_latlong', SITG_PARAM_LATLONG_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['latlong']['url_sitg_css_latlong'] = array(
    '#type' => 'textfield',
    '#title' => t("Class CSS"),
    '#default_value' => variable_get('url_sitg_css_latlong', SITG_CSS_LATLONG_URL),
    '#required' => FALSE,
    '#size' => 200,
  );

  $form['latlong']['desc'] = array(
    '#markup' => '<u>Exemple de jeton :</u> [sitg:TAILLE:latlong:<b>latitude</b>:<b>longitude</b>:label à côté du point:message de la bulle]'
  );

  return system_settings_form($form);
}
