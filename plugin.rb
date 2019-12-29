# name: iunctis-toolbar
# about: Ajout de boutons sur l'éditeur
# version: 2.3
# authors: Steven
# url: https://github.com/iunctis/iunctis-toolbar

enabled_site_setting :iunctistlb_ui_enabled

register_asset 'stylesheets/iunctistlb.scss'

register_svg_icon "fa-underline" if respond_to?(:register_svg_icon)
register_svg_icon "fa-indent" if respond_to?(:register_svg_icon)
register_svg_icon "fa-align-center" if respond_to?(:register_svg_icon)
register_svg_icon "fa-align-right" if respond_to?(:register_svg_icon)
register_svg_icon "fa-align-justify" if respond_to?(:register_svg_icon)
register_svg_icon "far-image" if respond_to?(:register_svg_icon)
register_svg_icon "far-newspaper" if respond_to?(:register_svg_icon)
