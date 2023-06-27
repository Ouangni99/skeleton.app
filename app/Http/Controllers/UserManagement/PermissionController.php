<?php

namespace App\Http\Controllers\UserManagement;

use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
// use App\Utilities\PageAssetsLoader;

class PermissionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        $page = 'permission'; // Remplacez par le nom de la page actuelle

        // $loader = new PageAssetsLoader();
        // $loader->loadAssets($page);

        return view('pages.user-management.permission.permission');
    }
}
