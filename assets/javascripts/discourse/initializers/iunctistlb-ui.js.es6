import { withPluginApi } from 'discourse/lib/plugin-api';
import { onToolbarCreate } from 'discourse/components/d-editor';

function priorToApi(container)
{
  const siteSettings = container.lookup('site-settings:main');

  if (siteSettings.iunctistlb_ui_enabled) {
      onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "souligner_ui_button",
          group: "fontStyles",
          icon: "underline",
          perform: e => e.applySurround('[u]', '[/u]', 'souligner_ui_default_text')
        });
      });

      onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "ajoutimage_ui_button",
          group: "insertions",
          icon: "picture-o",
          perform: e => e.applySurround('[img]', '[/img]', 'ajoutimage_ui_default_text')
        });
      });
    
      onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "titrenews_ui_button",
          group: "extras",
          icon: "newspaper-o",
          perform: e => e.applySurround('[t]', '[/t]<hr>', 'titrenews_ui_default_text')
        });
      });
      
      onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "floatl_ui_button",
          group: "extras",
          icon: "indent",
          perform: e => e.applySurround('[floatl]', '[/floatl]', 'floatl_ui_default_text')
        });
      });
      
      onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "centrer_ui_button",
          group: "extras",
          icon: "align-center",
          perform: e => e.applySurround('[center]', '[/center]', 'centrer_ui_default_text')
        });
      });
      
      onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "aligndroite_ui_button",
          group: "extras",
          icon: "align-right",
          perform: e => e.applySurround('[right]', '[/right]', 'aligndroite_ui_default_text')
        });
      });
      
      onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "justifier_ui_button",
          group: "extras",
          icon: "align-justify",
          perform: e => e.applySurround('[justify]', '[/justify]', 'justifier_ui_default_text')
        });
      });
    
       onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "couleur_ui_button",
          group: "extras",
          icon: "paint-brush",
          perform: e => e.applySurround('[color=#]', '[/color]', 'couleur_ui_default_text')
        });
      });
    
      onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "surligne_ui_button",
          group: "extras",
          icon: "pencil-square",
          perform: e => e.applySurround('[su]', '[/su]', 'surligne_ui_default_text')
        });
      });
  }
}

function initializePlugin(api)
{
  const siteSettings = api.container.lookup('site-settings:main');

  if (siteSettings.iunctistlb_ui_enabled) {
     api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "souligner_ui_button",
          group: "fontStyles",
          icon: "underline",
          perform: e => e.applySurround('[u]', '[/u]', 'souligner_ui_default_text')
        });
      });
      
    api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "ajoutimage_ui_button",
          group: "insertions",
          icon: "picture-o",
          perform: e => e.applySurround('[img]', '[/img]', 'ajoutimage_ui_default_text')
        });
      });
    
    api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "titrenews_ui_button",
          group: "extras",
          icon: "newspaper-o",
          perform: e => e.applySurround('[t]', '[/t]<hr>', 'titrenews_ui_default_text')
        });
      });

    api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "floatl_ui_button",
          group: "extras",
          icon: "indent",
          perform: e => e.applySurround('[floatl]', '[/floatl]', 'floatl_ui_default_text')
        });
      });
      
    api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "centrer_ui_button",
          group: "extrass",
          icon: "align-center",
          perform: e => e.applySurround('[center]', '[/center]', 'centrer_ui_default_text')
        });
      });
      
    api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "aligndroite_ui_button",
          group: "extras",
          icon: "align-right",
          perform: e => e.applySurround('[right]', '[/right]', 'aligndroite_ui_default_text')
        });
      });
      
    api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "justifier_ui_button",
          group: "extras",
          icon: "align-justify",
          perform: e => e.applySurround('[justify]', '[/justify]', 'justifier_ui_default_text')
        });
      });

    api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "couleur_ui_button",
          group: "extras",
          icon: "paint-brush",
          perform: e => e.applySurround('[color=#]', '[/color]', 'couleur_ui_default_text')
        });
      });
    
    api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: "surligne_ui_button",
          group: "extras",
          icon: "pencil-square",
          perform: e => e.applySurround('[su]', '[/su]', 'surligne_ui_default_text')
        });
      });
  }
}

export default
{
  name: 'iunctistlb-ui',
  initialize(container)
  {
    withPluginApi('0.1', api => initializePlugin(api), { noApi: () => priorToApi(container) });
  }
};
