export const frenchMessages = {
  resources: {
    customers: {
      name: 'Client |||| Clients',
      fields: {
        createdDate: 'Date de création',
        customerProfile: {
          firstName: 'Prénom',
          lastName: 'Nom',
          email: 'Adresse email',
          createdDate: 'Date de création',
          phone: 'Téléphone',
          country: 'Pays',
          nationality: 'Nationalité',
          subscribedNewsletter: 'Newsletter'
        },
        customer: {
          createdDate: 'Date de création',
          status: 'État',
          gardenSurface: 'Surface du jardin',
          customerAddress: {
            streetAndNumber: 'N° et rue',
            zipCode: 'Code postal',
            city: 'Ville',
            regionDisplay: 'Région'
          }
        }
      }
    },
    accounts: {
      name: 'Compte |||| Comptes'
    }
  },
  ra: {
    action: {
      add_filter: 'Ajouter un filtre',
      add: 'Ajouter',
      back: 'Retour',
      bulk_actions: '%{smart_count} sélectionné |||| %{smart_count} sélectionnés',
      cancel: 'Annuler',
      clear_input_value: 'Vider le champ',
      clone: 'Dupliquer',
      confirm: 'Confirmer',
      create: 'Créer',
      create_item: 'Créer %{item}',
      delete: 'Supprimer',
      edit: 'Éditer',
      export: 'Exporter',
      list: 'Liste',
      refresh: 'Actualiser',
      remove_filter: 'Supprimer ce filtre',
      remove: 'Supprimer',
      save: 'Enregistrer',
      select_all: 'Tout sélectionner',
      select_row: 'Sélectionner cette ligne',
      search: 'Rechercher',
      show: 'Afficher',
      sort: 'Trier',
      undo: 'Annuler',
      unselect: 'Désélectionner',
      expand: 'Étendre',
      close: 'Fermer',
      open_menu: 'Ouvrir le menu',
      close_menu: 'Fermer le menu',
      update: 'Modifier',
      move_up: 'Déplacer vers le haut',
      move_down: 'Déplacer vers le bas'
    },
    boolean: {
      true: 'Oui',
      false: 'Non',
      null: ' '
    },
    page: {
      create: 'Créer %{name}',
      dashboard: 'Tableau de bord',
      edit: '%{name} #%{id}',
      error: 'Un problème est survenu',
      list: '%{name}',
      loading: 'Chargement',
      not_found: 'Page manquante',
      show: '%{name} #%{id}',
      empty: 'Pas encore de %{name}.',
      invite: 'Voulez-vous en créer un ?'
    },
    input: {
      file: {
        upload_several: 'Déposez les fichiers à uploader, ou cliquez pour en sélectionner.',
        upload_single: 'Déposez le fichier à uploader, ou cliquez pour le sélectionner.'
      },
      image: {
        upload_several: 'Déposez les images à uploader, ou cliquez pour en sélectionner.',
        upload_single: "Déposez l'image à uploader, ou cliquez pour la sélectionner."
      },
      references: {
        all_missing: 'Impossible de trouver des données de références.',
        many_missing: 'Au moins une des références associées semble ne plus être disponible.',
        single_missing: 'La référence associée ne semble plus disponible.'
      },
      password: {
        toggle_visible: 'Cacher le mot de passe',
        toggle_hidden: 'Montrer le mot de passe'
      }
    },
    message: {
      about: 'Au sujet de',
      are_you_sure: 'Êtes-vous sûr ?',
      bulk_delete_content:
        'Êtes-vous sûr(e) de vouloir supprimer cet élément ? |||| Êtes-vous sûr(e) de vouloir supprimer ces %{smart_count} éléments ?',
      bulk_delete_title: 'Supprimer %{name} |||| Supprimer %{smart_count} %{name}',
      bulk_update_content:
        'Êtes-vous sûr(e) de vouloir modifier cet élément ? |||| Êtes-vous sûr(e) de vouloir modifier ces %{smart_count} éléments ?',
      bulk_update_title: 'Modifier %{name} |||| Modifier %{smart_count} %{name}',
      delete_content: 'Êtes-vous sûr(e) de vouloir supprimer cet élément ?',
      delete_title: 'Supprimer %{name} #%{id}',
      details: 'Détails',
      error: "En raison d'une erreur côté navigateur, votre requête n'a pas pu aboutir.",
      invalid_form: "Le formulaire n'est pas valide.",
      loading: 'La page est en cours de chargement, merci de bien vouloir patienter.',
      no: 'Non',
      not_found: "L'URL saisie est incorrecte, ou vous avez suivi un mauvais lien.",
      yes: 'Oui',
      unsaved_changes:
        "Certains changements n'ont pas été enregistrés. Êtes-vous sûr(e) de vouloir quitter cette page ?"
    },
    navigation: {
      no_results: 'Aucun résultat',
      no_more_results: 'La page numéro %{page} est en dehors des limites. Essayez la page précédente.',
      page_out_of_boundaries: 'La page %{page} est en dehors des limites',
      page_out_from_end: 'Fin de la pagination',
      page_out_from_begin: 'La page doit être supérieure à 1',
      page_range_info: '%{offsetBegin}-%{offsetEnd} sur %{total}',
      page_rows_per_page: 'Lignes par page :',
      next: 'Suivant',
      prev: 'Précédent',
      skip_nav: 'Aller au contenu'
    },
    sort: {
      sort_by: 'Trier par %{field} %{order}',
      ASC: 'croissant',
      DESC: 'décroissant'
    },
    auth: {
      auth_check_error: 'Merci de vous connecter pour continuer',
      user_menu: 'Profil',
      username: 'Identifiant',
      password: 'Mot de passe',
      sign_in: 'Connexion',
      sign_in_error: "Échec de l'authentification, merci de réessayer",
      logout: 'Déconnexion'
    },
    notification: {
      updated: 'Élément mis à jour |||| %{smart_count} élements mis à jour',
      created: 'Élément créé',
      deleted: 'Élément supprimé |||| %{smart_count} élements supprimés',
      bad_item: 'Élément inconnu',
      item_doesnt_exist: "L'élément n'existe pas",
      http_error: 'Erreur de communication avec le serveur',
      data_provider_error: 'Erreur dans le dataProvider. Plus de détails dans la console.',
      i18n_error: 'Erreur de chargement des traductions pour la langue sélectionnée',
      canceled: 'Action annulée',
      logged_out: 'Votre session a pris fin, veuillez vous reconnecter.',
      not_authorized: "Vous n'êtes pas autorisé(e) à accéder à cette ressource."
    },
    validation: {
      required: 'Ce champ est requis',
      minLength: 'Minimum %{min} caractères',
      maxLength: 'Maximum %{max} caractères',
      minValue: 'Minimum %{min}',
      maxValue: 'Maximum %{max}',
      number: 'Doit être un nombre',
      email: 'Doit être un email',
      oneOf: 'Doit être au choix: %{options}',
      regex: 'Doit respecter un format spécifique (regexp): %{pattern}'
    }
  }
}
