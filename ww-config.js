export default {
  editor: {
    label: {
      en: 'Dropdown Menu',
      fr: 'Menu déroulant'
    },
    icon: 'dropdown',
    customStylePropertiesOrder: [
      'backgroundColor',
      'borderColor',
      'borderRadius',
      'borderWidth'
    ],
    customSettingsPropertiesOrder: [
      'triggerText',
      'items',
      'placement',
      'size',
      'offset',
      'closeOnClick',
      'disabled',
      'emptyText'
    ]
  },
  properties: {
    triggerText: {
      label: {
        en: 'Trigger text',
        fr: 'Texte du déclencheur'
      },
      type: 'Text',
      defaultValue: 'Open Menu',
      bindable: true,
      multiLang: true,
      section: 'settings'
    },
    items: {
      label: {
        en: 'Menu items',
        fr: 'Éléments du menu'
      },
      type: 'Array',
      options: {
        item: {
          type: 'Object',
          options: {
            item: {
              id: {
                type: 'Text',
                options: {
                  placeholder: 'Unique identifier'
                }
              },
              label: {
                type: 'Text',
                options: {
                  placeholder: 'Item label'
                }
              },
              type: {
                type: 'TextSelect',
                options: {
                  options: [
                    { value: 'item', label: 'Item' },
                    { value: 'checkbox', label: 'Checkbox' },
                    { value: 'radio', label: 'Radio' },
                    { value: 'separator', label: 'Separator' }
                  ]
                },
                defaultValue: 'item'
              },
              icon: {
                type: 'TextSelect',
                options: {
                  options: [
                    { value: '', label: 'None' },
                    { value: 'check', label: 'Check' },
                    { value: 'edit', label: 'Edit' },
                    { value: 'delete', label: 'Delete' },
                    { value: 'copy', label: 'Copy' },
                    { value: 'settings', label: 'Settings' }
                  ]
                },
                defaultValue: ''
              },
              shortcut: {
                type: 'Text',
                options: {
                  placeholder: 'Ctrl+S'
                }
              },
              variant: {
                type: 'TextSelect',
                options: {
                  options: [
                    { value: 'default', label: 'Default' },
                    { value: 'destructive', label: 'Destructive' }
                  ]
                },
                defaultValue: 'default'
              },
              disabled: {
                type: 'OnOff',
                defaultValue: false
              },
              checked: {
                type: 'OnOff',
                defaultValue: false
              },
              group: {
                type: 'Text',
                options: {
                  placeholder: 'Radio group name'
                }
              }
            }
          }
        }
      },
      defaultValue: [
        { id: '1', label: 'Edit', type: 'item', icon: 'edit', shortcut: 'Ctrl+E' },
        { id: '2', label: 'Copy', type: 'item', icon: 'copy', shortcut: 'Ctrl+C' },
        { id: '3', type: 'separator' },
        { id: '4', label: 'Delete', type: 'item', icon: 'delete', variant: 'destructive', shortcut: 'Del' }
      ],
      bindable: true,
      section: 'settings'
    },
    placement: {
      label: {
        en: 'Placement',
        fr: 'Placement'
      },
      type: 'TextSelect',
      options: {
        options: [
          { value: 'bottom-start', label: { en: 'Bottom Start', fr: 'Bas Début' } },
          { value: 'bottom-end', label: { en: 'Bottom End', fr: 'Bas Fin' } },
          { value: 'top-start', label: { en: 'Top Start', fr: 'Haut Début' } },
          { value: 'top-end', label: { en: 'Top End', fr: 'Haut Fin' } },
          { value: 'right-start', label: { en: 'Right Start', fr: 'Droite Début' } },
          { value: 'left-start', label: { en: 'Left Start', fr: 'Gauche Début' } }
        ]
      },
      defaultValue: 'bottom-start',
      bindable: true,
      section: 'settings'
    },
    size: {
      label: {
        en: 'Size',
        fr: 'Taille'
      },
      type: 'TextSelect',
      options: {
        options: [
          { value: 'sm', label: { en: 'Small', fr: 'Petit' } },
          { value: 'default', label: { en: 'Default', fr: 'Par défaut' } },
          { value: 'lg', label: { en: 'Large', fr: 'Grand' } }
        ]
      },
      defaultValue: 'default',
      bindable: true,
      section: 'settings'
    },
    offset: {
      label: {
        en: 'Offset (px)',
        fr: 'Décalage (px)'
      },
      type: 'Number',
      defaultValue: 4,
      bindable: true,
      section: 'settings'
    },
    closeOnClick: {
      label: {
        en: 'Close on item click',
        fr: 'Fermer au clic sur un élément'
      },
      type: 'OnOff',
      defaultValue: true,
      bindable: true,
      section: 'settings'
    },
    disabled: {
      label: {
        en: 'Disabled',
        fr: 'Désactivé'
      },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'settings'
    },
    emptyText: {
      label: {
        en: 'Empty state text',
        fr: 'Texte d\'état vide'
      },
      type: 'Text',
      defaultValue: 'No items',
      bindable: true,
      multiLang: true,
      section: 'settings'
    },
    triggerClass: {
      label: {
        en: 'Trigger CSS class',
        fr: 'Classe CSS du déclencheur'
      },
      type: 'Text',
      bindable: true,
      section: 'style'
    },
    contentClass: {
      label: {
        en: 'Content CSS class',
        fr: 'Classe CSS du contenu'
      },
      type: 'Text',
      bindable: true,
      section: 'style'
    }
  },
  actions: [
    {
      label: {
        en: 'Open menu',
        fr: 'Ouvrir le menu'
      },
      action: 'open'
    },
    {
      label: {
        en: 'Close menu',
        fr: 'Fermer le menu'
      },
      action: 'close'
    },
    {
      label: {
        en: 'Toggle menu',
        fr: 'Basculer le menu'
      },
      action: 'toggle'
    }
  ],
  triggerEvents: [
    {
      name: 'itemClick',
      label: {
        en: 'On item click',
        fr: 'Au clic sur un élément'
      },
      event: {
        item: 'Clicked item data',
        index: 'Item index'
      }
    },
    {
      name: 'open',
      label: {
        en: 'On open',
        fr: 'À l\'ouverture'
      }
    },
    {
      name: 'close',
      label: {
        en: 'On close',
        fr: 'À la fermeture'
      }
    }
  ]
} 