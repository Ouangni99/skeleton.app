<?php

namespace App\Http\Controllers\UserManagement;

use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;
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


    public function setPermissionData(Request $request) : string
    {
        // Définissez le nom de la permission

        // Validation de la création ou de la modification de la permission
        $validator = Validator::make(
            ['name' => $request->name],
            ['name' => 'required|unique:permissions']
        );

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => implode($validator->errors()->all())
            ];

            return json_encode($response);
        }

        // Trouvez ou créez la permission avec le nom spécifié
        $permission = Permission::firstOrNew([
            'name' => $request->name,
            'active' => 1
        ]);

        if ($permission->exists) {
            $permission->name = $request->name;
            $permission->save();

            $response = [
                'success' => true,
                'message' => 'La permission a été modifiée avec succès.'
            ];
        } else {
            $permission->save();

            $response = [
                'success' => true,
                'message' => 'La permission a été créée avec succès.'
            ];
        }

        // return response()->json($response);
        return json_encode($response);
    }
}
