<?php

namespace App\Utilities;

class PageAssetsLoader
{
    protected $pageAssets = [
        'permission' => [
            'css' => [
            ],
            'js' => [
                'assets/js/user-management/permissions/list.js',
            ],
        ],

        // Ajoutez d'autres pages et leurs ressources CSS/JS ici
    ];

    public function loadAssets($page)
    {
        $assets = $this->getPageAssets($page);
        // dd($assets);

        foreach ($assets['css'] as $css) {
            echo '<link rel="stylesheet" href="' . asset($css) . '">';
        }

        foreach ($assets['js'] as $js) {
            echo '<script src="' . asset($js) . '"></script>';
        }
    }

    protected function getPageAssets($page)
    {
        if (array_key_exists($page, $this->pageAssets)) {
            return $this->pageAssets[$page];
        }

        return [
            'css' => [],
            'js' => [],
        ];
    }
}
