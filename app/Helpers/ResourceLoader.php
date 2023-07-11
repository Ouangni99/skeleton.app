<?php

namespace App\Helpers;

class ResourceLoader
{
    public static function loadCss($page)
    {
        switch ($page) {
            case 'permission':
                return [
                ];
            // Ajoutez d'autres cas pour chaque page où vous avez besoin de charger des ressources CSS spécifiques
            default:
                return [
                    // 'css/common.css',
                ];
        }
    }

    public static function loadJs($page)
    {
        $resources = [];

        switch ($page) {
            case 'permission':
                $resources = [
                    // 'assets/js/user-management/permissions/add-permission.js',
                    'assets/js/user-management/permissions/list.js',
                    // 'assets/js/user-management/permissions/open-permission-modal.js',
                ];
                break;
            // Ajoutez d'autres cas pour chaque page où vous avez besoin de charger des ressources JS spécifiques
        }

        // $resources[] = 'js/common.js'; // Ressource JS commune

        return $resources;
    }
}
