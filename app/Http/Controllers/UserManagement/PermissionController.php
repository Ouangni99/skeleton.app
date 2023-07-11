<?php

namespace App\Http\Controllers\UserManagement;

use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
// use App\Utilities\PageAssetsLoader;

class PermissionController extends Controller
{
    public $permTable = 'permissions';

    public $columnsDefault = [
        'id',
        'name',
        'status',
    ];


    /**
     * Display the login view.
     */
    public function create(): View
    {
        // $page = 'permission'; // Remplacez par le nom de la page actuelle

        // $loader = new PageAssetsLoader();
        // $loader->loadAssets($page);

        return view('pages.user-management.permission.permission');
    }


    public function createForm(Request $request)
    {
        // dd($request->dataRowID);
        $permissionData = Permission::find($request->dataRowID);

        return view('pages.user-management.permission.form', [
            'permissionData'    => $permissionData
        ]);
    }


    public function getPermissionData(Permission $perm)
    {
        // set server side query
        $query = $perm->serverSideQuery($this->columnsDefault, $this->permTable, $_REQUEST['search']['value']);

        // get data
        $data = $query->offset($_REQUEST['start'])
            ->limit($_REQUEST['length'])
            ->orderBy($this->columnsDefault[1], $_REQUEST['order'][0]['dir'])
            ->get()
            ->toArray();

        // draw array
        $records = array(
            "recordsTotal"    => intval($query->count()),
            "recordsFiltered" => intval($query->count()),
            "data"            => $data
        );

        // return records
        return $records;
    }
}
